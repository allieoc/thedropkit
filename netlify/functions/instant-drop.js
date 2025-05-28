const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event) {
  const { description } = JSON.parse(event.body);

  const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(config);

  const prompt = `
You are a creative strategist for The Drop Kit. Based on the description below, generate a mini brand kit with:

1. Strategy summary
2. 3-post content plan
3. 1 caption draft
4. Visual direction

Description: ${description}
`;

  const response = await openai.createChatCompletion({
    model: "gpt-4-1106-preview",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ kit: response.data.choices[0].message.content }),
  };
};
