export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us through contact forms and newsletter subscriptions.</p>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to respond to your inquiries and provide our services.</p>
        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at info.raojatin@gmail.com</p>
      </div>
    </div>
  );
}
