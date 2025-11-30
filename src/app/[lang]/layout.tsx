import NewsletterPopup from '@/components/NewsletterPopup';

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen">{children}</main>
      <NewsletterPopup />
    </>
  );
}
