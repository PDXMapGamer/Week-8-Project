--! CREATE TABLES
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username TEXT
);

CREATE TABLE IF NOT EXISTS characters(
  id SERIAL PRIMARY KEY,
  character_name TEXT,
  level INT,
  hp INT,
  strength INT,
  magic INT,
  skill INT,
  speed INT,
  luck INT,
  defence INT,
  resistance INT,
  movement INT,
  can_premote BOOLEAN
);

CREATE TABLE IF NOT EXISTS classes(
  id SERIAL PRIMARY KEY,
  class_name VARCHAR(255),
  weapons_used VARCHAR(255) ARRAY,
  is_promoted BOOLEAN
);

CREATE TABLE IF NOT EXISTS growth_rates(
  character_id INT REFERENCES characters(id),
  class_id INT REFERENCES classes(id),
  hp INT,
  strength INT,
  magic INT,
  skill INT,
  speed INT,
  luck INT,
  defence INT,
  resistance INT,
  PRIMARY KEY(character_id, class_id)
);

CREATE TABLE IF NOT EXISTS posts(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
character_id INT REFERENCES characters(id),
title VARCHAR(255),
content TEXT
);

CREATE TABLE IF NOT EXISTS comments(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id),
post_id INT REFERENCES posts(id) ON DELETE CASCADE,
comment TEXT
);

--! ALTER TABLES TO ADD NOT NULL
ALTER TABLE users ALTER COLUMN username SET NOT NULL
ALTER TABLE posts ALTER COLUMN title SET NOT NULL
ALTER TABLE posts ALTER COLUMN content SET NOT NULL
ALTER TABLE comments ALTER COLUMN comment SET NOT NULL

--! TEST CASCADE DELETE
INSERT INTO posts(user_id, character_id, title, content) VALUES (1,1,'TEST POST', 'AAAAAAA');
INSERT INTO users(username) VALUES('Admin');
INSERT INTO characters(character_name, level, hp, strength, magic, skill, speed, luck, defence, resistance, movement, can_premote)
VALUES('Marth', 1, 18, 5, 0, 3, 7, 7,7 ,0, 7, false);
INSERT INTO comments(user_id, post_id, comment) VALUES(1,2,'test1'),
(1,2,'test 2');
DELETE FROM posts WHERE id=2;
--! CASCADE DELETE TEST SUCESSFUL

--! Seed characters
INSERT INTO characters(character_name, level, hp, strength, magic, skill, speed, luck, defence, resistance, movement, can_premote)
VALUES('Abel', 1, 20, 6, 0, 7,7,2,7,0,9, true),
('Cain', 1, 20, 7, 0, 5,6,3,7,0,9, true),
('Caeda', 1, 16, 4, 1, 6, 12, 9, 7, 6, 8, true),
('Gordon', 1, 18, 5, 0, 3, 4, 4, 6, 0, 5, true),
('Jagen', 1, 22, 7, 1, 10, 8, 1, 9, 6, 10, false);

--! Seed classes
INSERT INTO classes(class_name, weapons_used, is_promoted) 
VALUES('Lord', '{Swords}', false),
('Cavalier', '{Swords, Lances}', false);
('Pegasus Knight', '{Lances}', false),
('Archer', '{Bows}', false),
('Myrmidon', '{Swords}', false),
('Mage', '{Magic}', false),
('Cleric', '{Staff}', false),
('Paladin', '{Swords, Lances}', true),
('Dracoknight', '{Lances, Axes}', true),
('Sniper', '{Bows}', true),
('Swordmaster', '{Swords}', true),
('Sage', '{Magic, Staff}', true),
('Bishop', '{Magic, Staff}', true);

