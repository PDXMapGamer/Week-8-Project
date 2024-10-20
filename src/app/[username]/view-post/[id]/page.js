import NavBar from "@/app/components/NavBar";
import Link from "next/link";
import { db } from "@/utils/dbConnection";
import postStyle from "./indPost.module.css";

export default async function post({ params }) {
  const query = await db.query(
    `SELECT posts.id, title, character_name, username, content FROM posts
                          JOIN users ON posts.user_id = users.id
                          JOIN characters ON posts.character_id = characters.id
                          WHERE posts.id = $1`,
    [params.id]
  );
  const posts = await query.rows;
  const commentQuery = await db.query(
    `SELECT comments.id, username, comment FROM comments
JOIN users ON comments.user_id = users.id
WHERE post_id = $1;`,
    [params.id]
  );
  const comments = await commentQuery.rows;
  return (
    <>
      <NavBar username={params.username} />
      <Link href={`/${params.username}/view-post`}>Go back</Link>
      <section>
        <h2>
          {posts[0].title} by {posts[0].username}
        </h2>
        <h2>{posts[0].character_name}</h2>
        <h3>{posts[0].content}</h3>
        <Link
          href={`/${params.username}/view-post/${params.id}/post-comment`}
          className="border-solid border-2 ml-2 hover:bg-gray-500"
        >
          Add-comment
        </Link>
        <div id="comments">
          <h2>Comments:</h2>
          {comments.map((comment) => (
            <p key={comment.id}>
              {comment.username} says: {comment.comment}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
