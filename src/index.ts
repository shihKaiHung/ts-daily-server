import * as Express from "express";
import * as graphqlHttp from "express-graphql";
import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import * as mongoose from "mongoose";

const app = Express();

const AlbumType = new GraphQLObjectType({
    name: "Album",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        artist: { type: GraphQLString }
    }
});

const uri = "mongodb+srv://shihkai:shihkai0209@habit-vbzqc.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true});


const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zillion' });
kitty.save().then(() => console.log('meow'));

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

const SongType = new GraphQLObjectType({
    name: "Song",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        album: {
            type: AlbumType,
            resolve: (root) => {
                return mockAlbums.find(mockAlbums => mockAlbums.id === root.album)
            }
        }
    }
});

in

const mockAlbums = [
    {
        "id": "1",
        "title": "Fearless",
        "artist": "Taylor Swift"
    },
    {
        "id": "2",
        "title": "1984",
        "artist": "Van Halen"
    }
];


interface Song {
    id: string;
    album: string;
    title: string
}

const mockSongs: Song[]  = [
    {
        "id": "1",
        "album": "1",
        "title": "Fearless"
    },
    {
        "id": "2",
        "album": "2",
        "title": "Jump"
    }
];

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            songs: {
                type: GraphQLList(SongType),
                resolve: (root, args, context, info) => {
                    return mockSongs
                }
            },
            albums: {
                type: GraphQLList(AlbumType),
                resolve: (root, args, context, info) => {
                    return mockAlbums;
                }
            }
        }
    })
});

app.use("/graphql", graphqlHttp({
    schema,
    graphiql: true
}));


app.listen(3000, () => {
    console.log("Listening at :3000");
});
