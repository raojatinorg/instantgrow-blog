export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-lg max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using this website, you accept and agree to be bound by these Terms of Service.</p>
        <h2>Use License</h2>
        <p>Permission is granted to temporarily view the materials on InstantGrow.shop for personal, non-commercial use only.</p>
        <h2>Contact</h2>
        <p>For questions about these Terms, contact us at info.raojatin@gmail.com</p>
      </div>
    </div>
  );
}
