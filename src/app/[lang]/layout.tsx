import { SUPPORTED_LANGUAGES } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({
    lang: lang.code,
  }));
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer lang={params.lang} />
    </>
  );
}
