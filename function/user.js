module.exports = (sqlQuery)=>{
   return {
       findById : (id) => sqlQuery('SELECT * FROM users WHERE id = "'+id+'"'),
       findByEmail : (email) =>sqlQuery('SELECT * FROM users WHERE email = "'+email+'"'),
       addUser : (email, password)=>sqlQuery('INSERT INTO users (email,password) VALUES ("'+email+'","'+password+'")')
   }

}