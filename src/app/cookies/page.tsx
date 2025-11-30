export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit our website.</p>
        <h2>How We Use Cookies</h2>
        <p>We use cookies to improve your browsing experience and analyze website traffic.</p>
      </div>
    </div>
  );
}
