# PWA 圖標設定說明

## 需要的圖標檔案

請在 `public/` 目錄下添加以下圖標檔案：

- `icon-192.png` (192x192 像素)
- `icon-512.png` (512x512 像素)

## 圖標設計建議

- 使用與應用主題相關的圖標（如書本、故事等）
- 背景色建議使用主題色 #2563eb
- 確保圖標在深色和淺色背景下都清晰可見
- 圖標應該簡潔明瞭，在小尺寸下也能識別

## 生成圖標的工具

1. 使用線上工具如 [PWA Builder](https://www.pwabuilder.com/imageGenerator)
2. 使用設計軟體如 Figma、Photoshop
3. 使用 AI 圖像生成工具

## 測試 PWA 功能

1. 建置應用：`npm run build`
2. 啟動生產版本：`npm start`
3. 在 Chrome 中打開應用
4. 檢查是否出現安裝提示
5. 測試離線功能

## 注意事項

- 確保 manifest.webmanifest 檔案正確
- 檢查 Service Worker 是否正常註冊
- 測試在不同設備上的安裝體驗
