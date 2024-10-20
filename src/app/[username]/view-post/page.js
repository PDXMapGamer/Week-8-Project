import NavBar from "@/app/components/NavBar";
import postStyles from "./posts.module.css";
import { db } from "@/utils/dbConnection";
import { Fragment } from "react";
import Link from "next/link";

export default async function viewPosts({ params }) {
  //
  const query = await db.query(`SELECT posts.id, title, character_name, username FROM posts
                          JOIN users ON posts.user_id = users.id
                          JOIN characters ON posts.character_id = characters.id;`);
  const posts = await query.rows;

  return (
    <>
      <NavBar username={params.username} />
      <section className={postStyles.outergrid}>
        <h2>Post title</h2>
        <h2>Character</h2>
        <h2>Author</h2>
        {posts.map((post) => (
          <Fragment key={post.id}>
            <Link href={`/${params.username}/view-post/${post.id}`}>{post.title}</Link>
            <Link href={`/${params.username}/view-post/${post.id}`}>{post.character_name}</Link>
            <Link href={`/${params.username}/view-post/${post.id}`}>{post.username}</Link>
          </Fragment>
        ))}
      </section>
    </>
  );
}
