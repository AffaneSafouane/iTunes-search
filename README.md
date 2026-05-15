# iTunes Explorer - React Native

## Description du projet
Cette application React Native permet d'explorer l'immense base de données d'iTunes via leur API publique. Les utilisateurs peuvent rechercher des musiques par artiste ou par nom de piste, consulter les détails d'un morceau, l'ajouter à une collection personnelle (base de données locale) et lui attribuer une note personnalisée.

## Règles d'architecture 
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
        
## Installation et Lancement
 
```bash
# Cloner le dépôt
git clone https://github.com/AffaneSafouane/iTunes-search.git
cd itunes-search
 
# Installer les dépendances
npm install
 
# Lancer l'application (Expo)
npx expo start ---tunnel
```
 
> **Prérequis :** Node.js ≥ 18, npm ≥ 9, et l'application [Expo Go](https://expo.dev/go) sur votre appareil mobile (ou un émulateur iOS/Android configuré localement).