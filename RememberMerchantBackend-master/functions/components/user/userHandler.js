const db = require("../db/firestoreConnect");
const AppError = require("../helpers/errors");

class UserHandler {
    async getByID(req, res) {
        console.log('getByID');
        const userID = req.body.id || req.params.id;
        {
            try {
                console.log('userID ',userID);
                let query = db.collection('users').doc(userID);;
                let response = {};
                await query.get().then(doc => {
                    if (doc.exists) {                       
                        response= {
                           doc: doc.data()
                                };
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
                    return response;
                });
                return res.status(200).send(response);
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
    
    };
}

const userHandler = new UserHandler();
module.exports = userHandler;
