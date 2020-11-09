const express = require("express");
const userMerchantHandler = require("./userMerchantHandler");

let router = express.Router();

router.route("/userMerchant/:id")
    .get(userMerchantHandler.getByUserId)
    //.put(userMerchantHandler.updateUser)
    //deploy .post(userMerchantHandler.addNewCompany)
    //.get(userMerchantHandler.getStaff);

const userMerchantRouter = router;
module.exports = userMerchantRouter;
