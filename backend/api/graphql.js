const { graphql } = require('graphql');
const { schema, root } = require('./graphqlSchema')
const { parse } = require('url');

// This is the actual API handler Vercel uses
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { query, variables } = req.body;

    try {
      const result = await graphql({
        schema,
        source: query,
        rootValue: root,
        contextValue: req, 
        variableValues: variables,
      });

      if (result.errors) {
        console.error(result.errors);
      }

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
