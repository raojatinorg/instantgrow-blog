'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Sparkles, Copy, Check, Zap } from 'lucide-react';

export default function BlogPromptGenerator() {
  const [topic, setTopic] = useState('');
  const [prompt, setPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    if (!topic.trim()) {
      alert('Please enter a topic!');
      return;
    }

    const generatedPrompt = `Create a comprehensive, SEO-optimized blog post about "${topic}" that will rank #1 on Google.

🎯 IMPORTANT: Format your response EXACTLY as shown below so I can copy-paste directly into my blog admin panel.

---START OF BLOG POST---

TITLE:
[Write a compelling, click-worthy title (50-60 characters) with main keyword]

EXCERPT:
[Write 150-160 character meta description that's engaging and includes main keyword]

CATEGORY:
[Choose ONE: Website Development, SEO, Brand Building, Digital Marketing, Business Growth]

TAGS:
[Provide 5-7 comma-separated tags: tag1, tag2, tag3, tag4, tag5]

CONTENT:
[Write 2000+ word blog post in HTML format with these requirements:


1. Use ONLY these HTML tags: <h2>, <h3>, <p>, <strong>, <ul>, <li>, <ol>, <a>
2. Start with engaging introduction (200 words)
3. Include 6-8 main sections with <h2> headings
4. Use <h3> for subsections
5. Add bullet points with <ul> and <li>
6. Use <strong> for important keywords
7. Keep paragraphs short (2-3 sentences)
8. Include actionable tips and examples
9. Add statistics and data where relevant
10. End with strong conclusion and CTA
11. Write in conversational, engaging tone
12. Target audience: Business owners and entrepreneurs
13. Naturally include keywords 8-10 times
14. Use transition words between sections

Example structure:
<h2>Introduction Heading</h2>
<p>Opening paragraph with hook...</p>

<h2>Main Section 1</h2>
<p>Content here...</p>
<ul>
<li>Bullet point 1</li>
<li>Bullet point 2</li>
</ul>

<h3>Subsection</h3>
<p>More detailed content...</p>

[Continue with 5-7 more sections...]

<h2>Conclusion</h2>
<p>Summary and call-to-action...</p>
]

META TITLE (SEO):
[60 characters max, keyword-rich title for search engines]

META DESCRIPTION (SEO):
[160 characters max, compelling description for search results]

FOCUS KEYWORDS:
[10 comma-separated keywords: keyword1, keyword2, keyword3...]

COVER IMAGE PROMPT:
[DALL-E/Midjourney prompt: "Professional 16:9 image of ${topic}, modern minimalist style, golden and green color accents, high quality, business photography, clean composition, professional lighting"]

---END OF BLOG POST---

📋 COPY-PASTE INSTRUCTIONS:
1. Copy everything between START and END markers
2. In admin panel, paste Title in title field
3. Paste Excerpt in excerpt field
4. Select Category from dropdown
5. Paste Tags in tags field
6. Switch to HTML mode and paste Content
7. Paste Meta Title in SEO meta title field
8. Paste Meta Description in SEO meta description field
9. Paste Focus Keywords in keywords field
10. Use Cover Image Prompt in DALL-E to generate image
11. Upload generated image
12. Click Save!

🚀 SEO OPTIMIZATION CHECKLIST:
✅ Title includes main keyword
✅ First paragraph includes keyword
✅ H2 headings include variations of keyword
✅ Content is 2000+ words
✅ Internal linking opportunities identified
✅ Meta description is compelling
✅ Keywords used naturally throughout
✅ Content provides real value
✅ Clear call-to-action included
✅ Mobile-friendly HTML structure

Now generate the complete blog post in the exact format above.`;

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
