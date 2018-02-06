const express = require('express');
const cors = require('cors');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const Sequelize = require("sequelize");
const db = require("./db");
const Op = Sequelize.Op;

var schema = buildSchema(`
  type Query {
    character(id:Int!): Character
    characters:[Character]
  }
  
  type Mutation 
  {
    addCharacter(id:Int, firstname:String, lastname:String, nickname:String, gender:String):Character
  }
  
  type Character
  {
    id:Int
    firstname:String
    lastname:String
    nickname:String
    gender:String
    knows:[Relation]
    events:[Event]
    
  }
  type Relation
  {
    knows:Int
    known:Character
    type:String
  }
  type Event
  {
    date:String
    type:EventType
  }
  enum EventType
  {
    Birth
    Death
  }
  
  
  
`);

var root = {

        character: async ({id}) => {

            let character = await db.Character.findById(id, {
                include: [
                    {model: db.Relation, as: "knows", include: [{model: db.Character, as: "known"}]},
                    {model: db.Event, as: "events"}
                ]
            })

            return character;
        },
        characters: async () => {

            return await db.Character.findAll();
        },


        addCharacter: async (data)=>{
            add(db.Character, data);
        }

};

const add = async (tabel, data)=>{
    if (!data.id)
        return new tabel(data).save();
    return await tabel.findById(data.id).then(tmp => {
        return tmp.update(data);
    });
}

var app = express();

app.use(cors({origin:"http://localhost:3000", credentials: true}));


app.use("/images", express.static(path.join(__dirname, "images")));



app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
