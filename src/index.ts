// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import { User } from "./entity/User";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import * as express from "express";
import { createConnection } from "typeorm";
import * as session from 'express-session'
// import { typeDefs, resolvers } from "./schema";

const startServer = async () => {
  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: ({ req }: any) => ({ req })
  });

  await createConnection();

  const app = express();

  app.use(session({
    secret: "aaakjkjkasdf",
    resave: false,
    saveUninitialized: false
  }))

  server.applyMiddleware({ app }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
