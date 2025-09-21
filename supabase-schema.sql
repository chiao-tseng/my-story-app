-- 創建故事表
CREATE TABLE IF NOT EXISTS stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  persona TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('published', 'pending', 'rejected', 'withdrawn')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  generated_image_url TEXT
);

-- 創建私人資訊表
CREATE TABLE IF NOT EXISTS story_private (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  author_name TEXT,
  author_contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引以提高查詢效能
CREATE INDEX IF NOT EXISTS idx_stories_status ON stories(status);
CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at);
CREATE INDEX IF NOT EXISTS idx_story_private_story_id ON story_private(story_id);

-- 啟用 Row Level Security (RLS)
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_private ENABLE ROW LEVEL SECURITY;

-- 創建政策：任何人都可以讀取已發布的故事
CREATE POLICY "Anyone can read published stories" ON stories
  FOR SELECT USING (status = 'published');

-- 創建政策：任何人都可以插入新故事
CREATE POLICY "Anyone can insert stories" ON stories
  FOR INSERT WITH CHECK (true);

-- 創建政策：任何人都可以插入私人資訊
CREATE POLICY "Anyone can insert private info" ON story_private
  FOR INSERT WITH CHECK (true);

-- 創建政策：任何人都可以讀取私人資訊（用於管理員功能）
CREATE POLICY "Anyone can read private info" ON story_private
  FOR SELECT USING (true);

-- 創建政策：任何人都可以更新故事狀態（用於管理員功能）
CREATE POLICY "Anyone can update story status" ON stories
  FOR UPDATE USING (true);

-- 創建聯繫請求表
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID REFERENCES stories(id) ON DELETE SET NULL,
  requester_contact TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_contact_requests_story_id ON contact_requests(story_id);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON contact_requests(created_at);

-- 啟用 RLS
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- 創建政策：任何人都可以插入聯繫請求
CREATE POLICY "Anyone can insert contact requests" ON contact_requests
  FOR INSERT WITH CHECK (true);

-- 創建政策：任何人都可以讀取聯繫請求（用於管理員功能）
CREATE POLICY "Anyone can read contact requests" ON contact_requests
  FOR SELECT USING (true);

-- 創建政策：任何人都可以更新聯繫請求狀態（用於管理員功能）
CREATE POLICY "Anyone can update contact request status" ON contact_requests
  FOR UPDATE USING (true);
