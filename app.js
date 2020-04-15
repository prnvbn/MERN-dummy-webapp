// setting up node express server
const express = require('express');
const bodyParser = require('body-parser');

const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');


const graphqlSchemas = require('./graphql/schemas/index');
const graphqlResolvers = require('./graphql/resolvers/index');



const app = express();

app.use(bodyParser.json());



app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

// configuring graphql API
app.use('/graphql', graphqlHttp({
    schema: graphqlSchemas,
    rootValue: graphqlResolvers,
    graphiql: true // allows to visit our graphql API 
}));




mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-9guwp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000,function(){
            console.log("server is running on port 3000");
         });
    }) 
    .catch(err => {
        console.log(err);
});

