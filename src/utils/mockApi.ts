// utils/mockApi.ts
export type GenerateResponse = {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
};

export async function mockGenerate({
  imageDataUrl,
  prompt,
  style,
  signal,
}: {
  imageDataUrl: string;
  prompt: string;
  style: string;
  signal?: AbortSignal;
}): Promise<GenerateResponse> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      // 20% chance of simulated failure
      if (Math.random() < 0.2) {
        reject({ message: 'Model overloaded' });
      } else {
        resolve({
          id: crypto.randomUUID(),
          imageUrl: imageDataUrl, // in real app this would be processed
          prompt,
          style,
          createdAt: new Date().toISOString(),
        });
      }
    }, 1500);

    // Handle abort
    signal?.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new DOMException('Request aborted', 'AbortError'));
    });
  });
}
 