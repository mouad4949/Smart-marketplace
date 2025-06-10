
# 🚀 MissionGenerator - Générateur de Fiches de Mission par IA

![alt text](https://img.shields.io/badge/React-Next.js-blue?style=for-the-badge&logo=react)

  


![alt text](https://img.shields.io/badge/.NET-8-purple?style=for-the-badge&logo=dotnet)



![alt text](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)



![alt text](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)



**MissionGenerator** est une application web full-stack qui transforme de simples descriptions de besoin en fiches de mission techniques, structurées et prêtes à l'emploi. Grâce à l'IA de **Google Gemini**, elle permet de standardiser et d'accélérer la création d'offres pour les freelances et les entreprises.

## 🌟 Démo Visuelle

Voici une démonstration rapide du fonctionnement de l'application, de la saisie initiale à la génération complète du formulaire.





  


### Captures d'écran

Interface de Saisie Initiale

Formulaire Généré et Rempli

----------

## ✨ Fonctionnalités Principales

-   **Génération par IA** : Saisissez une description en langage naturel et laissez l'IA générer une fiche de mission complète.
    
-   **Formulaire Éditable** : Modifiez et affinez tous les champs générés par l'IA avant de les utiliser.
    
-   **Interface Moderne et Réactive** : Une expérience utilisateur fluide et agréable construite avec les dernières technologies frontend.
    
-   **Rendu Markdown** : Les descriptions détaillées supportent le format Markdown pour un affichage riche.
    
-   **Notifications en Temps Réel** : Retours visuels instantanés sur l'état des opérations (chargement, succès, erreur).
    
-   **Architecture Robuste** : Un backend .NET performant et un frontend Next.js découplés pour une maintenabilité optimale.
    

----------

## 🛠️ Stack Technique

L'application est divisée en deux projets principaux : un frontend en Next.js et un backend en ASP.NET Core.

### **Frontend (Next.js 14)**

-   **Framework** : [Next.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnextjs.org%2F) (App Router)
    
-   **Langage** : [TypeScript](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.typescriptlang.org%2F)
    
-   **Styling** : [Tailwind CSS](https://www.google.com/url?sa=E&q=https%3A%2F%2Ftailwindcss.com%2F)
    
-   **Composants UI** : [shadcn/ui](https://www.google.com/url?sa=E&q=https%3A%2F%2Fui.shadcn.com%2F)
    
-   **Client HTTP** : [Axios](https://www.google.com/url?sa=E&q=https%3A%2F%2Faxios-http.com%2F)
    
-   **Notifications** : react-hot-toast
    
-   **Icônes** : lucide-react
    

### **Backend (ASP.NET Core 8)**

-   **Framework** : [.NET 8](https://www.google.com/url?sa=E&q=https%3A%2F%2Fdotnet.microsoft.com%2Fdownload%2Fdotnet%2F8.0)
    
-   **Langage** : C# 12
    
-   **API** : API Web ASP.NET Core
    
-   **Moteur IA** : [Google Gemini](https://www.google.com/url?sa=E&q=https%3A%2F%2Fai.google.dev%2F) via le package Google.AI.GenerativeAI
    
-   **Documentation API** : Swashbuckle (Swagger UI)
    

----------

## 🏗️ Architecture

Le flux de données est simple et robuste :

1.  **Utilisateur** ➔ Saisit une description dans l'interface **Frontend (Next.js)**.
    
2.  **Frontend** ➔ Envoie une requête POST avec la description au **Backend**.
    
3.  **Backend (ASP.NET Core)** ➔ Reçoit la requête, la valide et construit un prompt.
    
4.  **Backend** ➔ Appelle l'API **Google Gemini** avec le prompt.
    
5.  **Google Gemini** ➔ Analyse le texte et retourne une structure JSON.
    
6.  **Backend** ➔ Renvoie la réponse JSON au **Frontend**.
    
7.  **Frontend** ➔ Met à jour l'état de l'application et remplit le formulaire avec les données reçues.
    

----------

## 🚀 Démarrage et Installation Locale

Pour lancer le projet complet en local, vous devrez lancer le backend et le frontend séparément.

### **Prérequis**

-   [Node.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnodejs.org%2F) v18 ou supérieur
    
-   [.NET 8 SDK](https://www.google.com/url?sa=E&q=https%3A%2F%2Fdotnet.microsoft.com%2Fdownload%2Fdotnet%2F8.0)
    
-   Une **Clé API Google Gemini** (voir section suivante)
    

### **1. Configuration de la Clé API**

Le backend a besoin d'une clé API pour communiquer avec Google Gemini.

-   Obtenez votre clé depuis [Google AI Studio](https://www.google.com/url?sa=E&q=https%3A%2F%2Faistudio.google.com%2F).
    
-   À la racine du projet backend (/MissionGenerator.Api), exécutez ces commandes :
    
          `# Initialise les secrets pour le projet
    dotnet user-secrets init
    
    # Remplacez VOTRE_CLE_API_GEMINI par votre clé
    dotnet user-secrets set "Gemini:ApiKey" "VOTRE_CLE_API_GEMINI"`
        
    
    IGNORE_WHEN_COPYING_START
    

-   Use code [with caution](https://support.google.com/legal/answer/13505487). Bash
    
    IGNORE_WHEN_COPYING_END
    

### **2. Lancer le Backend**

Ouvrez un premier terminal :

      `# Allez dans le dossier du backend
**cd MissionGenerator.Api_Backend**

# Restaurez les dépendances
**dotnet restore**

# Lancez le serveur
**dotnet run`**
    

🎉 Le backend est maintenant accessible sur **http://localhost:5011**.

### **3. Lancer le Frontend**

Ouvrez un second terminal :

      `# Allez dans le dossier du frontend
**cd mission-generator_frontend**
# Installez les dépendances
***npm install***

# Lancez le serveur de développement
***npm run dev`***
    

🎉 L'application est maintenant accessible sur **http://localhost:3000**.

----------

## 🗺️ Roadmap et Améliorations Futures

-   **Support Multi-Modèles** : Permettre de choisir entre Gemini, OpenAI GPT, ou Groq.
    
-   **Authentification Utilisateur** : Créer des comptes pour sauvegarder l'historique des missions générées.
    
-   **Export en PDF/Markdown** : Ajouter un bouton pour télécharger la fiche de mission.
    
-   **Thème Sombre/Clair** : Permettre à l'utilisateur de basculer entre les thèmes.
    
-   **Internationalisation (i18n)** : Traduire l'interface en plusieurs langues.
    

----------

    

----------

