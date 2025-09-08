export default async function handler(request, response) {

  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { prompt } = request.body;
  if (!prompt) {
    return response.status(400).json({ message: 'Prompt is required' });
  }

  const API_KEY = process.env.API_KEY;

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-005:predict?key=${API_KEY}`;

  const payload = {
    instances: [{ prompt: prompt }],
    parameters: { "sampleCount": 1 }
  };

  try {
    const apiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error("Google API Error:", errorData);
      return response.status(apiResponse.status).json({ message: errorData.error.message });
    }

    const result = await apiResponse.json();
    return response.status(200).json(result);

  } catch (error) {
    console.error("Internal Server Error:", error);
    return response.status(500).json({ message: 'Failed to generate image.' });
  }
}