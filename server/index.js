require("dotenv").config();
const { PORT, CONNECTION_STRING } = process.env;
const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");

const app = express();

app.use(express.json());
app.use(cors());
// app.set

// console.log(process.env);
const sequelize = new Sequelize(
  "postgres://rsulpfzhpvjqim:de099dd8be42f5059ced96c84baf68bfdd8516bb3539cf523ce6efc95a2e097b@ec2-44-198-204-136.compute-1.amazonaws.com:5432/dffc4fk29hmn7c",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

//Routes
// app.get;
app.post("/api/register", async (req, res) => {
  //console.log(req)
  const { email, password } = req.body;
  //req.body.email

  //Check if email already exists
  const user = await sequelize.query(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  // IF email exists, return error to user,
  if (user[0].length > 0) {
    return res.status(400).send("Email already exists");
  } else {
    //Make a query to our database
    return (
      sequelize
        .query(
          `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`
        )
        //console.log(result) - the result of the query
        .then((result) => res.send(result[0]).status(200))
    );
  }
});
app.post("/api/login", (req, res) => {
  //console.log(req)
  const { email, password } = req.body;

  //make a query to our database
  // INSERT INTO users (email, password) VALUES (`${email}`, `${password}`)
});
// app.put;
// app.delete;
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
