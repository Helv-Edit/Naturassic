# CLAUDE.md — Naturassic

> Fichier projet client. Créé juin 2026.
> Statut : En cours — site vitrine + réservation

---

## CLIENT

- **Nom :** Naturassic
- **Secteur :** Agence de balades nature et découverte animale
- **Localisation :** Grindelwald, Alpes suisses (Oberland bernois)
- **Équipe :** 3 guides professionnels
- **Langue du site :** Français (prévoir extension EN/DE possible)

---

## OFFRES

### Weekend Alpin — 450 CHF / personne
- 2 jours / 1 nuit à Grindelwald
- Groupes de 4 à 6 personnes maximum (argument de vente fort)
- Tout inclus : guide, nuit en village, repas, équipement
- 4 circuits :
  - **Sentier des Sources** — Facile — Prairies, cascades, faune accessible
  - **Crête des Chamois** — Moyen — Vues panoramiques, observation chamois
  - **Lac Glaciaire** — Moyen — Trek lac d'altitude, marmottes, aigles
  - **Sommet du Silence** — Difficile — Haute montagne, faune rare, coucher de soleil

### Journée Découverte — 150 CHF / personne
- Du lever au coucher du soleil
- Groupes de 8 personnes maximum
- Guide naturaliste toute la journée

### Animaux observables
Chamois · Marmotte · Aigle royal · Bouquetin · Cerf · Renard roux

---

## VALEURS (ton éditorial à respecter absolument)

- **Éco-responsabilité** — sensibilisation au réchauffement climatique,
  impacts visibles sur les glaciers et la faune alpine. Pas moralisateur,
  ancré dans la réalité du terrain.
- **Authenticité locale** — Grindelwald, guides locaux, patrimoine alpin.
  Pas un produit touristique générique.
- **Petits groupes** — exclusivité, attention personnalisée. Toujours
  mentionner la taille limitée des groupes.
- **Ressourcement** — déconnexion, silence, immersion.

Ton éditorial : chaleureux, sincère, inspirant. Pas corporate.
Vouvoiement. Phrases courtes. Laisser respirer le texte.

---

## IDENTITÉ VISUELLE

### Palette
- Emerald Green : `#284139` — fonds sombres, header, footer
- Wasabi : `#809076` — accents, bordures, éléments secondaires
- Creased Khaki : `#F8D794` — CTA, highlights, badges prix
- Egyptian Earth : `#B86B30` — accents chauds, hover, icônes
- Noir de Vigne : `#111A19` — texte principal, sections sombres

### Typographie
- Titres : **Gloock** (serif transitional, solide et ancré — décision juin 2026)
- Corps : **Jost** (géométrique propre, distinctif — décision juin 2026)
- Les deux sur Google Fonts, chargement optimisé (subset latin uniquement)
- Note : Cormorant Garamond + DM Sans initialement prévus, écartés (reflex-reject list /impeccable)

### Direction esthétique
- Moderne et naturel — pas rustique, pas générique outdoor
- Éditorial : grandes photos plein écran, texte aéré, espace négatif assumé
- Inspirations : magazines de voyage haut de gamme
- Animations : parallax subtil sur les photos, révélations au scroll

---

## STRUCTURE DU SITE (3 pages)

### Page 1 — Accueil
- Hero plein écran avec photo principale + baseline forte
- Section valeurs / éco-engagement
- Aperçu des 3 guides (équipe intégrée dans l'accueil)
- CTA vers réservation

### Page 2 — Nos Circuits & Faune
- 4 circuits détaillés : niveau, durée, points forts, animaux observables
- Galerie faune alpine intégrée dans la page
- Tarifs clairement affichés (450 CHF weekend / 150 CHF journée)
- CTA réservation sur chaque circuit

### Page 3 — Réservation
- Widget embed Calendly ou Cal.com
- Sélection : circuit + date + nombre de personnes
- Capacité max visible (4-6 weekend / 8 journée)
- Email de confirmation automatique
- Paiement : acompte à la réservation + solde avant départ
- Confirmation bilingue FR/EN

---

## ASSETS

Photos fournies par le client dans un dossier kit.
Claude Code doit demander explicitement si un asset manque
plutôt que d'utiliser un placeholder sans signaler.
Format cible : WebP, lazy loading systématique.

---

## STACK

HTML/CSS/JS vanilla + hébergement statique (Netlify ou Vercel).
Pas de CMS — client ne modifie pas le contenu.
Widget réservation : embed externe, pas de dev custom.

---

## DÉCISIONS PRISES

- 2026-06 : 3 pages uniquement (Accueil / Circuits+Faune / Réservation)
- 2026-06 : Équipe intégrée dans la page Accueil, pas de page dédiée
- 2026-06 : Faune intégrée dans la page Circuits, pas de page dédiée
- 2026-06 : Grindelwald intégré dans les circuits, pas de page dédiée
- 2026-06 : Tarif weekend 450 CHF tout inclus
- 2026-06 : Tarif journée 150 CHF, groupes 8 max
- 2026-06 : Gloock (titres) + Jost (corps) comme combo typographique (remplacement de Cormorant+DM Sans)
- 2026-06 : Site statique, pas de CMS

---

## SKILLS À INVOQUER SUR CE PROJET

1. `/impeccable` mode brand — dès le début, fixer direction visuelle
2. `/frontend-design` — avant chaque nouveau composant
3. `/ux-copy` — textes hero, CTA, descriptions circuits
4. `/accessibility-review` — avant livraison finale
