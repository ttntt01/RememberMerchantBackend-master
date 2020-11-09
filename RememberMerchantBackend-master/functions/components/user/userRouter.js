const express = require("express");
const userHandler = require("./userHandler");

let router = express.Router();

router
    .get(userHandler.getByID)
    .patch(userHandler.updateUser);

const userRouter = router;
module.exports = userRouter;
