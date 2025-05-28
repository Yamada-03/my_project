// node/logger.js
function log(level, message, metadata = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...metadata,
  };
  console.log(JSON.stringify(logEntry));
}

module.exports = log;
