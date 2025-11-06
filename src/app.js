const express = require('express');
const routes = require('./routes');
const { connectDatabase } = require('./config/database');
const env = require('./config/env');
const logger = require('./utils/logger');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

function applySecurityHeaders(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
}

function enableCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
}

app.use(applySecurityHeaders);
app.use(enableCors);
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', routes);
app.use(errorHandler);

async function start() {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      logger.info(`Server is running on port ${env.port}`);
    });
  } catch (error) {
    logger.error('Application failed to start', error);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}

module.exports = app;
