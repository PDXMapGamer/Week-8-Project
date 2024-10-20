import NavBar from "@/app/components/NavBar";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function postComment({ params }) {
  const titleQuery = await db.query(`SELECT title FROM posts WHERE id=$1;`, [params.id]);
  const title = await titleQuery.rows;
  async function onSubmit(formValues) {
    "use server";
    const formData = formValues.get("comment");
    const idQuery = await db.query(`SELECT id FROM users WHERE username = $1`, [params.username]);
    const userID = await idQuery.rows;
    await db.query(`INSERT INTO comments(user_id, post_id, comment) Values($1, $2, $3);`, [
      userID[0].id,
      params.id,
      formData,
    ]);
    revalidatePath(`/${params.username}/view-post/${params.id}`);
    redirect(`/${params.username}/view-post/${params.id}`);
  }
  return (
    <>
      <NavBar username={params.username} />
      <h1>Posting comment on {title[0].title}</h1>
      <form action={onSubmit}>
        <label htmlFor="comment">Comment:</label>
        <br />
        <textarea name="comment" placeholder="Enter your comment here" required></textarea>
        <br />
        <button className="border-solid border-2 ml-2 hover:bg-gray-500 w-48 text-lg" type="submit">
          Add comment.
        </button>
      </form>
    </>
  );
}
