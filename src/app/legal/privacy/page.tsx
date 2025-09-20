export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">隱私政策</h1>
      
      <div className="prose prose-gray max-w-none">
        <h2>1. 資料收集</h2>
        <p>我們收集以下類型的資料：</p>
        <ul>
          <li>您主動提供的聯絡資訊（用於必要聯繫，不會公開）</li>
          <li>您分享的故事內容（經過匿名化處理）</li>
          <li>基本的使用統計資料</li>
        </ul>

        <h2>2. 資料使用</h2>
        <p>我們使用收集的資料用於：</p>
        <ul>
          <li>提供平台服務</li>
          <li>內容審核和管理</li>
          <li>改善用戶體驗</li>
          <li>必要時與用戶聯繫</li>
        </ul>

        <h2>3. 資料保護</h2>
        <p>我們採取適當措施保護您的個人資料，包括：</p>
        <ul>
          <li>資料加密傳輸</li>
          <li>限制資料存取權限</li>
          <li>定期安全檢查</li>
        </ul>

        <h2>4. 資料分享</h2>
        <p>我們不會將您的個人資料分享給第三方，除非：</p>
        <ul>
          <li>法律要求</li>
          <li>保護平台和用戶安全</li>
          <li>獲得您的明確同意</li>
        </ul>

        <h2>5. 您的權利</h2>
        <p>您有權：</p>
        <ul>
          <li>查看我們持有的您的資料</li>
          <li>要求更正或刪除您的資料</li>
          <li>撤回同意</li>
        </ul>

        <p className="text-sm text-gray-500 mt-8">
          最後更新：{new Date().toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}
