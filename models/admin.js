const Sequelize=require('sequelize');
const db=require('../db');
const Admin=db.define('Admin',{
        id:{type:Sequelize.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
        username:{type:Sequelize.STRING(20),allowNull: false},
        password:{type:Sequelize.STRING(36),allowNull: false},
        name:{type:Sequelize.STRING(20),allowNull: false},
        role:{type:Sequelize.INTEGER,allowNull: false},
        lastLoginAt:{type:Sequelize.DATE},
    },{
        underscored:true,
        tableName:'admin',
    }
);
module.exports=Admin;