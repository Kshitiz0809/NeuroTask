// Lightweight client to call the Python AI microservice
// Uses native fetch available in Node 18+

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8001';

export async function suggestPriority(description) {
  try {
    const res = await fetch(`${AI_SERVICE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: description || '' }),
    });

    if (!res.ok) {
      throw new Error(`AI service responded with ${res.status}`);
    }

    const data = await res.json();
    return {
      priority: data.label, // High | Medium | Low
      rawLabel: data.raw_label,
      score: data.score,
    };
  } catch (err) {
    console.error('AI service call failed:', err.message);
    // Fallback to Medium if AI is unavailable
    return { priority: 'Medium', rawLabel: 'normal', score: 0 };
  }
}
