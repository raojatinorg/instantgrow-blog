'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        status: 'new',
        createdAt: new Date().toISOString(),
      });
      
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-playfair font-bold mb-4 text-center text-foreground">Contact Us</h1>
      <p className="text-center text-muted-foreground mb-12 text-lg">Have a project in mind? Let's build something amazing together!</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="border shadow-lg h-full">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {submitted && (
                <div className="mb-6 p-4 bg-secondary/10 border border-secondary rounded-lg text-secondary">
                  ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rao Jatin"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90" disabled={loading}>
                  {loading ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border shadow-lg">
            <CardHeader className="bg-secondary text-secondary-foreground">
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:info.raojatin@gmail.com" className="text-muted-foreground hover:text-primary">
                    info.raojatin@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    Rewari, Haryana 123401<br />
                    India
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-lg">
            <CardHeader className="bg-muted">
              <CardTitle>Why Work With Us?</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Professional website development tailored to your business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>SEO-optimized solutions for maximum visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Fast turnaround time with quality assurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Ongoing support and maintenance</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
