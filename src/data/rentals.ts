import concretePump01 from '../assets/rentals/concrete-pump-01.jpg';
import concretePump02 from '../assets/rentals/concrete-pump-02.jpg';
import dumpTrailer01 from '../assets/rentals/dump-trailer-01.jpg';
import dumpTrailer02 from '../assets/rentals/dump-trailer-02.jpg';

/*
 * Rental content lives here rather than in page frontmatter (the pattern the
 * rest of the site uses) because six pages consume it: the teaser on both home
 * pages, both /rentals/ indexes, and both [slug] detail routes. Duplicating it
 * per-page the way `services` is duplicated would mean six copies to keep in
 * sync instead of two.
 *
 * Slugs stay in English for both locales on purpose — Layout.astro derives the
 * hreflang alternate by prefixing `/es` onto `path`, so a translated slug would
 * break the alternates unless that derivation is rewritten.
 */

export interface RentalSpec {
  label: string;
  value: string;
}

export interface RentalCopy {
  name: string;
  model: string;
  teaser: string;
  body: string[];
  goodForTitle: string;
  goodFor: string[];
  specs: RentalSpec[];
  /* Only for rentals where All Needs Discount delivers/collects the item
     itself (the roll-off container) rather than the customer towing it away
     (the concrete pump). Rendered as a short numbered list when present. */
  howItWorksTitle?: string;
  howItWorks?: string[];
  heroAlt: string;
  detailAlt: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Rental {
  slug: string;
  hero: ImageMetadata;
  detail: ImageMetadata;
  ogImage: string;
  en: RentalCopy;
  es: RentalCopy;
}

export const rentals: Rental[] = [
  {
    slug: 'concrete-pump',
    hero: concretePump01,
    detail: concretePump02,
    ogImage: '/og/rental-concrete-pump.jpg',
    en: {
      name: 'Trailer-Mounted Concrete Pump',
      model: 'Mayco C-30HD Series · Trailer-mounted',
      teaser: "Places concrete where the mixer truck can't reach — without tearing up the yard.",
      body: [
        "Get concrete exactly where the mixer truck can't reach — backyard slabs, footings behind the house, basement floors, elevated decks. It tows behind a three-quarter-ton and fits through a standard gate, so the pour happens without a truck driving across your lawn.",
        "Low hours, shop-maintained, and serviced before every rental. We walk you through hookup and line setup when you pick it up, so you are not figuring it out on the clock.",
      ],
      goodForTitle: 'Good for',
      goodFor: [
        'Backyard slabs, patios and walkways',
        'Footings and grade beams with no truck access',
        'Basement and crawlspace floors',
        'Elevated decks and second-story pours',
        'Block fill and small commercial work',
      ],
      // TODO: verificar con el dueño — cifras de la documentación de la serie
      // C-30HD de Multiquip, no leídas de la placa de esta unidad.
      specs: [
        { label: 'Output', value: 'Up to 25 yd³/hr' },
        { label: 'Aggregate', value: 'Up to ½ in' },
        { label: 'Reach', value: '500 ft horizontal / 150 ft vertical' },
        { label: 'Mobility', value: 'Towable trailer mount' },
        { label: 'Condition', value: 'Low hours, shop-maintained' },
      ],
      heroAlt: 'Yellow Mayco C-30HDN trailer-mounted concrete pump parked on a concrete driveway in evening light.',
      detailAlt: 'Engine and control panel of the Mayco concrete pump with the side cover open.',
      metaTitle: 'Concrete Pump Rental in Valdosta, GA | All Needs Discount LLC',
      metaDescription: 'Trailer-mounted Mayco C-30HD concrete pump for rent in Valdosta and South Georgia. Up to 25 yd³/hr, 500 ft reach. Call 678-622-1776 for rates.',
    },
    es: {
      name: 'Bomba de Concreto sobre Trailer',
      model: 'Mayco Serie C-30HD · Montada en trailer',
      teaser: 'Coloca el concreto donde el camión mezclador no llega — sin destrozar el jardín.',
      body: [
        'Lleva el concreto justo adonde el camión mezclador no llega — losas en el patio, cimientos detrás de la casa, pisos de sótano, decks elevados. Se remolca con una camioneta de ¾ de tonelada y entra por un portón normal, así que la colada se hace sin que un camión cruce el jardín.',
        'Pocas horas de uso, mantenida en taller y con servicio antes de cada renta. Te explicamos la conexión y el armado de línea al recogerla, para que no pierdas tiempo averiguándolo en obra.',
      ],
      goodForTitle: 'Ideal para',
      goodFor: [
        'Losas, patios y andadores en el traspatio',
        'Cimientos y trabes sin acceso para el camión',
        'Pisos de sótano y espacios bajos',
        'Decks elevados y coladas en segundo piso',
        'Relleno de block y obra comercial pequeña',
      ],
      // TODO: verificar con el dueño — cifras de la documentación de la serie
      // C-30HD de Multiquip, no leídas de la placa de esta unidad.
      specs: [
        { label: 'Rendimiento', value: 'Hasta 25 yd³/h' },
        { label: 'Agregado', value: 'Hasta ½ pulg' },
        { label: 'Alcance', value: '150 m horizontal / 45 m vertical' },
        { label: 'Movilidad', value: 'Remolcable' },
        { label: 'Estado', value: 'Pocas horas, mantenida en taller' },
      ],
      heroAlt: 'Bomba de concreto Mayco C-30HDN amarilla montada en trailer, estacionada en una entrada de concreto a la luz del atardecer.',
      detailAlt: 'Motor y panel de control de la bomba de concreto Mayco con la cubierta lateral abierta.',
      metaTitle: 'Renta de Bomba de Concreto en Valdosta, GA | All Needs Discount LLC',
      metaDescription: 'Bomba de concreto Mayco C-30HD sobre trailer en renta en Valdosta y el sur de Georgia. Hasta 25 yd³/h, 150 m de alcance. Llama al 678-622-1776.',
    },
  },
  {
    slug: 'roll-off-container',
    hero: dumpTrailer01,
    detail: dumpTrailer02,
    ogImage: '/og/rental-roll-off-container.jpg',
    en: {
      name: 'Roll-Off Container',
      model: 'Panther Cargo 7x14 Roll Off · 14.2 yd³ container',
      teaser: 'We drop it at your site, you fill it, we haul it away. No towing on your end.',
      body: [
        "This is a container rental, not a trailer rental — you don't tow anything. We deliver the roll-off container to your site with our own equipment, place it where you need it, and pick it up when you're done. All you do is fill it.",
        'Built for job-site abuse: 10 gauge steel walls and floor on a 10 in I-beam frame, with full-width rear barn doors so you can wheelbarrow debris straight in instead of throwing it over the side.',
        '14.2 yd³ of capacity — roughly what it takes to gut a couple of rooms or clear a mid-size roof tear-off. Call with your project and we will tell you if one container covers it or if you need a swap partway through.',
      ],
      goodForTitle: 'Good for',
      goodFor: [
        'Roofing tear-off and demolition debris',
        'Dirt, gravel, sand and stone',
        'Mulch, brush and yard cleanup',
        'Whole-room gut-outs and cleanouts',
        'Moves and small renovations',
      ],
      howItWorksTitle: 'How it works',
      howItWorks: [
        'Call and tell us your project and site address — we confirm the container is available and give you a rate.',
        'We deliver and place the container at your site on the agreed date, no truck or trailer needed on your end.',
        "Fill it at your own pace. Call when you're done and we pick it up — that's it.",
      ],
      // Container specs from panthercargousa.com/products/rolloff (Panther Cargo 7x14,
      // confirmed 2026-09-01). Only specs relevant to the renter are listed — GVWR, axle
      // rating, tires and coupler describe the delivery trailer, not the rented container,
      // so they're intentionally left out.
      specs: [
        { label: 'Footprint', value: '7 ft x 14 ft' },
        { label: 'Capacity', value: '14.2 yd³' },
        { label: 'Construction', value: '10 ga steel walls & floor, 10 in I-beam frame' },
        { label: 'Loading access', value: 'Full-width rear barn doors' },
        { label: 'Delivery area', value: 'Valdosta and South Georgia' },
        { label: 'Availability', value: 'Available now' },
      ],
      heroAlt: 'Black roll-off container with high steel sides, delivered and parked on a driveway at sunset.',
      detailAlt: 'Side profile of the roll-off container showing the full length and rear barn doors.',
      metaTitle: 'Roll-Off Container & Dumpster Rental in Valdosta, GA | All Needs Discount LLC',
      metaDescription: '14.2 yd³ roll-off container rental in Valdosta and South Georgia. We deliver, you fill it, we haul it away. Call 678-622-1776 for rates.',
    },
    es: {
      name: 'Contenedor Roll-Off',
      model: 'Panther Cargo 7x14 Roll Off · Contenedor de 14.2 yd³',
      teaser: 'Lo dejamos en tu sitio, lo llenas, lo recogemos. No remolcas nada.',
      body: [
        'Esto es la renta de un contenedor, no de un remolque — no remolcas nada. Nosotros llevamos el contenedor a tu sitio con nuestro propio equipo, lo colocamos donde lo necesites, y lo recogemos cuando termines. Tú solo lo llenas.',
        'Construido para trabajo pesado: paredes y piso de acero calibre 10 sobre un marco de viga I de 10 pulg, con compuertas traseras tipo granero de ancho completo para meter escombro con carretilla en vez de tirarlo por encima del borde.',
        '14.2 yd³ de capacidad — más o menos lo que toma vaciar un par de cuartos o un techo mediano. Llámanos con tu proyecto y te decimos si un contenedor te alcanza o si necesitas un cambio a la mitad.',
      ],
      goodForTitle: 'Ideal para',
      goodFor: [
        'Techo arrancado y escombro de demolición',
        'Tierra, grava, arena y piedra',
        'Mulch, ramas y limpieza de jardín',
        'Vaciar cuartos completos y desalojos',
        'Mudanzas y remodelaciones pequeñas',
      ],
      howItWorksTitle: 'Cómo funciona',
      howItWorks: [
        'Llámanos y cuéntanos tu proyecto y la dirección — confirmamos disponibilidad y te damos la tarifa.',
        'Entregamos y colocamos el contenedor en tu sitio en la fecha acordada, sin que necesites camioneta ni trailer.',
        'Lo llenas a tu ritmo. Llámanos cuando termines y lo recogemos — así de simple.',
      ],
      // Specs del contenedor de panthercargousa.com/products/rolloff (Panther Cargo 7x14,
      // confirmado 2026-09-01). Solo se listan las specs relevantes para quien renta — GVWR,
      // ejes, llantas y enganche describen el trailer de entrega, no el contenedor rentado,
      // así que se omiten a propósito.
      specs: [
        { label: 'Dimensiones', value: '7 x 14 pies' },
        { label: 'Capacidad', value: '14.2 yd³' },
        { label: 'Construcción', value: 'Acero cal. 10 en paredes y piso, marco de viga I de 10 pulg' },
        { label: 'Acceso de carga', value: 'Compuertas traseras tipo granero, ancho completo' },
        { label: 'Zona de entrega', value: 'Valdosta y el sur de Georgia' },
        { label: 'Disponibilidad', value: 'Disponible ahora' },
      ],
      heroAlt: 'Contenedor roll-off negro de laterales altos de acero, entregado y estacionado en una entrada al atardecer.',
      detailAlt: 'Perfil lateral del contenedor roll-off mostrando el largo completo y las compuertas traseras.',
      metaTitle: 'Renta de Contenedor Roll-Off en Valdosta, GA | All Needs Discount LLC',
      metaDescription: 'Contenedor roll-off de 14.2 yd³ en renta en Valdosta y el sur de Georgia. Lo entregamos, lo llenas, lo recogemos. Llama al 678-622-1776.',
    },
  },
];

export function getRental(slug: string): Rental | undefined {
  return rentals.find(r => r.slug === slug);
}
