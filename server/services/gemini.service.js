import dotenv from "dotenv";

dotenv.config();

export async function analyzeWithGemini(content, type = "news") {
    const systemInstructions = `
    You are an AI-powered News & Social Media Fact-Checking System.
    Strict Operational Protocol:
    1. OBJECTIVE: Extract and verify factual claims from the provided text.
    2. SUMMARY: Provide a 2-sentence summary of the ACTUAL NEWS STORY or POST content.
    3. HIGHLIGHTS: Array of 3 key points/metrics from the story.
    4. SOURCE LINKS: Provide an array of URLs to reputable fact-checkers or mainstream news agencies.
    5. CRITICAL: If the provided content contains "Google News" branding or UI elements, IGNORE THEM.
    6. OUTPUT: Return STRICTLY JSON with keys: verdict, credibilityScore, summary, highlights, detection, claimExtraction, reasoning, sourceLinks, suggestions.
    `;

    const userPrompt = `
    Analyze this ${type} intelligence feed:
    "${content.substring(0, 10000)}"

    Return strictly valid JSON. If any array field has no data, return [].
    `;

    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemInstructions }]
                },
                contents: [{
                    parts: [{ text: userPrompt }]
                }],
                generationConfig: {
                    response_mime_type: "application/json"
                }
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || `Gemini API Error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        throw error;
    }
}
