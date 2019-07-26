import {GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull} from "graphql";
import * as GraphQLDate from "graphql-date";
import {BookModel} from "../models/Book";

const bookType = new GraphQLObjectType({
    name: "book",
    fields: function () {
        return {
            id: {
                type: GraphQLString,
            },
            isbn: {
                type: GraphQLString,
            },
            title: {
                type: GraphQLString,
            },
            author: {
                type: GraphQLString,
            },
            des: {
                type: GraphQLString,
            },
            published_year: {
                type: GraphQLInt,
            },
            updated_date: {
                type: GraphQLDate,
            }
        }
    }
});


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addBook: {
                type: bookType,
                args: {
                    isbn: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    author: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    published_year: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    publisher: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const bookModel = new BookModel(params);
                    const newBook = bookModel.save();
                    if (!newBook) {
                        throw new Error('Error');
                    }
                    return newBook
                }
            },
            updateBook: {
                type: bookType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    isbn: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    author: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    published_year: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    publisher: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    return BookModel.findByIdAndUpdate(params.id, {
                        isbn: params.isbn,
                        title: params.title,
                        author: params.author,
                        description: params.description,
                        published_year: params.published_year,
                        publisher: params.publisher,
                        updated_date: new Date()
                    }, function (err) {
                        if (err) {
                            throw new Error('error')
                        }
                    });
                }
            },
            removeBook: {
                type: bookType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remBook = BookModel.findByIdAndRemove(params.id).exec();
                    if (!remBook) {
                        throw new Error('Error')
                    }
                    return remBook;
                }
            }
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            books: {
                type: new GraphQLList(bookType),
                resolve: function () {
                    const books = BookModel.find().exec()
                    if (!books) {
                        throw new Error('Error')
                    }
                    return books
                }
            },
            book: {
                type: bookType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const bookDetails = BookModel.findById(params.id).exec()
                    if (!bookDetails) {
                        throw new Error('Error')
                    }
                    return bookDetails
                }
            }
        }
    }
});

export const schema = new GraphQLSchema({ query: queryType, mutation});
