let dbConfig  = require('./mysqlConfig');

// get users
let getUsers = (criteria, callback) => {
  dbConfig.getDB().query("select * from users", criteria,callback);
}

// get user by id
let getUserByID = (criteria, callback) => {
   let conditions = "";
   criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
   dbConfig.getDB().query(`select * from users where 1 ${conditions}`, callback);
 }

 // create user
let createUser = (dataToSet, callback) => {
  dbConfig.getDB().query("insert into users set ? ", dataToSet, callback);
}

// update user
let updateUser = (criteria,dataToSet,callback) => {
  let conditions = ""
  let setData = "";
  criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
  dataToSet.id ? setData += `id =   '${dataToSet.id}'` : true
  dataToSet.name ? setData += ` name = '${dataToSet.name}'` : true;
  dataToSet.email ? setData += `, email = '${dataToSet.email}'` : true;
  dataToSet.password ? setData += `, password = '${dataToSet.password}'` : true;
  console.log(`UPDATE users SET ${setData} where 1 ${conditions}`);
  dbConfig.getDB().query(`UPDATE users SET ${setData} where 1 ${conditions}`,  callback);
}

// delete user
let deleteUser = (criteria, callback) => {
  let conditions = "";
   criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
   // console.log(`delete from users where 1 ${conditions}`);
   dbConfig.getDB().query(`delete from users where 1 ${conditions}`, callback);

}


module.exports = {
  getUsers: getUsers,
  createUser : createUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getUserByID: getUserByID,
}
