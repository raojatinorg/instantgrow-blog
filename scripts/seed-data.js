/**
 * Script to seed sample blog posts
 * 
 * Usage:
 * 1. Ensure serviceAccountKey.json exists in project root
 * 2. Run: node scripts/seed-data.js
 */

const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const samplePosts = [
  {
    slug: "grow-business-with-websites",
    title: {
      en: "How to Grow Your Business with Websites",
      hi: "वेबसाइटों के साथ अपने व्यवसाय को कैसे बढ़ाएं",
      es: "Cómo hacer crecer su negocio con sitios web"
    },
    excerpt: {
      en: "Discover proven strategies to expand your business using a professional website and digital presence.",
      hi: "एक पेशेवर वेबसाइट और डिजिटल उपस्थिति का उपयोग करके अपने व्यवसाय का विस्तार करने के लिए सिद्ध रणनीतियों की खोज करें।",
      es: "Descubra estrategias probadas para expandir su negocio utilizando un sitio web profesional."
    },
    content: {
      en: "<h2>Introduction</h2><p>In today's digital age, having a professional website is crucial for business growth. A well-designed website serves as your 24/7 salesperson, reaching customers worldwide.</p><h2>Key Benefits</h2><ul><li>Increased visibility and reach</li><li>Build credibility and trust</li><li>Generate leads automatically</li><li>Showcase your products/services</li></ul><h2>Getting Started</h2><p>Start by defining your goals, understanding your audience, and creating compelling content that resonates with your target market.</p>",
      hi: "<h2>परिचय</h2><p>आज के डिजिटल युग में, व्यवसाय वृद्धि के लिए एक पेशेवर वेबसाइट होना महत्वपूर्ण है।</p>",
      es: "<h2>Introducción</h2><p>En la era digital actual, tener un sitio web profesional es crucial para el crecimiento empresarial.</p>"
    },
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    category: "Business Growth",
    tags: ["business", "websites", "growth", "digital marketing"],
    author: {
      name: "Admin",
      avatar: "https://ui-avatars.com/api/?name=Admin&size=150",
      bio: "Digital marketing and web development expert"
    },
    seo: {
      metaTitle: {
        en: "How to Grow Your Business with Websites | Expert Guide",
        hi: "वेबसाइटों के साथ अपने व्यवसाय को कैसे बढ़ाएं | विशेषज्ञ गाइड",
        es: "Cómo hacer crecer su negocio con sitios web | Guía experta"
      },
      metaDescription: {
        en: "Learn proven strategies to grow your business exponentially using professional websites and digital marketing.",
        hi: "पेशेवर वेबसाइटों और डिजिटल मार्केटिंग का उपयोग करके अपने व्यवसाय को तेजी से बढ़ाने के लिए सिद्ध रणनीतियां सीखें।",
        es: "Aprenda estrategias probadas para hacer crecer su negocio exponencialmente."
      },
      ogImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
      keywords: ["business growth", "websites", "digital presence", "online business", "web development"]
    },
    published: true,
    featured: true,
    readTime: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    slug: "seo-strategies-2024",
    title: {
      en: "Top SEO Strategies for 2024",
      hi: "2024 के लिए शीर्ष SEO रणनीतियाँ",
      es: "Principales estrategias de SEO para 2024"
    },
    excerpt: {
      en: "Master the latest SEO techniques to rank higher in search engines and drive organic traffic to your website.",
      hi: "खोज इंजनों में उच्च रैंक करने और अपनी वेबसाइट पर ऑर्गेनिक ट्रैफ़िक लाने के लिए नवीनतम SEO तकनीकों में महारत हासिल करें।",
      es: "Domine las últimas técnicas de SEO para clasificar más alto en los motores de búsqueda."
    },
    content: {
      en: "<h2>Why SEO Matters</h2><p>Search Engine Optimization is the foundation of digital marketing success. Without proper SEO, your website remains invisible to potential customers.</p><h2>Core Strategies</h2><ul><li>Keyword research and optimization</li><li>Quality content creation</li><li>Technical SEO improvements</li><li>Link building</li><li>Mobile optimization</li></ul><h2>Implementation Tips</h2><p>Start with on-page optimization, ensure your site is mobile-friendly, and focus on creating valuable content that answers user queries.</p>",
      hi: "<h2>SEO क्यों महत्वपूर्ण है</h2><p>सर्च इंजन ऑप्टिमाइजेशन डिजिटल मार्केटिंग सफलता की नींव है।</p>",
      es: "<h2>Por qué importa el SEO</h2><p>La optimización de motores de búsqueda es la base del éxito del marketing digital.</p>"
    },
    coverImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200&h=600&fit=crop",
    category: "SEO",
    tags: ["seo", "search engine", "optimization", "ranking", "traffic"],
    author: {
      name: "Admin",
      avatar: "https://ui-avatars.com/api/?name=Admin&size=150",
      bio: "SEO specialist with 10+ years of experience"
    },
    seo: {
      metaTitle: {
        en: "Top SEO Strategies for 2024 | Complete Guide",
        hi: "2024 के लिए शीर्ष SEO रणनीतियाँ | पूर्ण गाइड",
        es: "Principales estrategias de SEO para 2024 | Guía completa"
      },
      metaDescription: {
        en: "Discover the most effective SEO strategies for 2024. Learn how to rank higher and drive more organic traffic.",
        hi: "2024 के लिए सबसे प्रभावी SEO रणनीतियों की खोज करें।",
        es: "Descubra las estrategias de SEO más efectivas para 2024."
      },
      ogImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200&h=630&fit=crop",
      keywords: ["seo strategies", "search optimization", "ranking", "organic traffic", "seo 2024"]
    },
    published: true,
    featured: true,
    readTime: 6,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    slug: "building-brand-online",
    title: {
      en: "Building a Strong Brand Online",
      hi: "ऑनलाइन एक मजबूत ब्रांड बनाना",
      es: "Construyendo una marca fuerte en línea"
    },
    excerpt: {
      en: "Learn how to create a memorable brand identity that resonates with your audience and stands out in the digital space.",
      hi: "एक यादगार ब्रांड पहचान बनाना सीखें जो आपके दर्शकों के साथ प्रतिध्वनित होती है।",
      es: "Aprenda a crear una identidad de marca memorable que resuene con su audiencia."
    },
    content: {
      en: "<h2>Brand Identity Essentials</h2><p>Your brand is more than just a logo. It's the complete experience customers have with your business online and offline.</p><h2>Key Elements</h2><ul><li>Consistent visual identity</li><li>Clear brand messaging</li><li>Authentic voice and tone</li><li>Customer experience focus</li></ul><h2>Building Your Brand</h2><p>Start by defining your brand values, understanding your target audience, and creating consistent touchpoints across all digital channels.</p>",
      hi: "<h2>ब्रांड पहचान आवश्यक</h2><p>आपका ब्रांड सिर्फ एक लोगो से अधिक है।</p>",
      es: "<h2>Elementos esenciales de identidad de marca</h2><p>Su marca es más que solo un logotipo.</p>"
    },
    coverImage: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&h=600&fit=crop",
    category: "Brand Building",
    tags: ["branding", "brand identity", "marketing", "business"],
    author: {
      name: "Admin",
      avatar: "https://ui-avatars.com/api/?name=Admin&size=150",
      bio: "Brand strategist and digital marketing consultant"
    },
    seo: {
      metaTitle: {
        en: "Building a Strong Brand Online | Brand Strategy Guide",
        hi: "ऑनलाइन एक मजबूत ब्रांड बनाना | ब्रांड रणनीति गाइड",
        es: "Construyendo una marca fuerte en línea | Guía de estrategia"
      },
      metaDescription: {
        en: "Complete guide to building a strong brand identity online. Learn branding strategies that work.",
        hi: "ऑनलाइन एक मजबूत ब्रांड पहचान बनाने के लिए पूर्ण गाइड।",
        es: "Guía completa para construir una identidad de marca fuerte en línea."
      },
      ogImage: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&h=630&fit=crop",
      keywords: ["brand building", "brand identity", "branding strategy", "online branding", "digital brand"]
    },
    published: true,
    featured: false,
    readTime: 5,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

async function seedData() {
  try {
    console.log('🌱 Starting to seed data...');
    
    for (const post of samplePosts) {
      await db.collection('posts').add(post);
      console.log(`✅ Created post: ${post.title.en}`);
    }
    
    console.log('🎉 Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
