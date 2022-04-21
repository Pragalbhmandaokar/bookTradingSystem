const connection = require("../dbConnection").promise();

exports.tradeBook = async (req, res) => {
  connection.getConnection(function (err) {
    if (err) {
      return res.send("Error occured");
    }
  });

  if (req.body.userToId === undefined) {
    return res.send("Error Occured");
  }
  console.log(req.body.userFromId);
  try {
    const [row] = await connection.execute(
      "INSERT INTO booktransaction(`userFromId`,`userToId`,`BTransStatus`) Values(?,?,?)",
      [req.body.userFromId, req.body.userToId, req.body.BtransStatus]
    );
    try {
      res.json({
        message: "Trade successful",
        status: req.body.BtransStatus,
      });
    } catch (err) {
      console.log("email error :" + err);
      res.json({ message: "Registration Error " + err });
      return;
    }
  } catch (err) {
    console.log("email error :" + err);
    res.json({ message: "Registration Error" + err });
    return;
  }
};

exports.updateTradeStatus = async (req, res) => {
  const UpdateStatus = req.body.updateStatus;
  const ReadById = req.body.readById;

  connection.getConnection(function (err) {
    if (err) {
      return res.send("connection error :" + err);
    }
  });
  try {
    const [row] = await connection.execute(
      "SELECT * FROM `booktransaction` where readById=?",
      [ReadById]
    );
    if (row.length > 0) {
      connection.query(
        "UPDATE `booktransaction` SET `BTransStatus`=? WHERE `readById`=?",
        [UpdateStatus, ReadById],
        (err) => {
          if (err) {
            res.json({ message: err });
          }
        }
      );

      res.json({ message: "updated status" });
    } else {
      res.json({ message: "Book transaction not found" });
    }
  } catch (e) {
    res.json({ message: "update status error : " + e });
  }
};

exports.tradeUpdate = async (req, res) => {
  connection.getConnection(function (err) {
    if (err) {
      return res.send("Error occured in trade");
    }
  });
};

exports.bookSwap = async (req, res) => {
  connection.getConnection(function (err) {
    if (err) {
      return res.json({ message: "Connection Error occured" });
    }
  });

  if (req.body.userId) {
    return req.json({ message: "field(s) is empty" });
  }

  try {
    const [row] = await connection.execute(
      "Insert into bookReadBy('') values()"
    );
  } catch (error) {
    res.json({ message: "Swap done" });
  }
};
