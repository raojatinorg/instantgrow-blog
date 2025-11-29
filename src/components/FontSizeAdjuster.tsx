'use client';

import { useState, useEffect } from 'react';
import { Type, Plus, Minus } from 'lucide-react';

export default function FontSizeAdjuster() {
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const saved = localStorage.getItem('fontSize');
    if (saved) {
      const size = parseInt(saved);
      setFontSize(size);
      applyFontSize(size);
    }
  }, []);

  const applyFontSize = (size: number) => {
    const article = document.querySelector('article');
    if (article) {
      article.style.fontSize = `${size}%`;
    }
  };

  const increase = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10;
      setFontSize(newSize);
      applyFontSize(newSize);
      localStorage.setItem('fontSize', newSize.toString());
    }
  };

  const decrease = () => {
    if (fontSize > 80) {
      const newSize = fontSize - 10;
      setFontSize(newSize);
      applyFontSize(newSize);
      localStorage.setItem('fontSize', newSize.toString());
    }
  };

  const reset = () => {
    setFontSize(100);
    applyFontSize(100);
    localStorage.setItem('fontSize', '100');
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 bg-background border rounded-lg shadow-lg p-2 space-y-2 z-40">
      <button
        onClick={increase}
        disabled={fontSize >= 150}
        className="block p-2 hover:bg-muted rounded disabled:opacity-50"
        title="Increase font size"
      >
        <Plus className="h-5 w-5" />
      </button>
      
      <button
        onClick={reset}
        className="block p-2 hover:bg-muted rounded"
        title="Reset font size"
      >
        <Type className="h-5 w-5" />
      </button>
      
      <button
        onClick={decrease}
        disabled={fontSize <= 80}
        className="block p-2 hover:bg-muted rounded disabled:opacity-50"
        title="Decrease font size"
      >
        <Minus className="h-5 w-5" />
      </button>
      
      <div className="text-xs text-center text-muted-foreground pt-2 border-t">
        {fontSize}%
      </div>
    </div>
  );
}
