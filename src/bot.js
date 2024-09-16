const { Client, GatewayIntentBits } = require('discord.js');
const BetCommand = require('./commands/BetCommand');
const AnimatedSpinCommand = require('./commands/AnimatedSpinCommand');
const HotCommand = require('./commands/HotCommand');
const ColdCommand = require('./commands/ColdCommand');
const BalanceCommand = require('./commands/BalanceCommand');
const RouletteController = require('./controllers/RouletteController');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const prefix = '!';

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // await RouletteController.initialize();
  // console.log('Bot is ready!');
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'apostar':
      await BetCommand.execute(message, args);
      break;
    case 'girar':
      await AnimatedSpinCommand.execute(message);
      break;
    case 'calientes':
      await HotCommand.execute(message);
      break;
    case 'frios':
      await ColdCommand.execute(message);
      break;
    case 'balance':
      await BalanceCommand.execute(message);
      break;
    default:
      message.reply('Comando no reconocido. Comandos disponibles: !apostar, !girar, !calientes, !frios, !balance');
  }
});

client.login('TU TOKEN');