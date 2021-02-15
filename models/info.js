const Sequelize=require('sequelize');
const db=require('../db');
const Info=db.define('Info',{
        id:{type:Sequelize.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
        title:{type:Sequelize.STRING(20),allowNull: false},
        subtitle:{type:Sequelize.STRING(30),allowNull: false},
        about:{type:Sequelize.TEXT,allowNull: false},
    },{
        underscored:true,
        tableName:'info',
    }
);
module.exports=Info;