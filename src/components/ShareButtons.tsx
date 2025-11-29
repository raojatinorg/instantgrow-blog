'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Share2, Copy, Check } from 'lucide-react';

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`,
  };

  return (
    <div className=\"flex flex-wrap gap-2 items-center\">
      <span className=\"text-sm font-semibold flex items-center gap-2\">
        <Share2 className=\"h-4 w-4\" />
        Share:
      </span>
      
      <Button
        size=\"sm\"
        variant=\"outline\"
        onClick={() => window.open(shareLinks.twitter, '_blank')}
        className=\"bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90 border-0\"
      >
        Twitter
      </Button>

      <Button
        size=\"sm\"
        variant=\"outline\"
        onClick={() => window.open(shareLinks.linkedin, '_blank')}
        className=\"bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 border-0\"
      >
        LinkedIn
      </Button>

      <Button
        size=\"sm\"
        variant=\"outline\"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
        className=\"bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-0\"
      >
        Facebook
      </Button>

      <Button
        size=\"sm\"
        variant=\"outline\"
        onClick={() => window.open(shareLinks.whatsapp, '_blank')}
        className=\"bg-[#25D366] text-white hover:bg-[#25D366]/90 border-0\"
      >
        WhatsApp
      </Button>

      <Button
        size=\"sm\"
        variant=\"outline\"
        onClick={copyToClipboard}
      >
        {copied ? <Check className=\"h-4 w-4 mr-1\" /> : <Copy className=\"h-4 w-4 mr-1\" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
    </div>
  );
}
