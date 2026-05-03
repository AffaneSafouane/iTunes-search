# iTunes Explorer - React Native 🎵

## Description du projet
Cette application React Native permet d'explorer l'immense base de données d'iTunes via leur API publique. Les utilisateurs peuvent rechercher des musiques par artiste ou par nom de piste, consulter les détails d'un morceau, l'ajouter à une collection personnelle (base de données locale) et lui attribuer une note personnalisée.

## Règles d'architecture (Context for AI & Contributors)
* **Composants modulaires :** Ce projet privilégie strictement l'utilisation de plusieurs petits composants simples et réutilisables (ex: `SearchBar`, `TrackItem`, `RatingStars`) plutôt que de gros composants monolithiques.
* **Lisibilité :** Le code doit être clair, strictement typé et commenté aux endroits clés pour expliquer la logique (pas de commentaires redondants).
        
## Stack Technique
* **Framework :** React Native (avec TypeScript)
* **Navigation :** React Navigation
* **Appels API :** `fetch`
* **Stockage local :** `AsyncStorage` (pour sauvegarder la collection et les notes)

## API Reference
* **Base URL :** `https://itunes.apple.com/search`
* **Documentation :** [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)
* **Paramètres prévus :** Requêtes basées sur `term` (filtrées par `attribute=artistTerm` ou `attribute=songTerm`) et `entity=song`.

## Fonctionnalités Prévues
1.  **Recherche :** Barre de recherche permettant de requêter par artiste ou par nom de piste.
2.  **Liste des résultats :** Affichage fluide d'une liste d'éléments sélectionnables.
3.  **Vue détaillée :** Page spécifique affichant les informations d'un résultat sélectionné.
4.  **Collection personnelle :** Possibilité d'ajouter un résultat à sa propre base de données locale.
5.  **Notation :** Système de rating personnalisé pour évaluer les morceaux sauvegardés.
        
# Installation et Lancement

## Prérequis

Assurez-vous d'avoir installé **Node.js** sur votre machine, ainsi que l'application **Expo Go** sur votre smartphone (iOS ou Android) pour tester physiquement, ou un émulateur configuré.

---

## Étapes d'installation

### 1. Cloner le dépôt (ou extraire l'archive du projet)

```bash
git clone [iTunes](https://github.com/AffaneSafouane/iTunes.git)
cd iTunes
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le serveur de développement Expo

```bash
npx expo start
```

### 4. Ouvrir l'application

- Scannez le **QR code** affiché dans le terminal avec l'application **Expo Go** (Android) ou l'application **Appareil Photo** (iOS).
- Appuyez sur `a` dans le terminal pour ouvrir sur un émulateur Android, ou `i` pour un simulateur iOS (si installés).
