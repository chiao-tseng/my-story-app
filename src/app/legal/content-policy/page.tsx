export default function ContentPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">內容政策</h1>
      
      <div className="prose prose-gray max-w-none">
        <h2>1. 允許的內容</h2>
        <p>我們歡迎以下類型的內容：</p>
        <ul>
          <li>真實的個人經歷分享</li>
          <li>建設性的討論和交流</li>
          <li>有助於他人學習和成長的內容</li>
          <li>尊重他人隱私的分享</li>
        </ul>

        <h2>2. 禁止的內容</h2>
        <p>以下內容將被移除，嚴重者可能導致帳號封禁：</p>
        <ul>
          <li>虛假或誤導性資訊</li>
          <li>人身攻擊或惡意中傷</li>
          <li>侵犯他人隱私的內容</li>
          <li>暴力、仇恨或歧視性言論</li>
          <li>色情或成人內容</li>
          <li>垃圾訊息或廣告</li>
          <li>違法活動相關內容</li>
        </ul>

        <h2>3. 匿名化原則</h2>
        <p>為保護隱私，我們會自動處理以下資訊：</p>
        <ul>
          <li>電子郵件地址</li>
          <li>電話號碼</li>
          <li>社群媒體帳號</li>
          <li>其他可識別個人身份的資訊</li>
        </ul>

        <h2>4. 檢舉機制</h2>
        <p>如果您發現違反政策的內容，請：</p>
        <ul>
          <li>使用檢舉功能</li>
          <li>提供詳細的檢舉原因</li>
          <li>協助我們維護平台品質</li>
        </ul>

        <h2>5. 執法措施</h2>
        <p>違反內容政策的後果：</p>
        <ul>
          <li>內容被移除</li>
          <li>帳號警告</li>
          <li>暫時或永久封禁</li>
          <li>法律責任追究</li>
        </ul>

        <p className="text-sm text-gray-500 mt-8">
          最後更新：{new Date().toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}
