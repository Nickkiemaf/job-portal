import winston from "winston"
import path from "path"

const { colorize, errors, timestamp, printf, combine } = winston.format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD-HH:MM:SS" }),
    myFormat
  ),
  transports: [
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({ filename: path.join("logs", "error.log"), level: 'error' }),

    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({ filename: path.join("logs", "combined.log") }),
  ],
});

logger.add(new winston.transports.Console(
  {
    format: combine(
      colorize(),
      myFormat
    )
  }
)
)