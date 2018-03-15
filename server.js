import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import { ApolloEngine } from 'apollo-engine';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from './data/schema';

const app = express();

const engine = new ApolloEngine({
  apiKey: process.env.API_KEY,
});

app.use(compression())
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, tracing: true })
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

engine.listen({
  port: process.env.PORT,
  graphqlPaths: ['/graphql'],
  expressApp: app,
  launcherOptions: {
    startupTimeout: 3000,
  },
}, () => {
  console.log(`GraphiQL is now running on http://localhost:${process.env.PORT}/graphiql`);
});
