# 感情壞蛋記錄簿 - 直接部署指南（無需 GitHub）

## 🎯 最簡單的部署方式

### 方法一：拖拽部署（推薦）

1. **前往 Netlify**：
   - 打開 [netlify.com](https://netlify.com)
   - 點擊 "Add new site" → "Deploy manually"

2. **拖拽檔案**：
   - 直接將整個 `.next` 資料夾拖拽到部署區域
   - 或者將 `.next` 資料夾壓縮成 ZIP 後拖拽

3. **等待部署**：
   - Netlify 會自動處理部署
   - 完成後會給你一個 `https://隨機名稱.netlify.app` 的網址

### 方法二：使用 Netlify CLI

1. **安裝 CLI**：
   ```bash
   npm install -g netlify-cli
   ```

2. **登入並部署**：
   ```bash
   netlify login
   netlify deploy --prod --dir=.next
   ```

## ⚙️ 部署後設定

### 1. 設定環境變數

在 Netlify 後台的 **Site settings** → **Environment variables** 中新增：

```
ADMIN_PASSWORD=你的強密碼
NEXT_PUBLIC_BASE_URL=https://你的網站名稱.netlify.app
```

### 2. 重新部署

設定環境變數後，點擊 **Deploys** → **Trigger deploy** → **Deploy site**

## 🔧 重要提醒

### 環境變數設定
- `ADMIN_PASSWORD`: 管理員登入密碼（請設定強密碼）
- `NEXT_PUBLIC_BASE_URL`: 你的完整網站網址

### 功能測試
部署完成後請測試：
- ✅ 首頁載入
- ✅ 投稿功能
- ✅ 故事列表
- ✅ 管理後台登入

## 🎊 完成！

你的「感情壞蛋記錄簿」現在已經上線了！

### 網站特色：
- 🎨 雜誌風格的現代化設計
- 📝 故事投稿和審核系統
- 👨‍💼 管理員後台
- 📞 聯繫和檢舉功能
- 🎭 像素頭像生成器

---

**不需要 GitHub，直接部署就是這麼簡單！** 🚀
