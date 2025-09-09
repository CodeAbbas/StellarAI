# ✨ Stellar Image AI

A sleek, minimalist web application for generating stunning images from text prompts using Google's Imagen AI. This project features a secure, serverless backend and a reactive, dark-mode UI that saves a history of your creations.

---

![Stellar Image AI Screenshot](https://api.pikwy.com/web/68bfe7e7c3f3a1504e503658.jpg)
> *Suggestion: Take a screenshot of your finished app and replace the URL above to showcase your project!*

---

## 🚀 Features

-   **AI Image Generation**: Leverages Google's Imagen model to create high-quality images from text descriptions.
-   **Secure Serverless Backend**: All API calls are routed through a Vercel serverless function, ensuring your API key is never exposed on the front-end.
-   **Immersive UI**: A clean, futuristic interface that puts the generated art front and center.
-   **Generation History**: A session-based tray to quickly review creations.
-   **Download Images**: Easily save your favorite creations with a one-click download button on each history item.
-   **Responsive Design**: A great user experience on both desktop and mobile devices.

---

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3, Vanilla JavaScript
-   **Styling**: Tailwind CSS
-   **Backend**: Vercel Serverless Functions (Node.js)
-   **AI Model**: Google Imagen via the Generative Language API
-   **Deployment**: Vercel

---

## ⚙️ Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later)
-   [Vercel CLI](https://vercel.com/docs/cli) installed (`npm install -g vercel`)
-   A Google Cloud API Key with the Generative Language API enabled.

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/StellarAI.git](https://github.com/your-username/StellarAI.git)
    cd StellarAI
    ```

2.  **Create a local environment file:**
    Create a new file in the root of the project named `.env.local`. This file is already in your `.gitignore` and will store your secret key locally.
    ```
    # File: .env.local
    API_KEY="your_google_api_key_paste_it_here"
    ```

3.  **Run the development server:**
    Use the Vercel CLI to start the local server. It will automatically load the secret key from your `.env.local` file.
    ```bash
    vercel dev
    ```
    Your application should now be running on `http://localhost:3000`.

### Deployment to Vercel

This project is optimized for one-click deployment on **Vercel**.

1.  **Push your project to GitHub.**

2.  **Import your repository into Vercel.** Vercel will automatically detect the project settings.

3.  **Set up the Environment Variable:**
    -   In your Vercel project dashboard, go to **Settings > Environment Variables**.
    -   Create a new variable with the name `API_KEY`.
    -   Paste your actual Google API key into the value field.
    -   Click **Save**.

4.  **Deploy your project.** Vercel will handle the rest!
