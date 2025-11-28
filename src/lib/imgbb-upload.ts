const IMGBB_API_KEY = 'f31247f51f07c7e6fdf325abaed8e58c';

export async function uploadToImgBB(file: File): Promise<string> {
  try {
    if (!file) throw new Error('No file provided');
    if (file.size > 32 * 1024 * 1024) throw new Error('File too large (max 32MB)');

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'ImgBB upload failed');
    }

    const data = await response.json();
    
    if (data.success && data.data && data.data.url) {
      return data.data.url;
    }

    throw new Error('Invalid ImgBB response');
  } catch (error: any) {
    console.error('ImgBB upload error:', error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
}
