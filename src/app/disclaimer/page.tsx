export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
      <div className="prose prose-lg max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>Website Disclaimer</h2>
        <p>The information provided by InstantGrow.shop is for general informational purposes only.</p>
        <h2>Professional Disclaimer</h2>
        <p>The content on this website is provided "as is" without any representations or warranties.</p>
      </div>
    </div>
  );
}
