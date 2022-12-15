const { Client } = require("pg");

const client = new Client("postgres://localhost:5432/juicebox");

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username
    FROM users;
    `
  );
  // console.log("rows: ", rows);
  return rows;
}

async function createUser({ username, password }) {
  try {
    const { rows } = await client.query(
      `
    INSERT INTO users(username, password) 
    VALUES ($1, $2) 
    ON CONFLICT (username) DO NOTHING 
    RETURNING *; 
    `,
      [username, password]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  getAllUsers,
  createUser,
};

//In general, in our db/index.js file we should provide the utility functions that the rest of our application will use. We will call them from the seed file, but also from our main application file.
