const db = require("../db/firestoreConnect");
const AppError = require("../helpers/errors");

class UserMerchantHandler {
  async getByUserId(req, res) {
    console.log("getByUserId");
    const userId = req.body.id || req.params.id;
    {
      try {
        console.log("userID ", userId);
        //TODO temp hardcode
        let query = db.collection(
          "userMerchants/uzOVNZU4lvQMAXoEea5c/merchants"
        );
        let response = [];
        await query.listDocuments().then((collections) => {
          if (collections.length > 0) {
            collections.forEach((collection) => {
              collection.get().then((d) => {
                let merchantInfo = d.data();
                console.log("merchantInfo ", merchantInfo);
                response.push({
                  id: collection.id,
                  name: merchantInfo.name,
                  logoUrl: merchantInfo.logoUrl,
                });

                if (response.length === collections.length) {
                  //foreach work done
                  console.log("response ", response);
                  return res.status(200).send(response);
                }
              });
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            throw new AppError("No such document!");
          }
          // for (let doc of docs) {
          //     const selectedItem = {
          //         id: doc.id,
          //         name: doc.data().name
          //     };
          //     response.push(selectedItem);
          // }
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    }
  }

  async updateUser(req, res) {
      const userID = req.body.id || req.params.id;
      await db.collection('users').doc(userID).set(req.body,{merge:true})
      .then(()=> res.json({id:userID}))
      .catch((error)=> res.status(500).send(error))
  }

  async addNewCompany(req, res) {
    console.log("addNewCompany");
    try {
        await db.collection('company').doc('/' + req.body.id + '/').create({item: req.body.item});
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
  }

  async generateQRCode(req, res) {
    console.log("generateQRCode");
    try {
        await db.collection('generateQRCode').doc('/' + req.body.id + '/').create({item: req.body.item});
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
  }

  async addPurchase(req, res) {
    console.log("addPurchase");
    try {
        await db.collection('addPurchase').doc('/' + req.body.id + '/').create({item: req.body.item});
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
  }
}

const userMerchantHandler = new UserMerchantHandler();
module.exports = userMerchantHandler;
