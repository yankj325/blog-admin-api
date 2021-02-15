const Sequelize=require('sequelize');
const CateModel=require('./cate');
const db=require('../db');
const Article=db.define('Article',{
        id:{type:Sequelize.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
        title:{type:Sequelize.STRING(30),allowNull: false},
        desc:{type:Sequelize.STRING,allowNull: false},
        content:{type:Sequelize.TEXT,allowNull: false},
        cate:{type:Sequelize.INTEGER,allowNull: false}
    },{
        underscored:true,
        tableName:'article',
    }
);
module.exports=Article;
Article.belongsTo(CateModel,{foreignKey:'cate',constraints:false});
