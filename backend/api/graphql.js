const { graphql } = require('graphql');
const { schema, root } = require('../graphqlSchema');
const { parse } = require('url');

module.exports = async (req, res) => {
  // Enhanced CORS handling
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the body (important!)
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { query, variables } = JSON.parse(body);
        
        const result = await graphql({
          schema,
          source: query,
          rootValue: root,
          contextValue: { req, res },
          variableValues: variables,
        });

        if (result.errors) {
          console.error('GraphQL Errors:', result.errors);
          return res.status(400).json({
            errors: result.errors,
            data: result.data
          });
        }

        return res.status(200).json(result);
      } catch (err) {
        console.error('Request Processing Error:', err);
        return res.status(400).json({ 
          error: 'Invalid request format' 
        });
      }
    });
  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};