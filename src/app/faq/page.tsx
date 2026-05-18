import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'FAQ - WeCar' };

const faqCategories = [
  {
    category: 'Le processus de réservation',
    questions: [
      {
        q: 'Comment réserver une voiture?',
        a: 'Parcourez le catalogue, cliquez sur un véhicule, puis sur "Réserver ce véhicule". Remplissez le formulaire en 2 min. Aucun paiement à ce stade — notre équipe vous contacte par WhatsApp pour confirmer la disponibilité.',
      },
      {
        q: 'Dois-je payer pour envoyer une demande?',
        a: 'Non. La demande est entièrement gratuite. Le paiement intervient uniquement après que notre équipe a confirmé la disponibilité du véhicule.',
      },
      {
        q: 'Combien de temps pour obtenir une confirmation?',
        a: 'Notre équipe vous répond par WhatsApp sous 2 heures en journée (8h-20h). En dehors de ces horaires, vous recevrez une réponse le lendemain matin.',
      },
      {
        q: 'Puis-je décrire mon besoin sans choisir un véhicule précis?',
        a: 'Oui. Utilisez la page "Décrire mon besoin" — dites-nous vos dates, votre ville, votre budget et votre usage. Notre équipe vous propose le véhicule le plus adapté.',
      },
      {
        q: 'Puis-je réserver pour quelqu\'un d\'autre?',
        a: 'Oui. Indiquez le nom du conducteur principal dans le formulaire ou précisez-le dans le message. Le conducteur devra présenter son permis à la prise en charge.',
      },
    ],
  },
  {
    category: 'Paiement',
    questions: [
      {
        q: 'Quand et comment payer?',
        a: 'Le paiement se fait après confirmation de disponibilité par WhatsApp. Notre équipe vous communique les instructions de paiement (Mobile Money MTN/Moov, virement, ou espèces à la prise en charge selon les cas).',
      },
      {
        q: 'Y a-t-il un dépôt de garantie?',
        a: 'Oui. Un dépôt de garantie est demandé à la prise en charge du véhicule. Son montant est indiqué sur chaque fiche véhicule.',
      },
      {
        q: 'Quels modes de paiement acceptez-vous?',
        a: 'Mobile Money (MTN, Moov), virement bancaire et espèces selon les arrangements convenus après confirmation.',
      },
    ],
  },
  {
    category: 'Véhicules',
    questions: [
      {
        q: 'Les véhicules sont-ils assurés?',
        a: 'Oui. Tous nos véhicules sont assurés et régulièrement entretenus.',
      },
      {
        q: 'Le carburant est-il inclus?',
        a: 'Non. Le carburant est à la charge du locataire. Le véhicule vous est remis avec un plein et doit être restitué avec un plein.',
      },
      {
        q: 'Puis-je voyager hors du Bénin?',
        a: 'Les voyages hors du Bénin nécessitent une autorisation préalable. Contactez-nous avant de soumettre votre demande.',
      },
    ],
  },
  {
    category: 'Chauffeur',
    questions: [
      {
        q: 'Comment réserver avec chauffeur?',
        a: 'Cochez l\'option "Avec chauffeur" dans le formulaire de réservation. Le tarif du chauffeur est indiqué sur chaque fiche véhicule.',
      },
      {
        q: 'Le chauffeur est-il disponible 24h/24?',
        a: 'Le chauffeur est disponible aux horaires convenus lors de la confirmation. Des frais supplémentaires peuvent s\'appliquer pour les sorties nocturnes.',
      },
    ],
  },
  {
    category: 'Annulation',
    questions: [
      {
        q: 'Comment annuler une demande?',
        a: 'Contactez-nous par WhatsApp ou email. Si la disponibilité n\'a pas encore été confirmée, l\'annulation est gratuite et sans engagement.',
      },
      {
        q: 'Quelle est la politique d\'annulation après confirmation?',
        a: 'La politique varie selon le véhicule et est détaillée sur chaque fiche. En général : annulation gratuite jusqu\'à 48h avant la prise en charge.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="bg-[#1a1f36] text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Questions fréquentes</h1>
          <p className="text-gray-300 text-lg">Tout ce que vous devez savoir sur la location chez WeCar</p>
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
                    <AccordionTrigger className="px-6 text-left">{item.q}</AccordionTrigger>
                    <AccordionContent className="px-6 text-gray-600">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-[#1a1f36] rounded-xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Vous n&apos;avez pas trouvé votre réponse?</h3>
          <p className="text-gray-300 mb-5">Contactez-nous directement, nous répondons sous 2h.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a1f36]">
                Nous contacter
              </Button>
            </Link>
            <Link href="/cars">
              <Button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white">
                Voir les voitures
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
