'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, Share2, Copy, Check } from 'lucide-react';
import { useState, Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const title = searchParams.get('title');
  const [copied, setCopied] = useState(false);

  const blogUrl = typeof window !== 'undefined' ? `${window.location.origin}/en/blog/${slug}` : '';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-background flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full shadow-2xl border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground text-center pb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-20 w-20 animate-bounce" />
          </div>
          <CardTitle className="text-3xl font-bold">🎉 Blog Published Successfully!</CardTitle>
          <p className="text-primary-foreground/90 mt-2">Your blog is now live and ready to go viral!</p>
        </CardHeader>

        <CardContent className="space-y-6 pt-8">
          <div className="bg-muted p-6 rounded-lg border-2 border-primary/20">
            <h3 className="font-bold text-lg mb-2">📝 {title}</h3>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                value={blogUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-background border rounded text-sm"
              />
              <Button
                size="sm"
                onClick={() => copyToClipboard(blogUrl)}
                variant="outline"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Button
              onClick={() => window.open(blogUrl, '_blank')}
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              View Live Blog
            </Button>
            <Button
              onClick={() => window.location.href = '/en/admin'}
              variant="outline"
              size="lg"
            >
              Back to Dashboard
            </Button>
          </div>

          <Card className="border-2 border-secondary/30">
            <CardHeader className="bg-secondary/10">
              <CardTitle className="text-lg">🚀 Next Steps to Make Your Blog Viral</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <h4 className="font-bold">Index on Google (IMPORTANT!)</h4>
                    <p className="text-sm text-muted-foreground">Go to <a href="https://search.google.com/search-console" target="_blank" className="text-primary hover:underline">Google Search Console</a></p>
                    <p className="text-sm text-muted-foreground">Click "URL Inspection" → Paste your blog URL → Click "Request Indexing"</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <h4 className="font-bold">Share on Social Media</h4>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <Button
                        size="sm"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(title || '')}`, '_blank')}
                        className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Twitter
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`, '_blank')}
                        className="bg-[#0A66C2] hover:bg-[#0A66C2]/90"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        LinkedIn
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`, '_blank')}
                        className="bg-[#1877F2] hover:bg-[#1877F2]/90"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Facebook
                      </Button>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <h4 className="font-bold">Submit to Search Engines</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                      <li>• <a href="https://www.bing.com/webmasters/url-submission" target="_blank" className="text-primary hover:underline">Bing Webmaster Tools</a></li>
                      <li>• <a href="https://search.google.com/search-console" target="_blank" className="text-primary hover:underline">Google Search Console</a></li>
                    </ul>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <h4 className="font-bold">Share in Communities</h4>
                    <p className="text-sm text-muted-foreground">Post in relevant Reddit, Facebook Groups, LinkedIn Groups, Forums</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</span>
                  <div>
                    <h4 className="font-bold">Monitor Performance</h4>
                    <p className="text-sm text-muted-foreground">Check views in admin panel, track rankings in Search Console</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-primary/20">
            <h3 className="font-bold text-lg mb-3">💡 Pro Tips for Maximum Reach</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Share your blog multiple times over the next week</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Engage with comments and questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Link to this post from your other blog posts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Update content after 1 month with fresh information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Build backlinks by guest posting</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
