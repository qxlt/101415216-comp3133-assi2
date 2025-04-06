const express = require('express');
require('dotenv').config(); 
const app = express();
const PORT = process.env.PORT;
const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./graphqlSchema')
const cors = require('cors');

// database connection
const connectDB = require('./lib/db');

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// api setup for graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// start running
app.listen(PORT, () => {
  connectDB()
  console.log(`App is running on http://localhost:${PORT}`);
});
