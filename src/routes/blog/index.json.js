import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";

const getAllPosts = () => {
  try {
    return fs.readdirSync("static/posts/").map((fileName) => {
      const post = fs.readFileSync(
        path.resolve("static/posts", fileName),
        "utf-8"
      );
      return {
        slug: fileName.slice(0, -3), // file name without the `.md`
        title: grayMatter(post).data.title || ""
      }
    });
  } catch (e) {
    return [];
  }
};

export function get(_, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  const posts = getAllPosts();
  res.end(JSON.stringify(posts));
}
