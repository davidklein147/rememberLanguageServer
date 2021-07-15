const con = require("../utils/sql");

const query = {
    createTable: `create table if not exists USERS(
    Id int not null auto_increment,
    Name nvarchar(255) not null,
    Password nvarchar(255) not null,
    Email nvarchar(255) not null unique,
    primary key(Id))`
   
        
}

module.exports = query