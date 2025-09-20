import { NextRequest } from "next/server";

// 簡單的記憶體速率限制器
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitOptions {
  windowMs: number; // 時間窗口（毫秒）
  maxRequests: number; // 最大請求數
}

export function rateLimit(options: RateLimitOptions) {
  return (req: NextRequest) => {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const now = Date.now();

    // 清理過期的記錄
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }

    // 取得或建立 IP 記錄
    const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + options.windowMs };
    
    // 如果記錄已過期，重置計數
    if (record.resetTime < now) {
      record.count = 0;
      record.resetTime = now + options.windowMs;
    }

    // 增加計數
    record.count++;
    rateLimitMap.set(ip, record);

    // 檢查是否超過限制
    if (record.count > options.maxRequests) {
      return {
        success: false,
        limit: options.maxRequests,
        remaining: 0,
        resetTime: record.resetTime,
      };
    }

    return {
      success: true,
      limit: options.maxRequests,
      remaining: options.maxRequests - record.count,
      resetTime: record.resetTime,
    };
  };
}

// 預設的速率限制配置
export const defaultRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  maxRequests: 5, // 最多 5 次請求
});

// 更嚴格的速率限制（用於投稿）- 暫時放寬用於測試
export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 分鐘
  maxRequests: 10, // 最多 10 次請求
});
