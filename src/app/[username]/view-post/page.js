import NavBar from "@/app/components/NavBar";
import postStyles from "./posts.module.css";
import { db } from "@/utils/dbConnection";
import { Fragment } from "react";
import Link from "next/link";

export default async function viewPosts({ params, searchParams }) {
  let posts;
  if (searchParams.sort === "desc") {
    const query = await db.query(`SELECT posts.id, title, character_name, username FROM posts
  JOIN users ON posts.user_id = users.id
  JOIN characters ON posts.character_id = characters.id
  ORDER BY posts.id DESC;`);
    posts = await query.rows;
  } else {
    const query = await db.query(`SELECT posts.id, title, character_name, username FROM posts
  JOIN users ON posts.user_id = users.id
  JOIN characters ON posts.character_id = characters.id;`);
    posts = await query.rows;
  }
  return (
    <>
      <NavBar username={params.username} />
      <Link className="mr-4 hover:underline hover:text-gray-500" href={`/${params.username}/view-post?sort=asc`}>
        ORDER ASC
      </Link>
      <Link className="mr-4 hover:underline hover:text-gray-500" href={`/${params.username}/view-post?sort=desc`}>
        ORDER DESC
      </Link>
      <section className={postStyles.outergrid}>
        <div>
          <h2>Post title</h2>
        </div>
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
