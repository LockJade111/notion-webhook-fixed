const { Client } = require('@notionhq/client');

// 初始化 Notion 客户端
const notion = new Client({
  auth: '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'
});

// 目标页面 ID（从链接中提取）
const pageId = '1f753c11920180129ef3e35f2e1e41cc';

(async () => {
  try {
    // 向页面添加一个段落 block
    const response = await notion.blocks.children.append({
      block_id: pageId,
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '测试 Notion 接入成功'
                }
              }
            ]
          }
        }
      ]
    });

    console.log('✅ 添加成功！返回数据:', response);
  } catch (error) {
    console.error('❌ 添加失败:', error.body || error);
  }
})();
