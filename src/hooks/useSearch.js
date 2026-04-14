import { useState } from 'react';

function getMockData(name) {
  const isBad = (name || '').toLowerCase().includes('maggi') || (name || '').toLowerCase().includes('oreo');
  return {
    healthScore: isBad ? 24 : 65,
    verdict: isBad ? 'JUNK FOOD' : 'MODERATE',
    verdictColorText: isBad ? 'error' : 'warning',
    verdictReason: isBad ? 'Molecular density indicates high synthetic load.' : 'Acceptable processing parameters.',
    ingredientsList: [
      { name: 'Flour/Base', type: 'warning' },
      { name: isBad ? 'Palm Oil' : 'Vegetable Oil', type: isBad ? 'error' : 'warning' },
      { name: 'Artificial Flavor', type: 'error' },
    ],
    aiSummary: `> INITIALIZING SCAN... COMPLETED.\n> STATUS: ${
      isBad ? 'CRITICAL ADDITIVE LOAD DETECTED.' : 'WITHIN NORMAL PARAMETERS.'
    }\n> RECOMMENDATION: ${
      isBad ? 'AVOID REPEATED EXPOSURE.' : 'OBSERVE PORTION CONTROL.'
    }`,
    regional: [
      { name: 'Oil Base', in: 'Palm Oil', us_eu: 'Canola/Sunflower', flag: 'worse' },
      { name: 'Sweeteners', in: 'HFCS & Refined', us_eu: 'Regulated Beet', flag: 'worse' },
    ],
  };
}

export function useSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loaderMessage, setLoaderMessage] = useState('');

  const search = async (query) => {
    if (!query) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    setError(null);
    setIsLoading(true);

    try {
      setLoaderMessage('> REQUESTING OFF DATABASE...');
      const offReq = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          query
        )}&action=process&json=1&page_size=1&fields=id,product_name,brands,ingredients_text,nutriments,nutriscore_grade,nova_group,image_url,quantity`,
        { headers: { 'User-Agent': 'NutriLens/1.0' } }
      );
      const offRes = await offReq.json();

      if (!offRes.products || offRes.products.length === 0) {
        throw new Error('No molecular record found for this specimen.');
      }
      const prod = offRes.products[0];
      setProduct(prod);

      setLoaderMessage('> INITIALIZING GEMINI AI...');

      let aiResult;
      if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        await new Promise((r) => setTimeout(r, 1000));
        aiResult = getMockData(prod.product_name);
      } else {
        const prompt = `
Analyze this product:
Name: ${prod.product_name}
Brand: ${prod.brands}
Ingredients: ${prod.ingredients_text || 'Unknown'}

Return ONLY a raw, unformatted JSON object:
{
  "healthScore": 45,
  "verdict": "JUNK FOOD", 
  "verdictColorText": "error",
  "verdictReason": "High sodium and saturated fats from palm oil.",
  "ingredientsList": [
    {"name": "Refined Flour", "type": "warning"}, 
    {"name": "Palm Oil", "type": "error"}, 
    {"name": "Salt", "type": "warning"}
  ],
  "aiSummary": "> DETECTED SYNTHETIC LOAD... \\n> AVOID REGULAR CONSUMPTION.",
  "regional": [
    {"name": "Oil Base", "in": "Palm Oil", "us_eu": "Sunflower Oil", "flag": "worse"}
  ]
}
`;
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { response_mime_type: 'application/json' },
              }),
            }
          );
          if (!res.ok) throw new Error('Gemini API request failed.');
          const json = await res.json();
          aiResult = JSON.parse(json.candidates[0].content.parts[0].text.trim());
        } catch (e) {
          aiResult = getMockData(prod.product_name);
        }
      }

      setAnalysis(aiResult);
    } catch (err) {
      setError(err.message || 'Error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, product, analysis, loaderMessage, search };
}
