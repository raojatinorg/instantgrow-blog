// Simple translation function using browser API
export async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || targetLang === 'en') return text;
  
  try {
    // Using free translation API
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    return data[0][0][0] || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function translateBlogContent(content: {
  title: string;
  excerpt: string;
  content: string;
}, targetLangs: string[]) {
  const translations: any = {
    title: { en: content.title },
    excerpt: { en: content.excerpt },
    content: { en: content.content },
  };

  for (const lang of targetLangs) {
    if (lang !== 'en') {
      translations.title[lang] = await translateText(content.title, lang);
      translations.excerpt[lang] = await translateText(content.excerpt, lang);
      translations.content[lang] = await translateText(content.content, lang);
    }
  }

  return translations;
}
