import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { path, type } = body;

    if (type === 'blog') {
      revalidatePath(`/[lang]/blog/${path}`);
      revalidatePath('/[lang]/blog');
      revalidatePath('/[lang]');
    } else if (type === 'all') {
      revalidatePath('/[lang]', 'layout');
    } else {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
