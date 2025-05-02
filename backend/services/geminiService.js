const axios = require("axios");

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("Gemini API Key loaded:", GEMINI_API_KEY ? "Yes" : "No");

function formatMealDescription(text) {
  // Remove any trailing periods and spaces
  text = text.trim().replace(/\.+$/, "");
  // Split by periods followed by a space and join with newlines
  return text.split(/\.\s+/).filter(Boolean).join(".\n") + ".";
}

function buildPrompt(userData) {
  // Process cuisine preferences to provide more context
  const cuisineContext =
    userData.cuisinePreferences
      ?.map((cuisine) => {
        if (cuisine === "northIndian")
          return "North Indian (e.g., butter chicken, naan, dal makhani)";
        if (cuisine === "southIndian")
          return "South Indian (e.g., dosa, idli, sambar)";
        return cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
      })
      .join(", ") || "Not specified";

  return `You are a professional nutritionist. Create a personalized diet plan based on the following user information:

Personal Information:
- Age: ${
    userData.dob
      ? new Date().getFullYear() - new Date(userData.dob).getFullYear()
      : "Not specified"
  }
- Gender: ${userData.gender || "Not specified"}
- Height: ${userData.height || "Not specified"} cm
- Weight: ${userData.weight || "Not specified"} kg
- Activity Level: ${userData.activityLevel || "Not specified"}

Dietary Preferences and Restrictions:
- Dietary Restrictions: ${userData.dietaryRestrictions?.join(", ") || "None"}
- Allergies: ${userData.allergies?.join(", ") || "None"}
- Diet Goals: ${userData.dietGoals?.join(", ") || "Not specified"}
- Cuisine Preferences: ${cuisineContext}
- Budget: ${userData.budget || "Not specified"}

Generate a detailed, personalized diet plan that includes:
1. Daily calorie target based on the user's information
2. Macronutrient distribution (carbs, protein, fats) in percentages and grams
3. A detailed meal plan for breakfast, lunch, dinner, and snacks. For each meal, include:
   - Main dishes and sides
   - A healthy drink suggestion (e.g., water, tea, smoothie, etc.)
   - Portion sizes where applicable
4. A comprehensive shopping list organized by food categories

Return the response in the following JSON format:
{
  "targetCalories": number,
  "macros": {
    "carbohydrates": {"percentage": number, "grams": number},
    "protein": {"percentage": number, "grams": number},
    "fats": {"percentage": number, "grams": number}
  },
  "mealPlan": {
    "breakfast": "detailed description with food items and a drink suggestion",
    "lunch": "detailed description with food items and a drink suggestion",
    "dinner": "detailed description with food items and a drink suggestion",
    "snacks": "detailed description with food items and a drink suggestion"
  },
  "shoppingList": {
    "proteins": ["item1", "item2", ...],
    "vegetablesFruits": ["item1", "item2", ...],
    "grainsLegumes": ["item1", "item2", ...],
    "healthyFats": ["item1", "item2", ...],
    "beverages": ["item1", "item2", ...],
    "spicesCondiments": ["item1", "item2", ...]
  }
}

Make sure the plan is:
- Realistic and achievable
- Takes into account the user's dietary restrictions and allergies
- Includes a variety of foods and healthy drinks
- Considers the user's cuisine preferences (if North Indian or South Indian is selected, include appropriate regional dishes)
- Fits within their budget
- Provides balanced nutrition
- Each meal description should be detailed and each component should end with a period
- Include appropriate drinks that complement each meal and support the user's health goals
- If Indian cuisines are selected, include appropriate regional beverages (e.g., lassi, buttermilk, masala chai)`;
}

async function generateDietPlan(userData) {
  try {
    console.log("Starting diet plan generation...");
    const prompt = buildPrompt(userData);
    console.log("Generated prompt:", prompt);

    const requestBody = {
      model: "gemini-1.5-pro",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 1,
        topK: 1,
      },
    };

    console.log("Sending request to Gemini API...");
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      requestBody
    );

    console.log("Received response from Gemini API");
    const text = response.data.candidates[0].content.parts[0].text;
    console.log("Raw Gemini response:", text);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in Gemini response");
    }

    const parsedPlan = JSON.parse(jsonMatch[0]);
    console.log("Parsed diet plan:", parsedPlan);

    // Format meal descriptions to add line breaks
    parsedPlan.mealPlan = {
      breakfast: formatMealDescription(parsedPlan.mealPlan.breakfast),
      lunch: formatMealDescription(parsedPlan.mealPlan.lunch),
      dinner: formatMealDescription(parsedPlan.mealPlan.dinner),
      snacks: formatMealDescription(parsedPlan.mealPlan.snacks),
    };

    return parsedPlan;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

module.exports = {
  generateDietPlan,
};
