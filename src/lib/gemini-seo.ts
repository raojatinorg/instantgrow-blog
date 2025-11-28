const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface SEOResult {
  viralTitles: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  viralHooks: string[];
  contentSuggestions: string[];
}

export async function generateViralSEO(title: string, content: string, excerpt: string): Promise<SEOResult> {
  try {
    const prompt = `You are an expert SEO specialist and viral content creator. Analyze this blog post and create viral-optimized SEO elements.

Blog Title: ${title}
Excerpt: ${excerpt}
Content Preview: ${content.substring(0, 500)}...

Generate the following in JSON format:

{
  "viralTitles": [
    "5 click-worthy alternative titles that will go viral (50-60 chars each, include power words like: Ultimate, Secret, Proven, Shocking, Revolutionary)"
  ],
  "metaTitle": "SEO-optimized meta title (exactly 60 characters, includes main keyword, compelling)",
  "metaDescription": "Viral meta description (exactly 160 characters, includes CTA, creates curiosity, keyword-rich)",
  "keywords": [
    "20 highly relevant keywords including: main keywords, LSI keywords, long-tail keywords, trending terms"
  ],
  "viralHooks": [
    "5 viral angles/hooks that will make people click and share"
  ],
  "contentSuggestions": [
    "5 specific improvements to make content more viral and SEO-friendly"
  ]
}

Focus on:
- Click-through rate optimization
- Viral potential
- Search engine ranking
- Social media shareability
- Trending keywords
- Emotional triggers

Return ONLY valid JSON, no markdown or explanations.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response (remove markdown if present)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from AI');
    }
    
    const result: SEOResult = JSON.parse(jsonMatch[0]);
    
    return result;
  } catch (error) {
    console.error('Gemini SEO generation error:', error);
    
    // Fallback to basic SEO if AI fails
    return {
      viralTitles: [
        `${title} - Complete Guide`,
        `How to ${title}: Step-by-Step`,
        `${title}: Everything You Need to Know`,
        `The Ultimate ${title} Guide`,
        `${title} - Proven Strategies`
      ],
      metaTitle: title.substring(0, 60),
      metaDescription: excerpt.substring(0, 160),
      keywords: extractKeywords(title + ' ' + content),
      viralHooks: [
        'Discover the secrets that experts don\'t want you to know',
        'This simple trick will change everything',
        'What nobody tells you about this topic',
        'The surprising truth revealed',
        'Why this matters more than you think'
      ],
      contentSuggestions: [
        'Add more statistics and data',
        'Include real-world examples',
        'Add actionable tips',
        'Include expert quotes',
        'Add visual elements'
      ]
    };
  }
}

function extractKeywords(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/<[^>]*>/g, '')
    .split(/\s+/)
    .filter(word => word.length > 4)
    .filter((word, index, self) => self.indexOf(word) === index)
    .slice(0, 20);
  
  return words;
}

export async function generateViralTitle(topic: string): Promise<string[]> {
  try {
    const prompt = `Generate 5 viral, click-worthy blog titles for: "${topic}"

Requirements:
- 50-60 characters each
- Include power words (Ultimate, Secret, Proven, Revolutionary, etc.)
- Create curiosity and urgency
- SEO-optimized with main keyword
- High CTR potential

Return as JSON array: ["title1", "title2", "title3", "title4", "title5"]`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return [topic];
  } catch (error) {
    console.error('Title generation error:', error);
    return [topic];
  }
}
