const connection = require('../dbConnection'); 

exports.userSelectAll = async(req,res)=>{
    connection.getConnection(function(err) {
        if (err) {
            return res.json({message : "Error occured"});
        }
    });
   
    try {
        connection.query("SELECT id, username FROM `users`", (err, result) => {
            if (err) {
                return res.json({message: err});
            } else {
                return res.json({message: result});
            }
        });
    } catch (err) {
        console.log("email error  :" + err);
        res.json({ message: "Registration Error" + err });
        return;
    }
}

exports.usersBookSelectByID = async(req,res) =>{
    connection.getConnection(function(err){
        if(err){
            return res.json({message: "connecton err"});
        }
    });

    try {
        console.log(req.params.userId);
        connection.query(
          "SELECt * from `bookscollection` where collectionId=?",
          [req.params.userId],
          (err, result) => {
            if (err) {
              return res.json({ message: "Fetch : " + err });
            } else {
              return res.json({ message: result });
            }
          }
        );
    } catch (error) {
        res.json({message: "error fetch book by id"});
    }
}