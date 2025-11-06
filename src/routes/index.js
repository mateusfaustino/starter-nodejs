const { Router } = require('express');
const usersRoutes = require('./v1/users.routes');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    name: 'starter-nodejs',
    version: 'v1',
    documentation: '/api/v1/health',
  });
});

router.use('/v1/users', usersRoutes);
router.get('/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = router;
