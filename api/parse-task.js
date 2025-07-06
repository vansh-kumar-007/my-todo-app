export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { text } = req.body;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    res.status(500).json({ error: "OpenAI API Key not set" });
    return;
  }
  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "No text provided" });
    return;
  }

  try {
    const prompt = `
Parse the following todo task from a user. Extract:
- Task text (short, actionable, no date/time)
- Due date/time, as an ISO string ("null" if not present)
- If it's recurring, the rule in plain English (e.g. "every Friday" or "daily at 7am", "null" if not recurring).
Return JSON: {text: "...", dueDate: "...", recurrence: "..."}
Input: "${text}"
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that extracts structured data from natural language task descriptions." },
          { role: "user", content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.2
      }),
    });

    const result = await response.json();
    const aiContent = result.choices?.[0]?.message?.content;
    console.log("OpenAI raw response:", JSON.stringify(result));
    console.log("OpenAI message content:", aiContent);

    let parsed;
    try {
      parsed = JSON.parse(aiContent);
    } catch (e) {
      // Log the error and content for debugging
      console.error("Error parsing JSON from OpenAI:", e, aiContent);
      res.status(500).json({ error: "AI parsing failed", aiContent });
      return;
    }
    res.status(200).json(parsed);
  } catch (err) {
    // Log the error for debugging
    console.error("Unexpected error:", err);
    res.status(500).json({ error: err.message });
  }
}