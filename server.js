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
  if(lid == rid){
    return res.json({message:"books can not swap"});
  }

  const BOOK_UPDATE = "UPDATE bookscollection SET collectionId=(?) WHERE id=(?)";
  connection.query(BOOK_UPDATE,[lid,rbookid],(err, result) => {
    if (err) {
      return res.send(err);
    } else {
       connection.query(BOOK_UPDATE, [rid, lbookid], (err, result) => {
         if (err) {
           return res.send(err);
         } else {
           res.json({message: "swapped"});
         }
       });
    }
  })
});

app.get("/getUserdetailsByID/:userId",(req,res)=>{
  const userId= req.params.userId;
  connection.query("select * from users where id=?",[userId],(err,result)=>{
    if(err){
     return res.send(err);
    }else{
return res.json({message: result});
    }

  })
});

app.post("/BookTransaction",(req,res)=>{
  const lid = req.body.lid;
  const rid = req.body.rid;
  const lbookid = req.body.lbookid;
  const rbookid = req.body.rbookid;
  const status = req.body.transactionStatus;
  if (lid == rid) {
    return res.json({ message: "Books can not swap" });
  }
  const BookTransactionOn =
    "INSERT into booktransaction(lid,rid,lbookid,rlookid,transactionStatus) values(?,?,?,?,?)";
    try{
    connection.query(BookTransactionOn,[lid,rid,lbookid,rbookid,status],(err,result)=>{
      
      if(err){
        console.log(err);
        return res.json({message: err.code});
      }else{
        return res.json({message: "Requested"});
      }
      
    })
  }catch(err){
     return res.json({message : err});
  }
});

app.post("/updateBookTransaction/:transactionId",(req,res)=>{
  const transactionId = req.params.transactionId;
  const status = req.body.status;
  const BOOK_UPDATE =
    "UPDATE bookTransaction SET status=(?) WHERE transactionId=(?)";
  connection.query(BOOK_UPDATE, [status, transactionId], (err, result) => {
    if (err) {
      return res.send(err);
    } else {
          res.json({ message: "updated" });
    }
  });
});

app.get("/getNotification/:userId",(req,res)=>{
    const userid = req.params.userId;
    connection.query("select b.*,u.* from bookTransaction as b join users as u on u.id=b.rid where b.lid=(?) and transactionStatus != 2",[userid],(err,result)=>{
      if(err){
        return res.json({message: "Error getting notification"});
      }else{
        return res.json({message: result});
      }
    });
});

app.get("/getUserByRid/:Rid",(req,res)=>{
  const rId = req.params.rid;
  connection.query("Select r.*,u.* from booktransaction as r join users as u on u.id=r.rid where r.rid=(?)",[rId],(err,result)=>{
    if(err){
      return res.json({message: err.code});
    }else{
      return res.json({message: result});
    }
  })
});

app.get("/getUserAndBookdetailsByID/:transactionId", (req, res) => {
  try {
    if (req.params.transactionId == null) {
      return res.json({ message: "empty value in get user by id" });
    }
    connection.query(
      "Select r.*,u.*,b.* from booktransaction as r join users as u on u.id = r.rid join bookscollection as b on b.id=r.lbookid where r.transactionId = ?",
      [req.params.transactionId],
      (err, result) => {
        if (err) {
          return res.json({ message: "error getting user" + err });
        } else {
          return res.json({ message: result });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

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

app.get("/Product/:userId", async(req, res) => {
  if(req.params.userId == null){
    connection.query(Q_SELECT_ALL_PRODUCT_QUERY, (err, result) => {
      if (err) {
        return res.json({ message: err });
      } else {
        return res.json({ message: result });
      }
    });
  }else{
    connection.query("SELECT * FROM `bookscollection` where collectionId != (?)",[req.params.userId], (err, result) => {
      if (err) {
        return res.json({ message: err });
      } else {
        return res.json({ message: result });
      }
    });
  }
});

app.post("/updateRequestNotification/:transactionId", async(req,res)=>{
  try {
    if(req.params.transactionId == null || req.params.transactionId == undefined){
      return res.json({message: "empty value in field"});
    }
    console.log(req.params.transactionId);
    connection.query(
      "Update booktransaction set transactionStatus=2 where transactionId=?",
      [req.params.transactionId],
      (err, result) => {
        if (err) {
          return res.json({ message: "error getting user" + err });
        } else {
          connection.query("insert into transaction(TransactionId,lid,rid) select transactionId,lid,rid from booktransaction where transactionId=?",
          [req.params.transactionId],
          async(err,result)=>{
            if(err){
              return res.send(err);
            }
              const [row] = await conn.execute(
                "select * from bookTransaction where transactionId=? ",
                [req.params.transactionId]
              );
              console.log(row);
             const lid = row[0].lid;
             const rid = row[0].rid;
             const lbookid = row[0].lbookid;
             const rbookid = row[0].rbookid;
             if (lid == rid) {
               return res.json({ message: "books can not swap" });
             }

             const BOOK_UPDATE =
               "UPDATE bookscollection SET collectionId=(?) WHERE id=(?)";
             connection.query(BOOK_UPDATE, [lid, rbookid], (err, result) => {
               if (err) {
                 return res.send(err);
               } else {
                 connection.query(
                   BOOK_UPDATE,
                   [rid, lbookid],
                   (err, result) => {
                     if (err) {
                       return res.send(err);
                     } else {
                       res.json({ message: "swapped" });
                     }
                   }
                 );
               }
             });
          });
        }
      }
    );
  } catch (error) {
    return res.send(error);
  }
});

app.listen(PORT, () => {
  console.log("Product server listening on port :", { PORT });
});
