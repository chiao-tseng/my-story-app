"use client";
import { useState, useEffect } from "react";
import PixelAvatar from "./PixelAvatar";

interface AvatarBuilderProps {
  onDescriptionChange: (description: string) => void;
  initialDescription?: string;
}

// 選項配置 - 只保留視覺差異明顯的選項
const avatarOptions = {
  skin: [
    { value: "light", label: "淺色", keywords: ["白", "淺"] },
    { value: "medium", label: "中等", keywords: ["黃", "中等"] },
    { value: "tan", label: "小麥色", keywords: ["小麥", "古銅"] },
    { value: "brown", label: "棕色", keywords: ["棕", "咖啡"] },
    { value: "dark", label: "深色", keywords: ["黑", "深色"] }
  ],
  hair: [
    { value: "black", label: "黑色", keywords: ["黑"] },
    { value: "brown", label: "棕色", keywords: ["棕", "咖啡"] },
    { value: "blonde", label: "金色", keywords: ["金", "黃"] },
    { value: "red", label: "紅色", keywords: ["紅"] },
    { value: "white", label: "白色", keywords: ["白", "銀"] },
    { value: "blue", label: "藍色", keywords: ["藍"] },
    { value: "pink", label: "粉色", keywords: ["粉"] }
  ],
  eyes: [
    { value: "brown", label: "棕色", keywords: ["棕眼"] },
    { value: "blue", label: "藍色", keywords: ["藍眼"] },
    { value: "green", label: "綠色", keywords: ["綠眼"] },
    { value: "black", label: "黑色", keywords: ["黑眼"] }
  ],
  clothes: [
    { value: "red", label: "紅色", keywords: ["紅", "紅色"] },
    { value: "blue", label: "藍色", keywords: ["藍", "藍色"] },
    { value: "green", label: "綠色", keywords: ["綠", "綠色"] },
    { value: "yellow", label: "黃色", keywords: ["黃", "黃色"] },
    { value: "purple", label: "紫色", keywords: ["紫", "紫色"] },
    { value: "orange", label: "橙色", keywords: ["橙", "橘", "橙色"] },
    { value: "pink", label: "粉色", keywords: ["粉", "粉色"] },
    { value: "black", label: "黑色", keywords: ["黑", "黑色"] },
    { value: "white", label: "白色", keywords: ["白", "白色"] }
  ],
  accessories: [
    { value: "none", label: "無", keywords: [] },
    { value: "glasses", label: "眼鏡", keywords: ["眼鏡"] },
    { value: "hat", label: "帽子", keywords: ["帽子"] },
    { value: "earrings", label: "耳環", keywords: ["耳環"] }
  ]
};

export default function AvatarBuilder({ onDescriptionChange, initialDescription = "" }: AvatarBuilderProps) {
  const [selections, setSelections] = useState({
    skin: "light",
    hair: "black", 
    eyes: "brown",
    clothes: "blue",
    accessories: "none"
  });

  // 從初始描述解析選擇
  useEffect(() => {
    if (initialDescription) {
      const desc = initialDescription.toLowerCase();
      const newSelections = { ...selections };
      
      // 解析膚色
      for (const option of avatarOptions.skin) {
        if (option.keywords.some(keyword => desc.includes(keyword))) {
          newSelections.skin = option.value;
          break;
        }
      }
      
      // 解析髮色
      for (const option of avatarOptions.hair) {
        if (option.keywords.some(keyword => desc.includes(keyword))) {
          newSelections.hair = option.value;
          break;
        }
      }
      
      // 解析眼睛
      for (const option of avatarOptions.eyes) {
        if (option.keywords.some(keyword => desc.includes(keyword))) {
          newSelections.eyes = option.value;
          break;
        }
      }
      
      // 解析衣服
      for (const option of avatarOptions.clothes) {
        if (option.keywords.some(keyword => desc.includes(keyword))) {
          newSelections.clothes = option.value;
          break;
        }
      }
      
      // 解析配件
      for (const option of avatarOptions.accessories) {
        if (option.keywords.some(keyword => desc.includes(keyword))) {
          newSelections.accessories = option.value;
          break;
        }
      }
      
      setSelections(newSelections);
    }
  }, [initialDescription]);

  // 生成描述文字
  const generateDescription = (selections: typeof selections) => {
    const parts = [];
    
    // 膚色
    const skinOption = avatarOptions.skin.find(opt => opt.value === selections.skin);
    if (skinOption) parts.push(`${skinOption.label}皮膚`);
    
    // 髮色
    const hairOption = avatarOptions.hair.find(opt => opt.value === selections.hair);
    if (hairOption) parts.push(`${hairOption.label}髮`);
    
    // 眼睛
    const eyesOption = avatarOptions.eyes.find(opt => opt.value === selections.eyes);
    if (eyesOption) parts.push(`${eyesOption.label}眼`);
    
    // 衣服
    const clothesOption = avatarOptions.clothes.find(opt => opt.value === selections.clothes);
    if (clothesOption) parts.push(`穿${clothesOption.label}衣服`);
    
    // 配件
    if (selections.accessories !== "none") {
      const accessoriesOption = avatarOptions.accessories.find(opt => opt.value === selections.accessories);
      if (accessoriesOption) parts.push(`戴${accessoriesOption.label}`);
    }
    
    return parts.join("、");
  };

  // 當選擇改變時更新描述
  useEffect(() => {
    const description = generateDescription(selections);
    onDescriptionChange(description);
  }, [selections, onDescriptionChange]);

  const handleSelectionChange = (category: keyof typeof selections, value: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* 角色預覽 */}
      <div className="text-center">
        <PixelAvatar description={generateDescription(selections)} size={120} />
        <p className="magazine-body mt-3 text-gray-600">
          {generateDescription(selections)}
        </p>
      </div>

      {/* 簡潔的選擇器 */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="magazine-caption mb-1 block text-xs">膚色</label>
          <select
            value={selections.skin}
            onChange={(e) => handleSelectionChange("skin", e.target.value)}
            className="w-full px-2 py-1 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body text-xs"
            size={2}
          >
            {avatarOptions.skin.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="magazine-caption mb-1 block text-xs">髮色</label>
          <select
            value={selections.hair}
            onChange={(e) => handleSelectionChange("hair", e.target.value)}
            className="w-full px-2 py-1 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body text-xs"
            size={2}
          >
            {avatarOptions.hair.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="magazine-caption mb-1 block text-xs">眼睛</label>
          <select
            value={selections.eyes}
            onChange={(e) => handleSelectionChange("eyes", e.target.value)}
            className="w-full px-2 py-1 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body text-xs"
            size={2}
          >
            {avatarOptions.eyes.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="magazine-caption mb-1 block text-xs">服飾</label>
          <select
            value={selections.clothes}
            onChange={(e) => handleSelectionChange("clothes", e.target.value)}
            className="w-full px-2 py-1 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body text-xs"
            size={2}
          >
            {avatarOptions.clothes.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="magazine-caption mb-1 block text-xs">配件</label>
          <select
            value={selections.accessories}
            onChange={(e) => handleSelectionChange("accessories", e.target.value)}
            className="w-full px-2 py-1 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body text-xs"
            size={1}
          >
            {avatarOptions.accessories.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
