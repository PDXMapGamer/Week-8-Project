import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import { db } from "@/utils/dbConnection";
import { Fragment } from "react";

export default async function viewComments({ params }) {
  const query = await db.query(
    `SELECT title, comments.id, comment FROM comments 
        JOIN users ON comments.user_id = users.id
        JOIN posts ON comments.post_id = posts.id
        WHERE username = $1`,
    [params.username]
  );
  const queryRows = await query.rows;

  return (
    <>
      <NavBar username={params.username} />
      <h1>Here are a list of your comments: </h1>
      <div className="grid grid-cols-3">
        {queryRows.map((comment) => (
          <Fragment key={comment.id}>
            <h2>Post title: {comment.title}</h2>
            <h2>Comment: {comment.comment}</h2>
            <form
              action={async () => {
                "use server";
                await db.query(`DELETE FROM comments WHERE ID = $1`, [comment.id]);
                revalidatePath(`/${params.username}/homepage/view-comments`);
                redirect(`/${params.username}/homepage/view-comments`);
              }}
            >
              <button type="submit">Delete Comment</button>
            </form>
          </Fragment>
        ))}
      </div>
    </>
  );
}
