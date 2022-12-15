// grab our client with destructuring from the export in index.js
const { client, getAllUsers, createUser } = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error in dropTables: ", error);
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY, 
      username varchar(255) UNIQUE NOT NULL, 
      password varchar(255) NOT NULL
    );
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error in createTables: ", error);
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");
    const albert = await createUser({
      username: "albert",
      password: "bertie99",
    });
    const sandra = await createUser({
      username: "sandra",
      password: "2sandy4me",
    });
    const glamgal = await createUser({
      username: "glamgal",
      password: "bsoglam",
    });
    console.log(albert);
    console.log(albertTwo);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error createInitialUsers!", error);
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error(error);
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");
    // connect the client to the database
    // client.connect();

    // queries are promises, so we can await them
    // const { rows } = await client.query(`SELECT * FROM users;`);
    const users = await getAllUsers();

    console.log("getAllUsers:", users);
    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!", error);
    // it's important to close out the client connection
  } finally {
    client.end();
  }
}

// testDB();

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
