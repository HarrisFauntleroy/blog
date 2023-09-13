export type LogType = "info" | "warn" | "error" | "trace" | "debug";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isClient = !(typeof process === "object");
export const isDebug = isDevelopment && isClient;

interface LoggerOptions {
  enableTable?: boolean;
  enableGroup?: boolean;
  enableCount?: boolean;
}

const customLogText = `%c ${isClient ? "CLIENT" : "SERVER"}:`;

const logMessage = (type: LogType, messages: unknown[]) => {
  const logStyles: { [key: string]: string } = {
    info: "background: #4299E1; color: #000000;",
    warn: "background: #ED8936; color: #000000;",
    error: "background: #F56565; color: #000000;",
    trace: "background: #A0AEC0; color: #000000;",
    debug: "background: #9F7AEA; color: #000000;",
  };

  console[type](customLogText, logStyles[type], ...messages);
};

const additionalConsoleActions = (
  options: LoggerOptions,
  messages: unknown[]
) => {
  if (options.enableTable && Array.isArray(messages[0])) {
    console.table(messages[0]);
  }

  if (options.enableGroup) {
    console.group(...messages);
    console.groupEnd();
  }

  if (options.enableCount) {
    console.count(customLogText);
  }
};

export const logger = ((options: LoggerOptions = {}) => {
  const print = (type: LogType, ...messages: unknown[]) => {
    if (process.env.NEXT_PUBLIC_LOGS_ENABLED || isDevelopment) {
      logMessage(type, messages);
      additionalConsoleActions(options, messages);
    }
  };

  const timeStart = (label: string) => {
    if (process.env.NEXT_PUBLIC_LOGS_ENABLED || isDevelopment) {
      console.time(label);
    }
  };

  const timeEnd = (label: string) => {
    if (process.env.NEXT_PUBLIC_LOGS_ENABLED || isDevelopment) {
      console.timeEnd(label);
    }
  };

  return {
    debug: print.bind(null, "debug"),
    info: print.bind(null, "info"),
    warn: print.bind(null, "warn"),
    error: print.bind(null, "error"),
    trace: print.bind(null, "trace"),
    timeStart,
    timeEnd,
  };
})();

export const timeStamp = (...arguments_: unknown[]) => {
  logger.info(`[${new Date().toISOString().slice(11, 23)}] -`, ...arguments_);
};

export const debugLog = (...arguments_: unknown[]) => {
  if (process.env.DEBUG === "1") {
    timeStamp(...arguments_);
  }
};
