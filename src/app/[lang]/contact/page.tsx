import { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - InstantGrow.shop | Get Professional Web Development Services',
  description: 'Contact Rao Jatin for professional web development, SEO optimization, and digital marketing services. Based in Rewari, Haryana. Email: info.raojatin@gmail.com',
  keywords: 'contact web developer, hire freelancer, web development services, seo services contact, rewari web developer',
  openGraph: {
    title: 'Contact InstantGrow.shop - Professional Web Development',
    description: 'Get in touch for custom website development and SEO services',
    type: 'website',
    url: 'https://instantgrow.shop/en/contact',
  },
  alternates: {
    canonical: 'https://instantgrow.shop/en/contact',
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
