import NavBar from "@/app/components/NavBar";
import { db } from "@/utils/dbConnection";
import character from "../characters/[character]/[class]/page";

export default async function createPosts({ params }) {
  const query = await db.query(`SELECT id, character_name FROM characters;`);
  const characterList = await query.rows;
  //
  async function onSubmit(formValues) {
    "use server";
    const formData = {
      character: formValues.get("character"),
      title: formValues.get("title"),
      content: formValues.get("content"),
    };
    console.log(formData);
    const idQuery = await db.query(`SELECT id FROM users WHERE username = $1`, [params.username]);
    const userID = await idQuery.rows;
    await db.query(`INSERT INTO posts(user_id, character_id, title, content) VALUES($1, $2, $3, $4)`, [
      userID[0].id,
      formData.character,
      formData.title,
      formData.content,
    ]);
  }
  return (
    <>
      <NavBar username={params.username} />
      <form className="flex flex-col gap-4" action={onSubmit}>
        <label htmlFor="character" className="mr-4">
          What character is your post about?
        </label>
        <select name="character" required className="w-20">
          <option value="">--</option>
          {characterList.map((character) => (
            <option key={character.id} value={character.id}>
              {character.character_name}
            </option>
          ))}
        </select>
        <label htmlFor="title" className="mr-4">
          Title:
        </label>
        <input type="text" name="title" required maxLength={32} placeholder="Enter Post Title" />

        <label htmlFor="content" className="mr-4">
          Content:
        </label>
        <textarea name="content" required placeholder="Enter Post Content"></textarea>
        <button className="border-solid border-2 ml-2 hover:bg-gray-500 w-48 text-lg" type="submit">
          Post!
        </button>
      </form>
    </>
  );
}
