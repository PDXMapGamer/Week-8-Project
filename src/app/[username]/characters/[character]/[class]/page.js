import NavBar from "@/app/components/NavBar";
import { db } from "@/utils/dbConnection";
import gridStyles from "./gridStyles.module.css";
import ClassOption from "@/app/components/ClassOption";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function character({ params }) {
  try {
    //
    async function onUpdate(formValues) {
      "use server";
      const formData = formValues.get("class");
      revalidatePath(`/${params.username}/characters/${params.character}/${formData}`);
      redirect(`/${params.username}/characters/${params.character}/${formData}`);
    }
    const charQuery = await db.query(`SELECT * FROM characters WHERE character_name = $1`, [params.character]);
    const character = await charQuery.rows;
    const classQuery = await db.query(
      `SELECT * FROM growth_rates
    JOIN classes ON growth_rates.class_id = classes.id
    WHERE character_id = $1 AND classes.class_name = $2;`,
      [character[0].id, params.class]
    );
    const growths = classQuery.rows;
    return (
      <>
        <NavBar username={params.username} />
        <section className={gridStyles.outerGrid}>
          <h1>{character[0].character_name}</h1>
          <h2>Base stats: </h2>
          <div className={gridStyles.baseStatsGrid}>
            {/* Table headers */}
            <p>lvl</p>
            <p>hp</p>
            <p>str</p>
            <p>mag</p>
            <p>skl</p>
            <p>spd</p>
            <p>lck</p>
            <p>def</p>
            <p>res</p>
            <p>mv</p>
            {/* table content */}
            <p>{character[0].level}</p>
            <p>{character[0].hp}</p>
            <p>{character[0].strength}</p>
            <p>{character[0].magic}</p>
            <p>{character[0].skill}</p>
            <p>{character[0].speed}</p>
            <p>{character[0].luck}</p>
            <p>{character[0].defence}</p>
            <p>{character[0].resistance}</p>
            <p>{character[0].movement}</p>
          </div>
          <form action={onUpdate}>
            <select name="class">
              {/* Tried to use onChange like last week but there were too many problems with it not letting me use onChange in server or Async on client so I decided to use a submit button instead */}
              <ClassOption character={params.character} />
            </select>
            <button className="border-solid border-2 ml-2 hover:bg-gray-500" type="submit">
              Update Growth Rates
            </button>
          </form>
          <h2>{params.class}&apos;s growth rates</h2>
          <div className={gridStyles.growthRateGrid}>
            {/* table header */}
            <p>hp</p>
            <p>str</p>
            <p>mag</p>
            <p>skl</p>
            <p>spd</p>
            <p>lck</p>
            <p>def</p>
            <p>res</p>
            {/* table content */}
            <p>{growths[0].hp}</p>
            <p>{growths[0].strength}</p>
            <p>{growths[0].magic}</p>
            <p>{growths[0].skill}</p>
            <p>{growths[0].speed}</p>
            <p>{growths[0].luck}</p>
            <p>{growths[0].defence}</p>
            <p>{growths[0].resistance}</p>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error accessing database", error);
    return (
      <>
        <NavBar username={params.username} />
        <h1>Error Accessing database</h1>
      </>
    );
  }
}
