import api from '@/lib/api';

interface UploadResponse {
  uploadUrl: string;
  originalName: string;
  key: string;
}

export async function uploadFiles(files: File[], tenantId: string): Promise<string[]> {
  try {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    const { data } = await api.post<UploadResponse[]>(`/uploads/${tenantId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const uploadPromises = data.map(async (response, index) => {
      const { uploadUrl, key } = response;
      const file = files[index];

      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      return key;
    });

    return Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading files:', error);
    throw new Error('Failed to upload files');
  }
}
