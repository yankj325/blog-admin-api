
const Sequelize=require('sequelize');
const db=require('../db');
const Cate=db.define('Cate',{
    id:{type:Sequelize.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
    name:{type:Sequelize.STRING(20),allowNull: false},
    },{
    underscored:true,
    tableName:'cate',
    }
);
module.exports=Cate;