--! Seed growth rates
INSERT INTO growth_rates(character_id, class_id, hp, strength, magic, skill, speed, luck, defence, resistance)
--! Abel
VALUES(2, 2, 65, 40, 0, 50, 50, 25, 20, 0),
(2, 4, 65, 35, 0, 45, 70, 25, 15, 0),
(2, 5, 75, 35, 0, 35, 65, 25, 10, 0),
(2, 6, 45, 15, 35, 45, 55, 25, 0, 15),
(2, 7, 45, 10, 15, 40, 60, 25, 0, 30),
(2, 8, 65, 40, 0, 50, 50, 25, 20, 0),
(2, 9, 55, 35, 0, 45, 65, 25, 15, 5),
(2, 10, 65, 35, 0, 45, 70, 25, 15, 0),
(2, 11, 75, 35, 0, 35, 65, 25, 10, 0),
(2, 12, 45, 10, 25, 45, 60, 25, 0, 25),
(2, 13, 45, 10, 25, 45, 60, 25, 0, 25);
--! Cain
VALUES(3, 2, 75, 35, 0, 50, 50, 40, 20, 0),
(3, 4, 75, 30, 0, 45, 70, 40, 15, 0),
(3, 5, 85, 30, 0, 45, 65, 40, 10, 0),
(3, 6, 55, 10, 35, 45, 55, 40, 0, 15),
(3, 7, 55, 5, 15, 40, 60, 40, 0, 30),
(3, 8, 75, 35, 0, 50, 50, 40, 20, 0),
(3, 9, 65, 30, 0, 45, 60, 40, 15, 5),
(3, 10, 75, 30, 0, 45, 70, 40, 15, 0),
(3, 11, 85, 30, 0, 45, 65, 40, 10, 0),
(3, 12, 55, 5, 25, 45, 60, 40, 0, 25),
(3, 13, 55, 5, 25, 45, 60, 40, 0, 25);
--! Caeda
VALUES(4, 3, 40, 20, 0, 60, 85, 70, 10, 0),
(4, 4, 50, 20, 0, 60, 90, 70, 10, 0),
(4, 5, 60, 20, 0, 60, 85, 70, 5, 0),
(4, 6, 30, 0, 35, 60, 75, 70, 0, 10),
(4, 7, 30, 0, 15, 55, 80, 70, 0, 30),
(4, 8, 50, 25, 0, 65, 70, 70, 15, 0),
(4, 9, 50, 20, 0, 60, 85, 70, 10, 0),
(4, 10, 50, 20, 0, 60, 90, 70, 10, 0),
(4, 11, 85, 30, 0, 45, 65, 40, 10, 0),
--! The line above is a mistake that I have manuallly fixed in the Table editor due to fogetting to change the entire line.
(4, 12, 30, 5, 25, 65, 80, 70, 0, 20),
(4, 13, 30, 5, 25, 65, 80, 70, 0, 20);
--! Gordin
VALUES(5, 2, 60, 25, 0, 45, 15, 40, 35, 0),
(5, 4, 60, 20, 0, 40, 35, 40, 30, 0),
(5, 5, 70, 20, 0, 40, 30, 40, 25, 0),
(5, 6, 40, 0, 30, 40, 20, 40, 5, 15),
(5, 7, 40, 0, 10, 35, 25, 40, 10, 35),
(5, 8, 60, 25, 0, 45, 15, 40, 35, 0),
(5, 9, 50, 20, 0, 40, 30, 40, 30, 5),
(5, 10, 60, 20, 0, 40, 35, 40, 30, 0),
(5, 11, 70, 20, 0, 40, 30, 40, 25, 0),
(5, 12, 40, 5, 20, 40, 25, 40, 5, 35),
(5, 13, 40, 5, 20, 40, 25, 40, 5, 35),
--! Jagen
VALUES(6, 8, 40, 20, 0, 35, 15, 30, 20, 0),
(6, 9, 30, 15, 0, 30, 30, 30, 15, 5),
(6, 10, 40, 15, 0, 30, 35, 30, 15, 0),
(6, 11, 50, 15, 0, 30, 30, 30, 10, 0),
(6, 12, 20, 0, 30, 30, 25, 30, 0, 25),
(6, 13, 20, 0, 30, 30, 25, 30, 0, 25);

--! Add default classes 
ALTER TABLE characters ADD default_class INT;
UPDATE characters SET default_class = 1 WHERE id = 1;
UPDATE characters SET default_class = 2 WHERE id = 2;
UPDATE characters SET default_class = 2 WHERE id = 3;
UPDATE characters SET default_class = 3 WHERE id = 4;
UPDATE characters SET default_class = 4 WHERE id = 5;
UPDATE characters SET default_class = 8 WHERE id = 6;