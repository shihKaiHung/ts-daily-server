import * as Express from "express";
import * as graphqlHttp from "express-graphql";
import * as cors from "cors";
import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import * as mongoose from "mongoose";
import {schema} from "./graphql/bookSchemas";

const app = Express();

const AlbumType = new GraphQLObjectType({
    name: "Album",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        artist: { type: GraphQLString }
    }
});

const uri = "mongodb+srv://shihkai:shihkai0209@habit-vbzqc.mongodb.net/habit_data?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true});


// const Cat = mongoose.model('Cat', { name: String });
//
// const kitty = new Cat({ name: 'Zillion' });
// kitty.save().then(() => console.log('meow'));

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.use("*", cors())
app.use("/graphql", cors(),graphqlHttp({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log("Listening at :3000");
});
