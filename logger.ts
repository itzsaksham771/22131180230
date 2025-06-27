// logging-middleware/logger.ts

type LogLevel = "INFO" | "ERROR" | "WARN" | "DEBUG";

interface LogPayload {
  [key: string]: any;
}

export function logEvent(level: LogLevel, message: string, payload?: LogPayload): void {
  const timestamp = new Date().toISOString();

  const formatted = {
    level,
    message,
    timestamp,
    ...(payload && { payload }),
  };

  switch (level) {
    case "INFO":
      console.info("[INFO]", formatted);
      break;
    case "ERROR":
      console.error("[ERROR]", formatted);
      break;
    case "WARN":
      console.warn("[WARN]", formatted);
      break;
    case "DEBUG":
      console.debug("[DEBUG]", formatted);
      break;
    default:
      console.log("[LOG]", formatted);
  }
}
