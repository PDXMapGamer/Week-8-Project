"use server";
import { db } from "@/utils/dbConnection";
export default async function ClassOption(props) {
  const query = await db.query(
    `SELECT class_name FROM classes
        JOIN growth_rates ON classes.id = growth_rates.class_id
        JOIN characters ON growth_rates.character_id = characters.id
        WHERE characters.character_name = $1;`,
    [props.character]
  );
  const classList = await query.rows;
  return (
    <>
      {classList.map((entry) => (
        // class appears to be a key word so can't be used as a parameter
        <option key={entry.class_name} value={entry.class_name}>
          {entry.class_name}
        </option>
      ))}
    </>
  );
}
