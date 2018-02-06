const Sequelize = require("sequelize");

const sequelize = new Sequelize("dmtools", "root", null, {
    dialect: "mysql"
})


const Character = sequelize.define("character",
    {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        nickname: {
            type: Sequelize.STRING
        },
        gender: Sequelize.ENUM("Male", "Female")
    });

const Relation = sequelize.define("relation",
    {
        type:
            {
                type:Sequelize.ENUM("Married", "Father", "Mother", "Child", "Sibling", "Friend", "Enemy", "Neutral")
            }
    });

const Event = sequelize.define("event",
    {
        date:
            {
                type:Sequelize.DATEONLY
            },
        type:
            {
                type:Sequelize.ENUM("Birth", "Death")
            }
    });


Event.belongsTo(Character,{
    foreignKey:"regarding"
})

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
Character.hasMany(Event,{
    foreignKey:"regarding",
    as:"events"
});

sequelize.sync({ force: true }).then(()=>{

    addDummyData();
});

module.exports =  {
    Character,
    Relation,
    Event
};

async function addDummyData()
{
    await new Character({
        firstname:"Eddard",
        lastname:"Stark",
        nickname:"Ned",
        gender:"Male"

    }).save();

    await new Character({
        firstname:"Catelyn",
        lastname:"Stark",
        nickname:"Cat",
        gender:"Female"

    }).save();

    await new Character({
        firstname:"Jon",
        lastname:"Snow",
        nickname:"",
        gender:"Male"

    }).save();

    await new Character({
        firstname:"Arya",
        lastname:"Stark",
        nickname:"",
        gender:"Female"

    }).save();

    await new Character({
        firstname:"Sansa",
        lastname:"Stark",
        nickname:"",
        gender:"Female"

    }).save();


    await new Relation({
        knows: 1,
        recognized: 2,
        type:"Married"
    }).save();
    await new Relation({
        knows: 1,
        recognized: 3,
        type:"Friend"
    }).save();
    await new Relation({
        knows: 1,
        recognized: 4,
        type:"Child"
    }).save();
    await new Relation({
        knows: 1,
        recognized: 5,
        type:"Child"
    }).save();
    await new Relation({
        knows: 2,
        recognized: 1,
        type:"Married"
    }).save();
    await new Relation({
        knows: 2,
        recognized: 3,
        type:"Enemy"
    }).save();
    await new Relation({
        knows: 2,
        recognized: 4,
        type:"Child"
    }).save();
    await new Relation({
        knows: 2,
        recognized: 5,
        type:"Child"
    }).save();
    await new Relation({
        knows: 3,
        recognized: 1,
        type:"Friend"
    }).save();
    await new Relation({
        knows: 3,
        recognized: 2,
        type:"Enemy"
    }).save();
    await new Relation({
        knows: 3,
        recognized: 4,
        type:"Friend"
    }).save();
    await new Relation({
        knows: 3,
        recognized: 5,
        type:"Friend"
    }).save();
    await new Relation({
        knows: 4,
        recognized: 1,
        type:"Father"
    }).save();
    await new Relation({
        knows: 4,
        recognized: 2,
        type:"Mother"
    }).save();
    await new Relation({
        knows: 4,
        recognized: 3,
        type:"Friend"
    }).save();
    await new Relation({
        knows: 4,
        recognized: 5,
        type:"Sibling"
    }).save();
    await new Relation({
        knows: 5,
        recognized: 1,
        type:"Father"
    }).save();
    await new Relation({
        knows: 5,
        recognized: 2,
        type:"Mother"
    }).save();
    await new Relation({
        knows: 5,
        recognized: 3,
        type:"Friend"
    }).save();
    await new Relation({
        knows: 5,
        recognized: 4,
        type:"Sibling"
    }).save();

    await new Event({
        date:"1959-04-17",
        type:"Birth",
        regarding:1
    }).save();
    await new Event({
        date:"1964-01-17",
        type:"Birth",
        regarding:2
    }).save();
    await new Event({
        date:"1986-12-26",
        type:"Birth",
        regarding:3
    }).save();
    await new Event({
        date:"1997-04-15",
        type:"Birth",
        regarding:4
    }).save();
    await new Event({
        date:"1996-02-21",
        type:"Birth",
        regarding:5
    }).save();

    await new Event({
        date:"2011-06-12",
        type:"Death",
        regarding:1
    }).save();
    await new Event({
        date:"2013-06-02",
        type:"Death",
        regarding:2
    }).save();

}