import CharacterList from "@/app/components/CharacterList";
import NavBar from "@/app/components/NavBar";
import { db } from "@/utils/dbConnection";

export default async function characters({ params }) {
  try {
    const query = await db.query(`SELECT characters.id, character_name, class_name FROM characters
                                  JOIN classes ON characters.default_class = classes.id`);
    const characters = query.rows;
    return (
      <>
        <NavBar username={params.username} />
        <section>
          {characters.map(async (character) => (
            <CharacterList
              key={character.id}
              id={character.id}
              character_name={character.character_name}
              default_class={character.class_name}
              username={params.username}
            />
          ))}
        </section>
      </>
    );
  } catch {
    return (
      <>
        <NavBar username={params.username} />
        <h1>Can&apos;t access the database</h1>;
      </>
    );
  }
}
