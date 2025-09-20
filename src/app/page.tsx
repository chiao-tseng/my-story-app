import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-8 py-20">
      {/* 雜誌風格主標題區 */}
      <div className="text-center mb-20">
        <div className="magazine-caption mb-4">VOL. 01 / {new Date().getFullYear()}</div>
        <h1 className="magazine-title mb-6">感情壞蛋記錄簿</h1>
        <p className="magazine-subtitle max-w-2xl mx-auto leading-relaxed">
          匿名分享、彼此保護
        </p>
      </div>

      {/* 雜誌風格內容區 */}
      <div className="grid lg:grid-cols-2 gap-16 mb-20">
        {/* 左側：主要內容 */}
        <div className="space-y-8">
          <div>
            <h2 className="magazine-heading mb-4">關於我們</h2>
            <p className="magazine-body leading-relaxed">
              我們提供一個匿名分享的場域，讓每個人用文字記錄壞蛋事蹟，期望像詐騙案例一樣能拿到警示愛情小白兔的作用。
              公開頁面只顯示匿名化內容；投稿者的姓名與聯絡方式僅供平台方保存與必要聯繫，不會公開。
            </p>
          </div>

          <div className="magazine-card p-8">
            <h3 className="magazine-heading mb-6">投稿規範</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="magazine-body">
                  請勿填寫真實姓名、學校、公司、社群帳號等可識別資訊。
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="magazine-body">
                  不得張貼未經證實之犯罪指控或人身攻擊；內容由投稿者自負法律責任。
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="magazine-body">
                  平台保留下架或調整內容之權利，並提供檢舉與覆核機制。
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* 右側：行動呼籲 */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="text-center">
            <h3 className="magazine-heading mb-4">開始你的故事</h3>
            <p className="magazine-body text-gray-600 mb-8">
              分享你的經歷，幫助他人避免相同的傷害
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/submit"
              className="magazine-button-accent block text-center py-4 text-lg"
            >
              我要投稿
            </Link>
            <Link
              href="/stories"
              className="magazine-button block text-center py-4 text-lg"
            >
              閱讀故事
            </Link>
          </div>

          {/* 裝飾性元素 */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>匿名分享</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>彼此保護</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>共同成長</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部裝飾線 */}
      <div className="border-t border-black pt-8">
        <div className="text-center">
          <p className="magazine-caption">STORY COLLECTION</p>
        </div>
      </div>
    </main>
  );
}
