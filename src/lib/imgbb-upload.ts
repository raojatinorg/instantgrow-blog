const IMGBB_API_KEY = 'f31247f51f07c7e6fdf325abaed8e58c';

export async function uploadToImgBB(file: File): Promise<string> {
  try {
    if (!file) throw new Error('No file provided');
    if (file.size > 32 * 1024 * 1024) throw new Error('File too large (max 32MB)');

    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const formData = new FormData();
    formData.append('image', base64);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ImgBB error response:', errorText);
      throw new Error(`Upload failed: ${response.status}`);
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
