import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted">
      <div className="text-center">
        <h1 className="text-6xl font-playfair font-bold mb-4 text-foreground">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/en">
          <Button size="lg" className="bg-primary hover:bg-primary/90">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
