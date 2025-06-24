/* eslint-disable @typescript-eslint/no-explicit-any */

import { logger, transportFunctionType } from 'react-native-logs';

export class ConsoleInjector {
  private static oldConsole = global.console;

  public static inject = () => {
    ConsoleInjector.applyInjection(ConsoleInjector.createLocalLogger());
  };

  public static applyInjection = (localLogger: any) => {
    /*eslint no-global-assign: "off"*/
    console = (function (_) {
      return {
        ...ConsoleInjector.oldConsole,
        log: function (...obj) {
          localLogger.debug(...ConsoleInjector.prettify(obj));
        },
        info: function (...obj) {
          localLogger.info(...ConsoleInjector.prettify(obj));
        },
        warn: function (...obj) {
          if (obj.length && typeof obj[0] === 'string' && obj[0].startsWith('Require cycle:')) return;
          localLogger.info(obj);
          localLogger.warn(...ConsoleInjector.prettify(obj));
        },
        error: function (...obj) {
          localLogger.error(...ConsoleInjector.prettify(obj));
        },
      };
    })(window.console);
  };

  private static prettify = (obj: (object | string)[]) =>
    obj.map((item) => (typeof item === 'object' ? JSON.stringify(item, null, 2) : item));

  private static createLocalLogger = () => logger.createLogger(ConsoleInjector.defaultConfig);

  private static applyMiddlewareTransport = (props: any) => {
    if (!props) return false;

    const { options, level, extension, msg: message } = props;
    const resetColors = '\x1b[0m';
    let msg = message;
    let color;

    if (options?.colors && options.colors[level.text] && ConsoleInjector.availableColors[options.colors[level.text]]) {
      color = `\x1b[${ConsoleInjector.availableColors[options.colors[level.text]]}m`;
      msg = `${color}${msg}${resetColors}`;
    }

    if (extension && options?.extensionColors) {
      let extensionColor = '\x1b[7m';

      if (options.extensionColors[extension] && ConsoleInjector.availableColors[options.extensionColors[extension]]) {
        extensionColor = `\x1b[${this.availableColors[options.extensionColors[extension]] + 10}m`;
      }

      const extStart = color ? resetColors + extensionColor : extensionColor;
      const extEnd = color ? resetColors + color : resetColors;
      msg = msg.replace(extension, `${extStart} ${extension} ${extEnd}`);
    }
    if (options?.consoleFunc) {
      options.consoleFunc(msg.trim());
    } else {
      ConsoleInjector.oldConsole.log(msg.trim());
    }

    return true;
  };

  static availableColors: any = {
    default: null,
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    grey: 90,
    redBright: 91,
    greenBright: 92,
    yellowBright: 93,
    blueBright: 94,
    magentaBright: 95,
    cyanBright: 96,
    whiteBright: 97,
  };

  static defaultConfig = {
    levels: {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    },
    severity: 'debug',
    transport: ConsoleInjector.applyMiddlewareTransport as transportFunctionType<any>,
    transportOptions: {
      colors: {
        info: 'blueBright',
        warn: 'yellowBright',
        error: 'redBright',
      },
    },
    async: true,
    dateFormat: 'time',
    printLevel: true,
    printDate: true,
    fixedExtLvlLength: false,
    enabled: true,
  };
}
