export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">服務條款</h1>
      
      <div className="prose prose-gray max-w-none">
        <h2>1. 服務說明</h2>
        <p>本平台提供匿名故事分享服務，讓用戶能夠分享個人經歷並與他人交流。</p>

        <h2>2. 用戶責任</h2>
        <ul>
          <li>用戶應確保所分享內容的真實性，不得故意散播虛假資訊</li>
          <li>不得分享涉及他人隱私的內容</li>
          <li>不得進行人身攻擊或惡意中傷</li>
          <li>不得分享違法或有害內容</li>
        </ul>

        <h2>3. 內容管理</h2>
        <p>平台保留審核、編輯或刪除任何內容的權利，以維護平台品質和用戶安全。</p>

        <h2>4. 免責聲明</h2>
        <p>平台不對用戶分享的內容承擔責任，用戶應自行承擔分享內容的法律責任。</p>

        <h2>5. 服務變更</h2>
        <p>平台保留隨時修改或終止服務的權利，恕不另行通知。</p>

        <p className="text-sm text-gray-500 mt-8">
          最後更新：{new Date().toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}
