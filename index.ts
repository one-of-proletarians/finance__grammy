import 'dotenv/config';
import { Bot, session } from 'grammy';
import { token } from './src/config';
import { commandList } from './src/assets/commandList';
import { name_and_price } from './src/regexp';
import { CustomContext } from './src/types';
import { setState } from './src/middlewares/setState';
import { setUserData } from './src/middlewares/setUserData';
import { cmdStart } from './src/commands/cmdStart';
import { initialSession as initial } from './src/assets/initialSession';
import { setPrintTable } from './src/middlewares/setPrintTable';
import { setTimeZone } from './src/middlewares/setTimeZone';
import { cmdPrintToday } from './src/commands/cmdPrintToday';
import { makeRecords } from './src/hears/makeRecords/makeRecords';
import { hidePrevDay } from './src/hears/makeRecords/hidePrevDay';
import { cmdAuth } from './src/commands/cmdAuth';

const bot = new Bot<CustomContext>(token);

bot.api.setMyCommands(commandList);

bot.use(session({ initial }));

bot.use(setUserData);
bot.use(setTimeZone);
bot.use(setState);
bot.use(setPrintTable);

bot.command('start', cmdStart);
bot.command('today', cmdPrintToday);
bot.command('auth', cmdAuth);

bot.hears(name_and_price, hidePrevDay, makeRecords);

bot.on('message', ctx => ctx.deleteMessage());

bot.start().catch(console.log);
bot.catch(error => console.log(error));
