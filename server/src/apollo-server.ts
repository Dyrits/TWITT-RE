import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import Db from './db';
import createResolvers from './resolvers';
import { GRAPHQL_SCHEMA_PATH } from './constants';
import * as express from 'express';
import { ApolloServer, BaseContext } from '@apollo/server';
import { GraphQLSchema } from 'graphql';
import { expressMiddleware } from '@as-integrations/express4';
import * as cors from 'cors';
import { Server } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const schema = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()],
});

async function startApolloServer(
  serverOptions: { httpServer: Server; app: express.Application },
  apolloOptions: {
    schemaWithResolvers: GraphQLSchema;
  }
): Promise<ApolloServer<BaseContext>> {
  const { httpServer, app } = serverOptions;
  const { schemaWithResolvers } = apolloOptions;
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use('/graphql', cors(), express.json(), expressMiddleware(server));
  return server;
}

export async function createApolloServer(
  db: Db,
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<BaseContext>> {
  // Add resolvers to the schema
  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers: createResolvers(db),
  });

  const apolloServer = await startApolloServer(
    { httpServer, app },
    { schemaWithResolvers }
  );
  return apolloServer;
}
