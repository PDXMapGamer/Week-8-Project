//! Testing connecting to supabase, All sql queries and seeded data is done on supabase and log of sql queries in queries.sql.
//! Testing failed, will not connect no matter what.
import { db } from "./dbConnection.js";

const w = db.query(`INSERT INTO users(username) VALUES('Test');`);
