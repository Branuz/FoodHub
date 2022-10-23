CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    token TEXT
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title TEXT UNIQUE,
    description TEXT,
    type TEXT,
    cooking_time INTEGER,
    instructions TEXT,
    date TIMESTAMP
);

CREATE TABLE ingredient (
    id SERIAL PRIMARY KEY,
    ingredient_name TEXT UNIQUE
);

CREATE TABLE ingredients (
    recipe_id INTEGER REFERENCES recipes ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredient ON DELETE CASCADE,
    amount FLOAT,
    measurement_type TEXT
);

