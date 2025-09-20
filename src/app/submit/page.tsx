'use client';

import { useState } from 'react';
import AvatarBuilder from '@/components/AvatarBuilder';
import AvatarGenerator from '@/components/AvatarGenerator';

interface StoryForm {
  persona: string;
  content: string;
  authorName: string;
  authorContact: string;
}

export default function SubmitPage() {
  const [formData, setFormData] = useState<StoryForm>({
    persona: '',
    content: '',
    authorName: '',
    authorContact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePersonaChange = (description: string) => {
    setFormData(prev => ({
      ...prev,
      persona: description
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("已送出！等待審核。通過後會公開在「故事」頁面。");
        window.location.href = "/stories"; // 送出後直接看列表
      } else {
        alert("提交失敗，請檢查欄位內容");
      }
    } catch (error) {
      console.error('提交失敗:', error);
      alert("提交失敗，請檢查欄位內容");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-8 py-16">
      {/* 雜誌風格頁面標題 */}
      <div className="text-center mb-16">
        <div className="magazine-caption mb-4">SHARE YOUR STORY</div>
        <h1 className="magazine-title mb-6">分享你的故事</h1>
                <p className="magazine-body text-gray-600 max-w-2xl mx-auto">
                  讓我們用文字發洩但不攻擊，情緒就留在這裡
                </p>
      </div>

      {/* 雜誌風格表單 */}
      <div className="grid lg:grid-cols-2 gap-16">
        {/* 左側：表單 */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 形象描述區塊 */}
            <div>
              <h3 className="magazine-heading mb-4">形象描述 *</h3>
              <textarea
                name="persona"
                value={formData.persona}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body resize-none"
                placeholder="請描述角色的外貌特徵，例如：膚色、髮色、眼睛顏色、服裝、配件等..."
              />
              
              {/* AI 生成臨摹圖 */}
              <div className="magazine-card p-6 mt-6">
                <h4 className="magazine-heading mb-4">AI 角色臨摹圖</h4>
                <AvatarGenerator 
                  description={formData.persona}
                  onImageGenerated={(imageUrl) => {
                    console.log('Generated image:', imageUrl);
                  }}
                />
              </div>
            </div>

            {/* Content 欄位 */}
            <div>
              <label htmlFor="content" className="magazine-heading mb-4 block">
                故事內容 *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={8}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body resize-none"
                placeholder="請分享你的故事..."
              />
            </div>

            {/* 私人資訊區 */}
            <div className="magazine-card p-6">
              <h3 className="magazine-heading mb-6">私人資訊（不公開）</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="authorName" className="magazine-body font-semibold mb-2 block">
                    作者姓名 *
                  </label>
                  <input
                    type="text"
                    id="authorName"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-red-600 transition-colors magazine-body"
                    placeholder="你的姓名..."
                  />
                </div>

                <div>
                  <label htmlFor="authorContact" className="magazine-body font-semibold mb-2 block">
                    聯絡方式 *
                  </label>
                  <input
                    type="text"
                    id="authorContact"
                    name="authorContact"
                    value={formData.authorContact}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-red-600 transition-colors magazine-body"
                    placeholder="Email 或電話..."
                  />
                </div>
              </div>
            </div>

            {/* 提交按鈕 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="magazine-button-accent w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '提交中...' : '提交故事'}
            </button>
          </form>
        </div>

        {/* 右側：投稿須知 */}
        <div className="space-y-8">
          <div className="magazine-card p-6">
            <h4 className="magazine-heading mb-4">投稿須知</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="magazine-body text-sm">
                  所有欄位皆為必填，請確保資訊完整
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="magazine-body text-sm">
                  投稿後將進入審核流程，通過後才會公開
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="magazine-body text-sm">
                  私人資訊僅供平台聯繫使用，不會公開
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
