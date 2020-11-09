const express = require("express");
const staffHandler = require("./staffHandler");

let router = express.Router();

router.route("/staff")
    .get(staffHandler.getStaff);

const staffRouter = router;
module.exports = staffRouter;
