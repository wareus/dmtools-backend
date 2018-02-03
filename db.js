const Sequelize = require("sequelize");

const sequelize = new Sequelize("dmtools", "root", null, {
    dialect: "mysql"
})

const Character = sequelize.define("character", {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    nickname: {
        type: Sequelize.STRING
    },
});

const Relation = sequelize.define("relation",
    {
        level:
            {
                type:Sequelize.INTEGER
            }
    });




Relation.belongsTo(Character,{
    foreignKey:"knows",
});
Relation.belongsTo(Character,{
    foreignKey:"recognized",
    as:"known",
});


Character.hasMany(Relation,{
    foreignKey:"knows",
    as:"knows",
});
Character.hasMany(Relation,{
    foreignKey:"recognized",
    as:"recognized",
});

sequelize.sync();

module.exports =  {
    Character,
    Relation
};