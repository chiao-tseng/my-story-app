'use client';

import { useState } from 'react';

export default function SimpleSubmitPage() {
  const [formData, setFormData] = useState({
    persona: '',
    content: '',
    authorName: '',
    authorContact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.persona.trim() || !formData.content.trim() || !formData.authorName.trim() || !formData.authorContact.trim()) {
      setResult('請填寫所有必填欄位');
      return;
    }
    
    setIsSubmitting(true);
    setResult('');

    try {
      console.log('提交資料:', formData);
      
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('回應狀態:', response.status);
      console.log('回應 OK:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('回應資料:', data);
        setResult('✅ 提交成功！故事 ID: ' + data.id);
        // 清空表單
        setFormData({
          persona: '',
          content: '',
          authorName: '',
          authorContact: ''
        });
      } else {
        const errorData = await response.json();
        setResult('❌ 提交失敗: ' + (errorData.error || '未知錯誤'));
      }
    } catch (error) {
      console.error('提交錯誤:', error);
      setResult('❌ 網路錯誤: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>簡化版故事提交</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label>形象描述 *</label><br />
          <textarea
            name="persona"
            value={formData.persona}
            onChange={handleInputChange}
            required
            rows={4}
            style={{ width: '100%', padding: '10px' }}
            placeholder="請描述角色的外貌特徵..."
          />
        </div>

        <div>
          <label>故事內容 *</label><br />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={8}
            style={{ width: '100%', padding: '10px' }}
            placeholder="請分享你的故事..."
          />
        </div>

        <div>
          <label>作者姓名 *</label><br />
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px' }}
            placeholder="你的姓名..."
          />
        </div>

        <div>
          <label>聯絡方式 *</label><br />
          <input
            type="text"
            name="authorContact"
            value={formData.authorContact}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px' }}
            placeholder="Email 或電話..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '15px',
            backgroundColor: isSubmitting ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? '提交中...' : '提交故事'}
        </button>
      </form>

      {result && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: result.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px',
          color: result.includes('✅') ? '#155724' : '#721c24'
        }}>
          {result}
        </div>
      )}
    </div>
  );
}
