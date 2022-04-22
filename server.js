// import lib
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const Path = require("path");
const app = express();
const router = require("./router");

const conn = require("./dbConnection").promise();

const Q_SELECT_USERNAME = "SELECT * FROM users WHERE username=?";
const Q_INSERT_NEWITEM =
  "Insert into item(productName,Author,requirement,) Values(?,?,?)";
const Q_SELECT_ALL_PRODUCT_QUERY = "SELECT * FROM `bookscollection`";

const PORT = process.env.PORT || 4000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login",
});

connection.connect((err) => {
  if (err) {
    return err;
  }
});

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV == "production") {
  app.use(express.static("/build"));
  app.get("*", (req, res) => {
    res.sendFile(Path.resolve(__dirname, "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Server is online");
});

app.use(router);
app.post("/registration", async (req, res) => {
  const password = req.body.password;
  const Email = req.body.username;

  if (Email && password) {
    const [row] = await conn.execute(
      "SELECT * FROM `users` WHERE `username`=?",
      [req.body.username]
    );
    if (row.length > 0) {
      return res.json({
        message: "The E-mail already in use",
      });
    } else {
      const INSER_USERNAME = "INSERT INTO users(password,username) VALUES(?,?)";
      connection.query(INSER_USERNAME, [password, Email], (err, result) => {
        if (err) {
          return res.send(err);
        } else {
          return res.send("Succesfully added");
        }
      });
    }
  } else {
    res.send("Required All the fields");
  }
});

app.post("/trade",(req,res) => {
  const lid = req.body.lid;
  const rid = req.body.rid;
  const lbookid = req.body.lbookid;
  const rbookid = req.body.rbookid;
  const BOOK_UPDATE = "UPDATE bookscollection SET collectionId=(?) WHERE id=(?)";
  connection.query(BOOK_UPDATE,[lid,rbookid],(err, result) => {
    if (err) {
      return result.send(err);
    } else {
    }
  })
  connection.query(BOOK_UPDATE,[rid,lbookid],(err, result) => {
    if (err) {
      return result.send(err);
    } else {
    }
  })
})

app.get("/uploadItem", (req, res) => {
  const ProductImage = req.body.Image;
  const ProductName = req.body.productName;

  const Author = req.body.author;
  const requirement = req.body.requirement;
  connection.query(
    Q_INSERT_NEWITEM,
    [ProductImage, ProductName, Author, requirement],
    (err, result) => {
      if (err) {
        return res.send({ Error: err });
      } else {
        return res.send("Successfully Added");
      }
    }
  );
});

app.get("/Product", (req, res) => {
  connection.query(Q_SELECT_ALL_PRODUCT_QUERY, (err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      return res.json({ message: result });
    }
  });
});

app.listen(PORT, () => {
  console.log("Product server listening on port :", { PORT });
});
