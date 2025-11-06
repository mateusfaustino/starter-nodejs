const crypto = require('crypto');

const iterations = 310000;
const keyLength = 32;
const digest = 'sha256';

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = await new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLength, digest, (err, key) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(key.toString('hex'));
    });
  });

  return `${salt}:${derivedKey}`;
}

async function verifyPassword(password, storedHash) {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) {
    return false;
  }

  const derivedKey = await new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLength, digest, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.toString('hex'));
    });
  });

  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(derivedKey, 'hex'));
}

module.exports = {
  hashPassword,
  verifyPassword,
};
