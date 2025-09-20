"use client";
import { useState, useEffect } from "react";

interface AvatarConfig {
  skin: string;
  hair: string;
  eyes: string;
  mouth: string;
  clothes: string;
  accessories: string;
}

interface PixelAvatarProps {
  description: string;
  size?: number;
}

// 預設的像素畫素材配置
const avatarElements = {
  skin: {
    light: "#FDBCB4",      // 淺色皮膚
    medium: "#E8A87C",     // 中等皮膚
    dark: "#8B4513",       // 深色皮膚
    tan: "#D2B48C",        // 小麥色皮膚
    brown: "#A0522D"       // 棕色皮膚
  },
  hair: {
    black: "#2C1810",
    brown: "#8B4513",
    blonde: "#DAA520",
    red: "#A0522D",
    white: "#F5F5DC",
    blue: "#4169E1",
    pink: "#FF69B4"
  },
  eyes: {
    brown: "#8B4513",
    blue: "#4169E1",
    green: "#228B22",
    black: "#2C1810"
  },
  mouth: {
    smile: "smile",
    neutral: "neutral", 
    frown: "frown",
    open: "open"
  },
  clothes: {
    red: "#FF6B6B",        // 紅色
    blue: "#3498DB",       // 藍色
    green: "#2ECC71",      // 綠色
    yellow: "#F1C40F",     // 黃色
    purple: "#9B59B6",     // 紫色
    orange: "#E67E22",     // 橙色
    pink: "#E91E63",       // 粉色
    black: "#2C3E50",      // 黑色
    white: "#ECF0F1",      // 白色
    gray: "#95A5A6",       // 灰色
    navy: "#34495E",       // 海軍藍
    maroon: "#8B0000",     // 栗色
    teal: "#16A085",       // 青綠色
    coral: "#FF7F50",      // 珊瑚色
    lavender: "#E6E6FA"    // 薰衣草色
  },
  accessories: {
    none: "none",
    glasses: "glasses",
    hat: "hat",
    earrings: "earrings"
  }
};

// 關鍵詞匹配函數
function parseDescription(description: string): AvatarConfig {
  const desc = description.toLowerCase();
  
  // 皮膚顏色 - 簡化匹配
  let skin = "light";
  if (desc.includes("黑") || desc.includes("深色")) skin = "dark";
  else if (desc.includes("棕") || desc.includes("咖啡")) skin = "brown";
  else if (desc.includes("小麥") || desc.includes("古銅")) skin = "tan";
  else if (desc.includes("黃") || desc.includes("中等")) skin = "medium";
  
  // 頭髮顏色 - 簡化選項
  let hair = "black";
  if (desc.includes("金") || desc.includes("黃")) hair = "blonde";
  else if (desc.includes("棕") || desc.includes("咖啡")) hair = "brown";
  else if (desc.includes("紅")) hair = "red";
  else if (desc.includes("白") || desc.includes("銀")) hair = "white";
  else if (desc.includes("藍")) hair = "blue";
  else if (desc.includes("粉")) hair = "pink";
  
  // 眼睛顏色 - 簡化選項
  let eyes = "brown";
  if (desc.includes("藍眼")) eyes = "blue";
  else if (desc.includes("綠眼")) eyes = "green";
  else if (desc.includes("黑眼")) eyes = "black";
  
  // 表情
  let mouth = "neutral";
  if (desc.includes("笑") || desc.includes("開心")) mouth = "smile";
  else if (desc.includes("皺眉") || desc.includes("不開心")) mouth = "frown";
  else if (desc.includes("張嘴") || desc.includes("驚訝")) mouth = "open";
  
  // 服裝顏色 - 詳細匹配
  let clothes = "blue"; // 預設藍色
  if (desc.includes("紅") || desc.includes("紅色")) clothes = "red";
  else if (desc.includes("藍") || desc.includes("藍色")) clothes = "blue";
  else if (desc.includes("綠") || desc.includes("綠色")) clothes = "green";
  else if (desc.includes("黃") || desc.includes("黃色")) clothes = "yellow";
  else if (desc.includes("紫") || desc.includes("紫色")) clothes = "purple";
  else if (desc.includes("橙") || desc.includes("橘") || desc.includes("橙色")) clothes = "orange";
  else if (desc.includes("粉") || desc.includes("粉色")) clothes = "pink";
  else if (desc.includes("黑") || desc.includes("黑色")) clothes = "black";
  else if (desc.includes("白") || desc.includes("白色")) clothes = "white";
  else if (desc.includes("灰") || desc.includes("灰色")) clothes = "gray";
  else if (desc.includes("海軍") || desc.includes("深藍")) clothes = "navy";
  else if (desc.includes("栗") || desc.includes("深紅")) clothes = "maroon";
  else if (desc.includes("青綠") || desc.includes("藍綠")) clothes = "teal";
  else if (desc.includes("珊瑚")) clothes = "coral";
  else if (desc.includes("薰衣草") || desc.includes("淡紫")) clothes = "lavender";
  
  // 配件
  let accessories = "none";
  if (desc.includes("眼鏡")) accessories = "glasses";
  else if (desc.includes("帽子")) accessories = "hat";
  else if (desc.includes("耳環")) accessories = "earrings";
  
  return { skin, hair, eyes, mouth, clothes, accessories };
}

