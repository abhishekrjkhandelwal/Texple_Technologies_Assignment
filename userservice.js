let async = require('async');
let util = require('./util'),
userdao = require('./userDAO');

// API to get user id
let getUsers = (data, callback) => {
  async.auto ({
    user: (cb) => {
      userdao.getUsers({}, (err, data) =>
      {
        if(err)
        {
          console.log(data, 'data testing..');
          cb(null, { "errorCode": 501, "statusmessage": "error found"});
          return;
        }
        cb(null,data);
        return;
      });
       }
    },  (err, Response) => {
      callback(Response.user);
  })
}

// api to get user by id
let getUserByID = (data, callback) => {
  async.auto ({
    user: (cb) => {
      let criteria = {
        "id":data.id
       }

      userdao.getUserByID(criteria, (err, data) =>
      {
        if(err)
        {
          console.log(data, 'data testing..');
          cb(null, { "errorCode": 501, "statusmessage": "error found"});
          return;
        }
        cb(null,data);
        return;
      });
       }
    },  (err, Response) => {
      callback(Response.user);
  })
}

    /**API to create the user */
  let createUser = (data, callback) => {
      async.auto({
           user: (cb) => {
              var dataToSet = {
                  "id" : data.id,
                  "name":data.name?data.name:'',
                  "email":data.email,
                  "password": data.password,
              }
              userdao.createUser(dataToSet, (err, dbData) => {
                  if (err) {
                      cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                      return;
                  }
                  cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":dataToSet });
              });
          }
      }, (err, response) => {
          callback(response.user);
      });
   }

// api for update user
   let updateUser = (data,callback) => {
    async.auto({
        userUpdate:(cb) =>{
                if (!data.id) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                    return;
                }
                var criteria = {
                  id: data.id,
                }
                var dataToSet={
                  "id": data.id,
                  "name":data.name,
                  "email":data.email,
                  "password":data.password,
                }
               // console.log(criteria,'test',dataToSet);
      userdao.updateUser(criteria, dataToSet, (err, dbData)=>{
        if(err){
                        cb(null,{"statusCode":util.statusCode.FOUR_ZERO_ONE,"statusMessage":util.statusMessage.SERVER_BUSY});
        return;
        }
        else{
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":dataToSet  });
        }
      });
        }
    }, (err,response) => {
        callback(response.userUpdate);
    });
  }



       /**API to delete the subject */
       let deleteUser = (data,callback) => {
        async.auto({
            removeUser :(cb) =>{
                    if (!data.id) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                        return;
                    }
                    var criteria = {
                        id : data.id,
                    }

                    userdao.deleteUser(criteria,(err,dbData) => {
                        if (err) {
                            console.log(err);
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                            return;
                        }
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DELETE_DATA });
                    });
            }
        }, (err,response) => {
            callback(response.removeUser);
        });
    }


module.exports =
{
  getUserByID: getUserByID,
  createUser: createUser,
  getUsers : getUsers,
  deleteUser: deleteUser,
  updateUser: updateUser,
}
