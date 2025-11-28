import { BlogPost } from '@/types';
import Image from 'next/image';
import { Clock, Calendar, User } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [];
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: { slug: string; lang: string } }) {
  notFound();


