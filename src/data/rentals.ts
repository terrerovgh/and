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
    slug: 'dump-trailer',
    hero: dumpTrailer01,
    detail: dumpTrailer02,
    ogImage: '/og/rental-dump-trailer.jpg',
    en: {
      name: 'Tandem-Axle Dump Trailer',
      model: 'Hydraulic hoist · Barn-door tailgate',
      teaser: 'One trip where a pickup bed makes five. Load it, tow it, dump it.',
      body: [
        'Demo debris, roofing tear-off, dirt, gravel, mulch — load it, tow it, dump it. Tandem axles and high solid sides mean one trip where a pickup bed makes five, and the hydraulic hoist empties it without a shovel.',
        'Full-width barn-door tailgate for clean unloading, spare tire and tongue jack included. Hitches to a standard 2-5/16 in ball, so if you can tow, you can run it.',
      ],
      goodForTitle: 'Good for',
      goodFor: [
        'Roofing tear-off and demolition debris',
        'Dirt, gravel, sand and stone',
        'Mulch, brush and yard cleanup',
        'Hauling equipment and materials to the job',
        'Cleanouts, moves and small renovations',
      ],
      // TODO: verificar con el dueño — observaciones de las fotos. Falta
      // capacidad en yardas y GVWR, que es lo que más pregunta el cliente.
      specs: [
        { label: 'Axles', value: 'Tandem' },
        { label: 'Unloading', value: 'Hydraulic hoist' },
        { label: 'Tailgate', value: 'Barn-door, full width' },
        { label: 'Coupler', value: '2-5/16 in ball' },
        { label: 'Included', value: 'Spare tire + tongue jack' },
      ],
      heroAlt: 'Black tandem-axle hydraulic dump trailer with high solid sides, parked on a driveway at sunset.',
      detailAlt: 'Side profile of the tandem-axle dump trailer showing the full length, spare tire and tongue jack.',
      metaTitle: 'Dump Trailer Rental in Valdosta, GA | All Needs Discount LLC',
      metaDescription: 'Tandem-axle hydraulic dump trailer for rent in Valdosta and South Georgia. Demo debris, dirt, gravel, roofing tear-off. Call 678-622-1776 for rates.',
    },
    es: {
      name: 'Dump Trailer de Doble Eje',
      model: 'Volteo hidráulico · Compuertas tipo granero',
      teaser: 'Un viaje donde una camioneta hace cinco. Cargas, remolcas y volteas.',
      body: [
        'Escombro de demolición, techo arrancado, tierra, grava, mulch — cargas, remolcas y volteas. Doble eje y laterales altos: un viaje donde una camioneta hace cinco, y el volteo hidráulico lo vacía sin pala.',
        'Compuertas traseras de ancho completo para descargar limpio, llanta de refacción y gato incluidos. Se engancha a una bola estándar de 2-5/16 pulg, así que si puedes remolcar, puedes usarlo.',
      ],
      goodForTitle: 'Ideal para',
      goodFor: [
        'Techo arrancado y escombro de demolición',
        'Tierra, grava, arena y piedra',
        'Mulch, ramas y limpieza de jardín',
        'Llevar equipo y material a la obra',
        'Desalojos, mudanzas y remodelaciones pequeñas',
      ],
      // TODO: verificar con el dueño — observaciones de las fotos. Falta
      // capacidad en yardas y GVWR, que es lo que más pregunta el cliente.
      specs: [
        { label: 'Ejes', value: 'Doble' },
        { label: 'Descarga', value: 'Volteo hidráulico' },
        { label: 'Compuerta', value: 'Tipo granero, ancho completo' },
        { label: 'Enganche', value: 'Bola de 2-5/16 pulg' },
        { label: 'Incluye', value: 'Llanta de refacción + gato' },
      ],
      heroAlt: 'Dump trailer negro de doble eje con volteo hidráulico y laterales altos, estacionado en una entrada al atardecer.',
      detailAlt: 'Perfil lateral del dump trailer de doble eje mostrando el largo completo, la llanta de refacción y el gato.',
      metaTitle: 'Renta de Dump Trailer en Valdosta, GA | All Needs Discount LLC',
      metaDescription: 'Dump trailer de doble eje con volteo hidráulico en renta en Valdosta y el sur de Georgia. Escombro, tierra, grava, techo. Llama al 678-622-1776.',
    },
  },
];

export function getRental(slug: string): Rental | undefined {
  return rentals.find(r => r.slug === slug);
}
