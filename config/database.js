const mysql = require('mysql');
const db = require('./db_creds');
const bcrypt   = require('bcrypt-nodejs');
let con;
exports.connect = ()=> {

     con = mysql.createConnection({
        host: db.host,
        user: db.user,
        password: db.password,
         database: db.db
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
        return con;
};



exports.generatehash = (pass)=>{
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
};

exports.validpassword = (password,pass)=>{
    return bcrypt.compareSync(password, pass);
}