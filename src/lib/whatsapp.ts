/**
 * Utilities for generating WhatsApp deep-link URLs.
 * Phone numbers should be in international format without the leading '+' or spaces.
 */

const DEFAULT_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '22997000000';

/** Encode a plain-text message to a wa.me URL. */
export function buildWhatsAppUrl(message: string, phone = DEFAULT_PHONE): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/** Pre-filled message for a vehicle reservation request. */
export function reservationWhatsAppMessage(params: {
  carTitle: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  withChauffeur: boolean;
  fullName: string;
  phone: string;
}): string {
  const { carTitle, startDate, endDate, pickupLocation, withChauffeur, fullName, phone } = params;
  return (
    `Bonjour WeCar 👋\n\n` +
    `Je souhaite réserver le véhicule suivant :\n` +
    `🚗 *${carTitle}*\n` +
    `📅 Du ${startDate} au ${endDate}\n` +
    `📍 Lieu de prise en charge : ${pickupLocation}\n` +
    `👤 Chauffeur : ${withChauffeur ? 'Oui' : 'Non'}\n\n` +
    `Mes coordonnées :\n` +
    `Nom : ${fullName}\n` +
    `Téléphone : ${phone}\n\n` +
    `Merci de confirmer la disponibilité.`
  );
}

/** Pre-filled message for a custom/free-form request. */
export function customRequestWhatsAppMessage(params: {
  fullName: string;
  phone: string;
  startDate: string;
  endDate: string;
  city: string;
  vehicleType: string;
  budget: string;
  withChauffeur: boolean;
  message?: string;
}): string {
  const { fullName, phone, startDate, endDate, city, vehicleType, budget, withChauffeur, message } = params;
  return (
    `Bonjour WeCar 👋\n\n` +
    `J'ai un besoin de location :\n` +
    `📅 Du ${startDate} au ${endDate}\n` +
    `📍 Ville : ${city}\n` +
    `🚗 Type de véhicule : ${vehicleType}\n` +
    `💰 Budget approximatif : ${budget}\n` +
    `👤 Avec chauffeur : ${withChauffeur ? 'Oui' : 'Non'}\n` +
    (message ? `💬 Message : ${message}\n` : '') +
    `\nMes coordonnées :\n` +
    `Nom : ${fullName}\n` +
    `Téléphone : ${phone}\n\n` +
    `Merci de me proposer un véhicule adapté.`
  );
}
