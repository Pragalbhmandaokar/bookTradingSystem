const router = require("express").Router();
const { body } = require("express-validator");
const { register, login } = require("./controller/adminController");
const {usersBookSelectByID} = require('./controller/userController');
const {
  tradeBook,
  tradeUpdate,
  updateTradeStatus,
} = require("./controller/tradeController");
const { AddBook, removeBook, selectProductId } = require("./controller/bookController");
const { userSelectAll } = require("./controller/userController");
router.post(
  "/login",
  [
    body("email", "Invalid email address").notEmpty().escape().trim().isEmail(),
    body("password", "The Password must be of minimum 4 characters length")
      .notEmpty()
  ],
  login
);

router.get("/selectProductDetails/:productId", selectProductId);
router.get("/selectBookByUserId/:userId",usersBookSelectByID);
router.post("/BookTrade", tradeBook);
router.get("/userAllSelect", userSelectAll);
router.post("/updateTradeStatus", updateTradeStatus);
router.post("/Addbook", AddBook);
router.post("/removeBook", removeBook);
router.post("/tradeUpdate", tradeUpdate);

module.exports = router;
