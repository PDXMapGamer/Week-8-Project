import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Home() {
  //
  async function onSubmit(formValues) {
    "use server";
    const formData = formValues.get("username");
    console.log(formData);
    try {
      let inDB = false;
      const query = await db.query(`SELECT username FROM users`);
      query.rows.forEach((entry) => {
        if (entry.username == formData) {
          inDB = true;
        }
      });
      if (!inDB) {
        db.query(`INSERT INTO users(username) VALUES($1)`, [formData]);
      }
    } catch (error) {
      console.error("Error sending username to database", error);
    }
    revalidatePath(`/${formData}/homepage`);
    redirect(`/${formData}/homepage`);
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="flex flex-col h-1/2 w-1/2" action={onSubmit}>
        <label className="text-3xl" htmlFor="username">
          Username:
        </label>
        <input
          className="h-1/4 text-4xl mb-10"
          type="text"
          name="username"
          required
          maxLength={20}
          placeholder="Enter your username"
        />
        <button className="text-3xl border-solid border-4 hover:bg-gray-500" type="submit">
          Log in.
        </button>
      </form>
    </div>
  );
}
{
  /*className="flex flex-col justify-center items-center m-auto"*/
}
