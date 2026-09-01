// Cloudflare Pages Function — POST /api/lead
// Turns a wizard submission into an AI-written summary and emails it to the
// business owner, so the site never has to publish a personal phone number.

interface Env {
  AI: any;
  SEND_EMAIL: any;
}

interface LeadPayload {
  projectType?: string;
  budget?: string;
  details?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string; // honeypot — real visitors never fill this in
  lang?: 'en' | 'es';
}

// TEMPORARY: allneedsdiscount.com is not yet a Cloudflare zone on this
// account (only terrerov.com has Email Routing enabled), and
// allneedsdiscount1@gmail.com is still pending verification as a Email
// Routing destination address. Both the sender domain and the destination
// below must match wrangler.jsonc's `send_email` binding, or the Pages
// deploy fails validation. Switch both back once allneedsdiscount.com is
// connected and allneedsdiscount1@gmail.com is verified.
const SENDER_ADDRESS = 'leads@terrerov.com';
const BUSINESS_ADDRESS = 'terrerov@gmail.com';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Honeypot tripped — pretend success, do nothing else.
  if (payload.company) {
    return json({ ok: true, summary: '' });
  }

  const name = (payload.name ?? '').trim();
  const email = (payload.email ?? '').trim();
  if (!name || !email) {
    return json({ ok: false, error: 'missing_fields' }, 400);
  }

  const lang: 'en' | 'es' = payload.lang === 'es' ? 'es' : 'en';

  const rawDetails = [
    `Project type: ${payload.projectType || 'not specified'}`,
    `Budget: ${payload.budget || 'not specified'}`,
    `Details: ${payload.details || 'none provided'}`,
    `Contact name: ${name}`,
    `Contact email: ${email}`,
    `Contact phone: ${(payload.phone ?? '').trim() || 'not provided'}`,
  ].join('\n');

  const systemPrompt = lang === 'es'
    ? 'Eres un asistente que resume solicitudes de cotización para una empresa de remodelación residencial en Valdosta, Georgia. Escribe un resumen breve, claro y profesional en español (3 a 5 líneas) para que el dueño del negocio entienda rápido qué necesita el cliente y cómo contactarlo. No inventes datos que no se te dieron.'
    : 'You are an assistant that summarizes project quote requests for a residential remodeling company in Valdosta, Georgia. Write a short, clear, professional summary in English (3 to 5 lines) so the business owner can quickly understand what the client needs and how to reach them. Do not invent details you were not given.';

  let summary = rawDetails;
  try {
    const aiResponse: any = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: rawDetails },
      ],
    });
    if (aiResponse?.response) summary = aiResponse.response;
  } catch {
    // Model call failed — the raw details are still a usable summary, keep going.
  }

  try {
    await sendLeadEmail(env, { summary, rawDetails, name, email, phone: payload.phone, lang });
  } catch {
    return json({ ok: false, error: 'email_failed' }, 502);
  }

  return json({ ok: true, summary });
};

async function sendLeadEmail(
  env: Env,
  lead: { summary: string; rawDetails: string; name: string; email: string; phone?: string; lang: 'en' | 'es' }
) {
  const { EmailMessage } = await import('cloudflare:email');
  const { createMimeMessage } = await import('mimetext');

  const subject = lead.lang === 'es'
    ? `Nueva solicitud de cotización — ${lead.name}`
    : `New quote request — ${lead.name}`;

  const msg = createMimeMessage();
  msg.setSender({ name: 'All Needs Discount Website', addr: SENDER_ADDRESS });
  msg.setRecipient(BUSINESS_ADDRESS);
  msg.setSubject(subject);
  msg.setHeader('Reply-To', lead.email);
  msg.addMessage({
    contentType: 'text/plain',
    data: `${lead.summary}\n\n---\nRaw submission:\n${lead.rawDetails}`,
  });

  const message = new EmailMessage(SENDER_ADDRESS, BUSINESS_ADDRESS, msg.asRaw());
  await env.SEND_EMAIL.send(message);
}
