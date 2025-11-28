'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function BlogPromptGenerator() {
  const [topic, setTopic] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    if (!topic.trim()) {
      alert('Please enter a topic!');
      return;
    }

    const generatedPrompt = `Create a comprehensive, SEO-optimized blog post about "${topic}" with the following structure:

**Title:**
Create a compelling, click-worthy title (50-60 characters) that includes the main keyword and creates curiosity.

**Excerpt:**
Write a 150-160 character meta description that summarizes the blog post and includes the main keyword. Make it engaging and actionable.

**Content:**
Write a detailed, well-structured blog post (minimum 1500 words) with:

1. **Introduction** (150-200 words)
   - Hook the reader with a compelling opening
   - Explain why this topic matters
   - Preview what they'll learn

2. **Main Content** (1200-1400 words)
   - Use H2 and H3 headings for structure
   - Include 5-7 main sections
   - Add bullet points and numbered lists
   - Use short paragraphs (2-3 sentences max)
   - Include practical examples and actionable tips
   - Add statistics or data where relevant
   - Use bold text for emphasis on key points

3. **Conclusion** (100-150 words)
   - Summarize key takeaways
   - Include a clear call-to-action
   - Encourage engagement

**Formatting Requirements:**
- Use HTML tags: <h2>, <h3>, <p>, <strong>, <ul>, <li>, <ol>
- Make content scannable and easy to read
- Include transition words between sections
- Write in a conversational, engaging tone
- Target audience: Business owners and entrepreneurs

**Category:**
Suggest the most appropriate category from: Website Development, SEO, Brand Building, Digital Marketing, Business Growth

**Tags:**
Provide 5-7 relevant tags (comma-separated) that are SEO-friendly and describe the content

**Cover Image Prompt:**
Create a detailed DALL-E/Midjourney prompt for a professional 16:9 cover image that represents "${topic}". The prompt should describe:
- Main subject/concept
- Style (modern, professional, minimalist)
- Color scheme (golden, green, black accents)
- Composition (centered, rule of thirds)
- Mood/atmosphere
- Technical specs: "16:9 aspect ratio, high quality, professional photography style"

**SEO Keywords:**
List 10 relevant keywords and phrases to naturally include in the content

**Internal Linking Suggestions:**
Suggest 3-5 related topics that could be linked to from this post

Now generate the complete blog post following this structure.`;

    setPrompt(generatedPrompt);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Blog Prompt Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Blog Topic / Keyword
            </label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., How to grow your business with SEO"
              className="text-lg"
            />
          </div>

          <Button 
            onClick={generatePrompt} 
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Powerful Prompt
          </Button>

          {prompt && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Generated Prompt</h3>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Prompt
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-muted p-6 rounded-lg border border-border">
                <pre className="whitespace-pre-wrap text-sm font-mono">
                  {prompt}
                </pre>
              </div>

              <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                <h4 className="font-semibold mb-2 text-secondary">📋 How to Use:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Copy the generated prompt above</li>
                  <li>Paste it into ChatGPT, Claude, or any AI tool</li>
                  <li>AI will generate complete blog content</li>
                  <li>Copy the Title, Excerpt, Content, Category, Tags</li>
                  <li>Use the image prompt in DALL-E or Midjourney</li>
                  <li>Paste everything in the blog editor</li>
                  <li>Review, edit if needed, and publish!</li>
                </ol>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2 text-primary">💡 Pro Tips:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Always review and personalize AI-generated content</li>
                  <li>Add your own examples and experiences</li>
                  <li>Check facts and statistics</li>
                  <li>Optimize for your target audience</li>
                  <li>Use the image prompt to create unique cover images</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
