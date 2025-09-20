'use client';

import { useState } from 'react';

interface AvatarGeneratorProps {
  description: string;
  onImageGenerated?: (imageUrl: string) => void;
}

export default function AvatarGenerator({ description, onImageGenerated }: AvatarGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateAvatar = async () => {
    if (!description.trim()) {
      setError('請先填寫形象描述');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        onImageGenerated?.(data.imageUrl);
      } else {
        setError(data.error || '圖片生成失敗');
      }
    } catch (err) {
      setError('網路錯誤，請稍後再試');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 生成按鈕 */}
      <button
        onClick={generateAvatar}
        disabled={isGenerating || !description.trim()}
        className="magazine-button-accent w-full py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? '生成中...' : '🎨 生成角色臨摹圖'}
      </button>

      {/* 錯誤訊息 */}
      {error && (
        <div className="text-red-600 text-sm text-center p-3 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}

      {/* 生成的圖片 */}
      {generatedImage && (
        <div className="text-center">
          <img
            src={generatedImage}
            alt="生成的角色臨摹圖"
            className="mx-auto rounded-lg border-2 border-gray-300 max-w-full h-auto"
            style={{ maxWidth: '256px', maxHeight: '256px' }}
          />
          <p className="magazine-caption mt-2 text-gray-600">
            基於描述生成的角色臨摹圖
          </p>
        </div>
      )}

      {/* 提示文字 */}
      {!generatedImage && !isGenerating && (
        <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded">
          <p className="magazine-caption text-gray-600">
            點擊按鈕使用 AI 生成角色臨摹圖
          </p>
        </div>
      )}
    </div>
  );
}
