import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
    # this is a comment
    schema {
        query: Query
    }

    type Query {
        greeting: String
    }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello GraphQL!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 9000 } });
console.log(`Server running at ${url}`);
