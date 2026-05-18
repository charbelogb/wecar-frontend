# WeCar Frontend — Ultra-simple MVP

Location de voitures au Bénin — site vitrine + génération de leads avec confirmation WhatsApp.

## Scope du MVP

Ce projet est un **ultra-MVP** : site vitrine + catalogue + formulaires de demande + confirmation WhatsApp.  
Il n'y a **pas** de paiement automatique, pas d'auth, pas de dashboard client ou admin dans ce repo.

### Flux utilisateur

1. L'utilisateur parcourt le catalogue **ou** décrit son besoin
2. Il envoie une demande (formulaire simple, aucun paiement)
3. L'équipe WeCar confirme la disponibilité **par WhatsApp** (sous 2h)
4. Le paiement s'effectue après confirmation, de façon semi-manuelle

### Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/cars` | Catalogue avec filtres |
| `/cars/[slug]` | Fiche véhicule complète |
| `/reserve/[slug]` | Formulaire de demande de réservation |
| `/request` | Formulaire "décrire mon besoin" |
| `/reservation-success` | Page de confirmation + CTA WhatsApp |
| `/faq` | Questions fréquentes |
| `/contact` | Page de contact |

## Stack technique

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Radix UI / shadcn components**
- Données mockées en local (aucune dépendance backend pour naviguer)

## Installation et démarrage

```bash
# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.local.example .env.local
# Renseigner NEXT_PUBLIC_WHATSAPP_NUMBER dans .env.local

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

| Variable | Description | Exemple |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp (sans + ni espaces) | `22997000000` |

## Ce qui est exclu de ce MVP

- Authentification (pas de login/register exposé dans la navigation)
- Dashboard client
- Dashboard admin
- Paiement automatique
- Backend API (toutes les données sont mockées localement)

## Structure des données

Les véhicules sont définis dans `src/lib/mock-data.ts` et typés dans `src/types/index.ts`.  
Pour ajouter un véhicule, il suffit d'ajouter une entrée dans le tableau `mockCars`.

## Déploiement

Compatible avec Vercel, Netlify ou tout hébergeur Next.js.

```bash
npm run build
npm run start
```
