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
  
  type Character
  {
    id:Int
    firstname:String
    lastname:String
    nickname:String
    knows:[Relation]
  }
  type Relation
  {
    knows:Int
    known:Character
    level:Int
  }
  
`);

var root = {
    character: async ({id}) => {

        return await db.Character.findById(id, {include:[
                {model:db.Relation, as:"knows", include:[{model:db.Character, as:"known"}]}
            ]});
    },
    characters: async () => {

        return await db.Character.findAll();
    },
};

var app = express();

app.use(cors({origin:"http://localhost:3000", credentials: true}));


app.use("/images", express.static(path.join(__dirname, "images")));



app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
