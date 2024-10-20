import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import { db } from "@/utils/dbConnection";
import { Fragment } from "react";

export default async function viewPosts({ params }) {
  const query = await db.query(
    `SELECT title, posts.id FROM posts 
        JOIN users ON posts.user_id = users.id
        WHERE username = $1`,
    [params.username]
  );
  const queryRows = await query.rows;

  return (
    <>
      <NavBar username={params.username} />
      <h1>Here are a list of your posts: </h1>
      <div className="grid grid-cols-2">
        {queryRows.map((post) => (
          <Fragment key={post.id}>
            <h2>{post.title}</h2>
            <form
              action={async () => {
                "use server";
                await db.query(`DELETE FROM posts WHERE ID = $1`, [post.id]);
                revalidatePath(`/${params.username}/homepage/view-posts`);
                redirect(`/${params.username}/homepage/view-posts`);
              }}
            >
              <button type="submit">Delete Post</button>
            </form>
          </Fragment>
        ))}
      </div>
    </>
  );
}
