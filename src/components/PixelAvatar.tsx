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
    light: "#FDBCB4",
    medium: "#E8A87C", 
    dark: "#8B4513",
    pale: "#F5DEB3"
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
    black: "#2C1810",
    hazel: "#DAA520"
  },
  mouth: {
    smile: "smile",
    neutral: "neutral", 
    frown: "frown",
    open: "open"
  },
  clothes: {
    casual: "#FF6B6B",
    formal: "#2C3E50",
    sporty: "#3498DB",
    casual2: "#9B59B6",
    formal2: "#34495E"
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
  
  // 皮膚顏色
  let skin = "light";
  if (desc.includes("黑") || desc.includes("深色")) skin = "dark";
  else if (desc.includes("白") || desc.includes("淺")) skin = "pale";
  else if (desc.includes("黃") || desc.includes("小麥")) skin = "medium";
  
  // 頭髮顏色
  let hair = "black";
  if (desc.includes("金") || desc.includes("黃")) hair = "blonde";
  else if (desc.includes("棕") || desc.includes("咖啡")) hair = "brown";
  else if (desc.includes("紅")) hair = "red";
  else if (desc.includes("白") || desc.includes("銀")) hair = "white";
  else if (desc.includes("藍")) hair = "blue";
  else if (desc.includes("粉")) hair = "pink";
  
  // 眼睛顏色
  let eyes = "brown";
  if (desc.includes("藍眼")) eyes = "blue";
  else if (desc.includes("綠眼")) eyes = "green";
  else if (desc.includes("黑眼")) eyes = "black";
  else if (desc.includes("棕眼")) eyes = "hazel";
  
  // 表情
  let mouth = "neutral";
  if (desc.includes("笑") || desc.includes("開心")) mouth = "smile";
  else if (desc.includes("皺眉") || desc.includes("不開心")) mouth = "frown";
  else if (desc.includes("張嘴") || desc.includes("驚訝")) mouth = "open";
  
  // 服裝
  let clothes = "casual";
  if (desc.includes("西裝") || desc.includes("正式")) clothes = "formal";
  else if (desc.includes("運動") || desc.includes("球衣")) clothes = "sporty";
  else if (desc.includes("休閒")) clothes = "casual2";
  
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
  ctx.fillStyle = avatarElements.clothes[config.clothes as keyof typeof avatarElements.clothes];
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
