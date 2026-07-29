import html2canvas from 'html2canvas';
import { useRef } from 'react';

/* eslint-disable no-console */
const useHtmlToImage = (code?: string, name?: string) => {
  const captureRef = useRef<HTMLDivElement>(null);

  // 날짜 format
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // 이미지 로드
  const preloadImages = async (images: NodeListOf<HTMLImageElement>) => {
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise<void>((resolve, reject) => {
            if (img.complete) resolve();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
          })
      )
    );
  };

  // html capture
  const handleCapture = async () => {
    try {
      if (!captureRef?.current) return;

      const images = captureRef.current.querySelectorAll('img');

      // CORS 우회를 위한 src 링크 변경
      images.forEach((image) => {
        // 이미지 저장소 경로를 next 서버쪽으로 우회
        if (image.src.startsWith('https://img.test.dev')) {
          image.src = image.src.replace('https://img.test.dev/', '/api/images/');
        }
      });

      await preloadImages(images); // 이미지 로드

      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 1.2,
        imageTimeout: 10000,
      });

      const image = canvas.toDataURL('image/png');

      const formattedDate = formatDate(new Date());

      const fileName = `${formattedDate}${code ? ' ' + code : ''}${name ? ' ' + name : ''}.png`;

      // 이미지 다운로드
      const link = document.createElement('a');
      link.href = image;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Error capturing the element:', error);
    }
  };

  return { captureRef, handleCapture, preloadImages };
};

/* eslint-enable no-console */

export default useHtmlToImage;
