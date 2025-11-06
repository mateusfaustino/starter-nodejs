const levels = {
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
  debug: 'DEBUG',
};

function formatMessage(level, message) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${levels[level] || level}] ${message}`;
}

const logger = {
  info: (message, meta) => {
    if (meta) {
      console.log(formatMessage('info', message), meta);
      return;
    }
    console.log(formatMessage('info', message));
  },
  warn: (message, meta) => {
    if (meta) {
      console.warn(formatMessage('warn', message), meta);
      return;
    }
    console.warn(formatMessage('warn', message));
  },
  error: (message, meta) => {
    if (meta) {
      console.error(formatMessage('error', message), meta);
      return;
    }
    console.error(formatMessage('error', message));
  },
  debug: (message, meta) => {
    if (process.env.NODE_ENV !== 'production') {
      if (meta) {
        console.debug(formatMessage('debug', message), meta);
        return;
      }
      console.debug(formatMessage('debug', message));
    }
  },
};

module.exports = logger;
