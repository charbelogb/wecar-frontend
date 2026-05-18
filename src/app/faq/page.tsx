import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata = { title: 'FAQ - WeCar' };

const faqCategories = [
  {
    category: 'Réservation',
    questions: [
      { q: 'Comment puis-je réserver une voiture?', a: 'Parcourez notre catalogue, sélectionnez votre véhicule, choisissez vos dates et validez en payant un acompte de 30%.' },
      { q: 'Puis-je annuler ma réservation?', a: 'Oui, toute annulation effectuée 48h avant la date de prise en charge est remboursée à 100%. En dessous de 48h, l\'acompte est conservé.' },
      { q: 'Comment puis-je modifier ma réservation?', a: 'Contactez notre équipe par téléphone ou email au moins 24h à l\'avance pour modifier vos dates ou options.' },
      { q: 'Puis-je réserver pour quelqu\'un d\'autre?', a: 'Oui, mais le conducteur principal doit présenter son permis de conduire lors de la prise en charge.' },
    ],
  },
  {
    category: 'Paiement',
    questions: [
      { q: 'Quels modes de paiement acceptez-vous?', a: 'Nous acceptons les paiements par mobile money (MTN, Moov), virement bancaire et espèces pour le solde à la prise en charge.' },
      { q: 'Quel est le montant de l\'acompte?', a: 'L\'acompte représente 30% du montant total. Le solde de 70% est réglé à la prise en charge du véhicule.' },
      { q: 'Y a-t-il un dépôt de garantie?', a: 'Oui, un dépôt de garantie est demandé à la prise en charge. Son montant varie selon le véhicule et est indiqué sur la fiche de chaque voiture.' },
    ],
  },
  {
    category: 'Véhicules',
    questions: [
      { q: 'Les véhicules sont-ils assurés?', a: 'Oui, tous nos véhicules sont couverts par une assurance tous risques. Vous êtes protégé en cas d\'accident.' },
      { q: 'Le carburant est-il inclus?', a: 'Non, le carburant est à la charge du locataire. Le véhicule vous est remis avec un plein et doit être restitué avec un plein.' },
      { q: 'Puis-je voyager hors du Bénin avec le véhicule?', a: 'Les voyages hors du Bénin nécessitent une autorisation préalable et peuvent entraîner des frais supplémentaires.' },
    ],
  },
  {
    category: 'Chauffeur',
    questions: [
      { q: 'Comment fonctionne l\'option chauffeur?', a: 'Sélectionnez l\'option chauffeur lors de la réservation. Un chauffeur professionnel sera mis à votre disposition pour toute la durée de la location.' },
      { q: 'Le chauffeur est-il disponible 24h/24?', a: 'Le chauffeur est disponible aux horaires convenus lors de la réservation. Des frais supplémentaires s\'appliquent pour les sorties nocturnes.' },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#1a1f36] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Questions fréquentes</h1>
          <p className="text-gray-300">Tout ce que vous devez savoir sur la location chez WeCar</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        {faqCategories.map((cat) => (
          <div key={cat.category}>
            <h2 className="text-xl font-bold text-[#1a1f36] mb-4">{cat.category}</h2>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <Accordion type="single" collapsible>
                {cat.questions.map((item, i) => (
                  <AccordionItem key={i} value={`${cat.category}-${i}`}>
                    <AccordionTrigger className="px-6">{item.q}</AccordionTrigger>
                    <AccordionContent className="px-6 text-gray-600">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
