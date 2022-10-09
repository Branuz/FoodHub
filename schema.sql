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

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name TEXT,
    recipe_id INTEGER REFERENCES recipes
);