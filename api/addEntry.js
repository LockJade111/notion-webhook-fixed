import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.DATABASE_ID;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, role = "Lockling", type = "语录", status = "启用" } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content } }] },
        Role: { select: { name: role } },
        Type: { select: { name: type } },
        Status: { select: { name: status } },
      },
    });

    res.status(200).json({ message: "✅ 写入成功", id: response.id });
  } catch (error) {
    console.error("❌ 写入失败:", error);
    res.status(500).json({ error: "Notion API 写入失败", detail: error.body || error.message });
  }
}
