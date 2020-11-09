const db = require("../db/firestoreConnect");
const AppError = require("../helpers/errors");

class StaffHandler {
    async getStaffs(req, res) {
        console.log("getStaffs");
        const userId = req.body.id || req.params.id;
        {
            {
                try {
                    console.log("userID ", userId);
                  //TODO temp hardcode
                  let query = db.collection(
                    "staff/8xGaoGbhwc2QiTFpjLZ8/staffs"
                  );
                  let response = [];
                  await query.listDocuments().then((collections) => {
                    if (collections.length > 0) {
                      collections.forEach((collection) => {
                        collection.get().then((d) => {
                          let staffs = d.data();
                          console.log("staffs ", staffs);
                          response.push({
                            id: collection.id,
                            gender: staffs.gender,
                            name: staffs.name,
                            passcode: staffs.passcode,
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
                      console.log("No such staff!");
                      throw new AppError("No such staff!");
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
    }
}

const staffHandler = new StaffHandler();
module.exports = staffHandler;
