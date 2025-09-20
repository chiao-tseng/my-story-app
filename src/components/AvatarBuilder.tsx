"use client";
import { useState, useEffect } from "react";
import PixelAvatar from "./PixelAvatar";

interface AvatarBuilderProps {
  onDescriptionChange: (description: string) => void;
  initialDescription?: string;
}

// 選項配置
const avatarOptions = {
  skin: [
    { value: "light", label: "淺色皮膚", keywords: ["白", "淺"] },
    { value: "pale", label: "蒼白皮膚", keywords: ["蒼白"] },
    { value: "medium", label: "中等皮膚", keywords: ["黃", "中等"] },
    { value: "tan", label: "小麥色皮膚", keywords: ["小麥", "古銅"] },
    { value: "olive", label: "橄欖色皮膚", keywords: ["橄欖"] },
    { value: "brown", label: "棕色皮膚", keywords: ["棕", "咖啡"] },
    { value: "dark", label: "深色皮膚", keywords: ["黑", "深色"] },
    { value: "ebony", label: "深棕色皮膚", keywords: ["深棕"] }
  ],
  hair: [
    { value: "black", label: "黑髮", keywords: ["黑"] },
    { value: "brown", label: "棕髮", keywords: ["棕", "咖啡"] },
    { value: "blonde", label: "金髮", keywords: ["金", "黃"] },
    { value: "red", label: "紅髮", keywords: ["紅"] },
    { value: "white", label: "白髮", keywords: ["白", "銀"] },
    { value: "blue", label: "藍髮", keywords: ["藍"] },
    { value: "pink", label: "粉髮", keywords: ["粉"] },
    { value: "purple", label: "紫髮", keywords: ["紫"] },
    { value: "green", label: "綠髮", keywords: ["綠"] },
    { value: "gray", label: "灰髮", keywords: ["灰"] }
  ],
  eyes: [
    { value: "brown", label: "棕眼", keywords: ["棕眼"] },
    { value: "blue", label: "藍眼", keywords: ["藍眼"] },
    { value: "green", label: "綠眼", keywords: ["綠眼"] },
    { value: "black", label: "黑眼", keywords: ["黑眼"] },
    { value: "hazel", label: "淡棕眼", keywords: ["淡棕眼"] },
    { value: "gray", label: "灰眼", keywords: ["灰眼"] },
    { value: "amber", label: "琥珀眼", keywords: ["琥珀", "金眼"] }
  ],
  clothes: [
    { value: "red", label: "紅色衣服", keywords: ["紅", "紅色"] },
    { value: "blue", label: "藍色衣服", keywords: ["藍", "藍色"] },
    { value: "green", label: "綠色衣服", keywords: ["綠", "綠色"] },
    { value: "yellow", label: "黃色衣服", keywords: ["黃", "黃色"] },
    { value: "purple", label: "紫色衣服", keywords: ["紫", "紫色"] },
    { value: "orange", label: "橙色衣服", keywords: ["橙", "橘", "橙色"] },
    { value: "pink", label: "粉色衣服", keywords: ["粉", "粉色"] },
    { value: "black", label: "黑色衣服", keywords: ["黑", "黑色"] },
    { value: "white", label: "白色衣服", keywords: ["白", "白色"] },
    { value: "gray", label: "灰色衣服", keywords: ["灰", "灰色"] },
    { value: "navy", label: "海軍藍衣服", keywords: ["海軍", "深藍"] },
    { value: "maroon", label: "栗色衣服", keywords: ["栗", "深紅"] },
    { value: "teal", label: "青綠色衣服", keywords: ["青綠", "藍綠"] },
    { value: "coral", label: "珊瑚色衣服", keywords: ["珊瑚"] },
    { value: "lavender", label: "薰衣草色衣服", keywords: ["薰衣草", "淡紫"] }
  ],
  accessories: [
    { value: "none", label: "無配件", keywords: [] },
    { value: "glasses", label: "戴眼鏡", keywords: ["眼鏡"] },
    { value: "hat", label: "戴帽子", keywords: ["帽子"] },
    { value: "earrings", label: "戴耳環", keywords: ["耳環"] }
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
    if (skinOption) parts.push(skinOption.label);
    
    // 髮色
    const hairOption = avatarOptions.hair.find(opt => opt.value === selections.hair);
    if (hairOption) parts.push(hairOption.label);
    
    // 眼睛
    const eyesOption = avatarOptions.eyes.find(opt => opt.value === selections.eyes);
    if (eyesOption) parts.push(eyesOption.label);
    
    // 衣服
    const clothesOption = avatarOptions.clothes.find(opt => opt.value === selections.clothes);
    if (clothesOption) parts.push(clothesOption.label);
    
    // 配件
    if (selections.accessories !== "none") {
      const accessoriesOption = avatarOptions.accessories.find(opt => opt.value === selections.accessories);
      if (accessoriesOption) parts.push(accessoriesOption.label);
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
      <div>
        <h3 className="magazine-heading mb-4">角色預覽</h3>
        <div className="text-center mb-6">
          <PixelAvatar description={generateDescription(selections)} size={120} />
          <p className="magazine-body mt-4 text-gray-600">
            {generateDescription(selections)}
          </p>
        </div>
      </div>

      {/* 選擇器 */}
      <div className="space-y-4">
        <div>
          <label className="magazine-body font-semibold mb-2 block">1. 膚色</label>
          <select
            value={selections.skin}
            onChange={(e) => handleSelectionChange("skin", e.target.value)}
            className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body"
          >
            {avatarOptions.skin.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="magazine-body font-semibold mb-2 block">2. 髮色</label>
          <select
            value={selections.hair}
            onChange={(e) => handleSelectionChange("hair", e.target.value)}
            className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body"
          >
            {avatarOptions.hair.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="magazine-body font-semibold mb-2 block">3. 眼睛</label>
          <select
            value={selections.eyes}
            onChange={(e) => handleSelectionChange("eyes", e.target.value)}
            className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body"
          >
            {avatarOptions.eyes.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="magazine-body font-semibold mb-2 block">4. 服飾</label>
          <select
            value={selections.clothes}
            onChange={(e) => handleSelectionChange("clothes", e.target.value)}
            className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body"
          >
            {avatarOptions.clothes.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="magazine-body font-semibold mb-2 block">5. 配件</label>
          <select
            value={selections.accessories}
            onChange={(e) => handleSelectionChange("accessories", e.target.value)}
            className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-red-600 transition-colors magazine-body"
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