// 像素畫渲染函數
function renderPixelAvatar(config: AvatarConfig, size: number = 64) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  
  const pixelSize = size / 8; // 8x8 像素畫
  
  // 清空畫布
  ctx.clearRect(0, 0, size, size);
  
  // 繪製皮膚（臉部）
  ctx.fillStyle = avatarElements.skin[config.skin as keyof typeof avatarElements.skin];
  ctx.fillRect(pixelSize * 2, pixelSize * 2, pixelSize * 4, pixelSize * 4);
  
  // 繪製頭髮
  ctx.fillStyle = avatarElements.hair[config.hair as keyof typeof avatarElements.hair];
  ctx.fillRect(pixelSize * 1, pixelSize * 1, pixelSize * 6, pixelSize * 2);
  
  // 繪製眼睛
  ctx.fillStyle = avatarElements.eyes[config.eyes as keyof typeof avatarElements.eyes];
  ctx.fillRect(pixelSize * 2.5, pixelSize * 3, pixelSize * 0.5, pixelSize * 0.5);
  ctx.fillRect(pixelSize * 5, pixelSize * 3, pixelSize * 0.5, pixelSize * 0.5);
  
  // 繪製嘴巴
  ctx.fillStyle = "#8B4513";
  if (config.mouth === "smile") {
    ctx.fillRect(pixelSize * 3, pixelSize * 4.5, pixelSize * 2, pixelSize * 0.5);
  } else if (config.mouth === "frown") {
    ctx.fillRect(pixelSize * 3, pixelSize * 5, pixelSize * 2, pixelSize * 0.5);
  } else if (config.mouth === "open") {
    ctx.fillRect(pixelSize * 3.5, pixelSize * 4.5, pixelSize * 1, pixelSize * 1);
  } else {
    ctx.fillRect(pixelSize * 3, pixelSize * 4.5, pixelSize * 2, pixelSize * 0.3);
  }
  
  // 繪製身體/衣服
  const clothesColor = avatarElements.clothes[config.clothes as keyof typeof avatarElements.clothes];
  ctx.fillStyle = clothesColor;
  ctx.fillRect(pixelSize * 2, pixelSize * 6, pixelSize * 4, pixelSize * 2);
  
  // 繪製配件
  if (config.accessories === "glasses") {
    ctx.strokeStyle = "#2C3E50";
    ctx.lineWidth = 1;
    ctx.strokeRect(pixelSize * 2, pixelSize * 2.8, pixelSize * 1.5, pixelSize * 0.8);
    ctx.strokeRect(pixelSize * 4.5, pixelSize * 2.8, pixelSize * 1.5, pixelSize * 0.8);
    ctx.beginPath();
    ctx.moveTo(pixelSize * 3.5, pixelSize * 3.2);
    ctx.lineTo(pixelSize * 4.5, pixelSize * 3.2);
    ctx.stroke();
  } else if (config.accessories === "hat") {
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(pixelSize * 0.5, pixelSize * 0.5, pixelSize * 7, pixelSize * 1.5);
  } else if (config.accessories === "earrings") {
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(pixelSize * 1.5, pixelSize * 3.5, pixelSize * 0.3, pixelSize * 0.3);
    ctx.fillRect(pixelSize * 6.2, pixelSize * 3.5, pixelSize * 0.3, pixelSize * 0.3);
  }
  
  return canvas.toDataURL();
}

export default function PixelAvatar({ description, size = 64 }: PixelAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  
  useEffect(() => {
    if (description.trim()) {
      const config = parseDescription(description);
      const url = renderPixelAvatar(config, size);
      setAvatarUrl(url);
    }
  }, [description, size]);
  
  if (!avatarUrl) {
    return (
      <div 
        className="bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs"
        style={{ width: size, height: size }}
      >
        生成中...
      </div>
    );
  }
  
  return (
    <div className="inline-block">
      <img 
        src={avatarUrl} 
        alt="像素頭像" 
        className="rounded-lg border-2 border-gray-300"
        style={{ width: size, height: size, imageRendering: 'pixelated' }}
      />
    </div>
  );
}
