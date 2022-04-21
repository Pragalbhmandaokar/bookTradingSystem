const connection = require('../dbConnection').promise();   

exports.AddBook = async(req,res)=>{
    connection.getConnection(function(err) {
        if (err) {
            return res.send("Error occured");
        }
    });

    if(req.body.bookName || req.body.ImageLink || req.body.OwnerID || req.body.author || req.body.genre){
        return res.json({message : "field(s) are empty"});
    }

    try {
        const [row] = await connection.execute("Insert into books('Name','ImageLink','ownerID','author','genre') values(?,?,?,?,?)",
        [req.body.primaryUserId],
        [req.body.ImageLink],
        [req.body.ownerID],
        [req.body.author],
        [req.body.genre]);
        try {
            res.json({
                message: "Trade successful",
            });
        } catch (err) {
            console.log("email error  :" + err);
            res.json({ message: "Registration Error" + err });
            return;
        }
    } catch (e) {
        console.log("email error  :" + err);
        res.json({ message: "Registration Error" + err });
        return;
    }
}

exports.removeBook = async(req,res)=>{
    connection.getConnection(function(err){
        if(err){
            return res.json({message : "Error occured"});
        }
    });
    if(req.body.bookID){
        return res.json({message : "field(s) is empty"});
    }
    try {
        const [row] = await connection.execute("Delete from book where bookID = values(?)",
        [req.body.primaryUserId]);

        try {
            res.json({
                message: "Trade successful",
            });
        } catch (err) {
            console.log("email error  :" + err);
            res.json({ message: "Registration Error" + err });
            return;
        }
    } catch (e) {
        console.log("email error  :" + err);
        res.json({ message: "Registration Error" + err });
        return;
    }
}
