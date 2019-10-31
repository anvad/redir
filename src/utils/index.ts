let log2;

if (!process.env.FUNCTIONS_EXTENSION_VERSION
    && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
    process.env.DEV_LOCAL = 'dev_local';
    const chalk = require('chalk');
    log2 = (message, color: LogColors = LogColors.white, bgColor = 'bgBlack') => {
        console.log(chalk[color][bgColor]((new Date(Date.now())).toISOString() + ' | ' + message));
    }
}
else {
    log2 = (message, color: LogColors = LogColors.white, bgColor = 'bgBlack') => {
        console.log(color, bgColor, message);
    }
}

export const log = log2;

export enum LogColors {
    black = 'black',
    red = 'red',
    green = 'green',
    yellow = 'yellow',
    blue = 'blue',
    magenta = 'magenta',
    cyan = 'cyan',
    white = 'white',
    gray = 'gray',
    grey = 'grey',
    blackBright = 'blackBright',
    redBright = 'redBright',
    greenBright = 'greenBright',
    yellowBright = 'yellowBright',
    blueBright = 'blueBright',
    magentaBright = 'magentaBright',
    cyanBright = 'cyanBright',
    whiteBright = 'whiteBright',
}
