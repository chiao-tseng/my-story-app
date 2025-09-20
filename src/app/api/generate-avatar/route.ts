import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();

    if (!description) {
      return NextResponse.json({ error: '缺少描述參數' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API 金鑰未設置' }, { status: 500 });
    }

    // 構建提示詞
    const prompt = `Create a single character pixel art style avatar based on this description: ${description}. 
    The image should be:
    - 8-bit pixel art style
    - Simple and clean design
    - Front-facing portrait of ONE character only
    - 1024x1024 pixels
    - Suitable for a story character avatar
    - No text or words in the image
    - Only show one person, not multiple characters`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    });

    const imageUrl = response.data[0]?.url;

    if (!imageUrl) {
      return NextResponse.json({ error: '圖片生成失敗' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      imageUrl: imageUrl,
      description: description 
    });

  } catch (error) {
    console.error('OpenAI API 錯誤:', error);
    return NextResponse.json({ 
      error: '圖片生成服務暫時不可用' 
    }, { status: 500 });
  }
}
