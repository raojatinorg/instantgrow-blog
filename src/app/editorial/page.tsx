export default function EditorialPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Editorial Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2>Our Standards</h2>
        <p>We are committed to providing accurate, helpful, and unbiased content to our readers.</p>
        <h2>Content Creation</h2>
        <p>All content is created based on research, experience, and industry best practices.</p>
      </div>
    </div>
  );
}
