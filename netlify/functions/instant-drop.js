const OpenAI = require("openai");

exports.handler = async function (event) {
  const { brandName, brandDesc } = JSON.parse(event.body);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You are a creative strategist helping a brand called "${brandName}". Based on the description below, generate a mini brand kit with:

1. Strategy summary (tone, goals, audience)
2. 3-post content plan (headlines + formats)
3. 1 caption draft
4. Visual direction (colors, typography, layout)

Brand description: ${brandDesc}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.75,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ kit: response.choices[0].message.content }),
    };
  } catch (error) {
    console.error("OpenAI error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate kit" }),
    };
  }
};
