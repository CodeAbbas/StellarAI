# Stellar Image AI

Stellar Image AI is a sleek, minimalist web application for generating images from text prompts using AI. It features an immersive, dark-mode UI and saves a history of your creations for the current session.

---

## ✨ Features

-   **AI Image Generation**: Creates images from text descriptions.
-   **Immersive UI**: A clean, futuristic interface that puts the generated art front and center.
-   **Generation History**: A session-based tray to quickly review and recall recent creations.
-   **Secure**: API keys are handled securely on the backend and are not exposed to the public.

---

## 🚀 Getting Started & Deployment

This project is optimized for deployment on **Vercel**.

### **Step 1: Set Up Your GitHub Repository**

1.  Create a new **private** repository on GitHub.
2.  Add the files from this project (`index.html`, `app.js`, etc.) to the repository.

### **Step 2: Deploy on Vercel**

1.  Sign up for a Vercel account and connect it to your GitHub.
2.  Import your new GitHub repository into Vercel. Vercel will automatically detect the project settings.
3.  **Crucially, set up the Environment Variable** to protect your API key:
    -   In your Vercel project settings, go to **Settings > Environment Variables**.
    -   Create a new variable with the name `HUGGING_FACE_API_KEY`.
    -   Paste your actual Hugging Face API key (e.g., `hf_...`) into the value field.
    -   Click **Save**.
4.  Deploy your project. Vercel will give you a domain, and you can add a custom one later in the project settings.