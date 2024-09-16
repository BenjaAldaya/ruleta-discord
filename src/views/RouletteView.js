const { EmbedBuilder } = require('discord.js');

class RouletteView {
    static numberEmojis = {
        '0': '🟩',
        'red': '🟥',
        'black': '⬛'
      };
    
      static redNumbers = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
    
      static createAnimationFrame(numbers, highlightIndex) {
        return '```\n' +
          '🔻 Ruleta girando 🔻\n' +
          numbers.map((num, index) => 
            (index === highlightIndex ? '[' : ' ') +
            this.getNumberEmoji(num) + num.padStart(2, '0') +
            (index === highlightIndex ? ']' : ' ')
          ).join('') +
          '\n      🔺\n' +
          '```';
      }
    
      static getColoredNumber(number) {
        const n = parseInt(number);
        if (n === 0) return '\u001b[32m00\u001b[0m';
        return this.redNumbers.has(n) 
          ? `\u001b[31m${n.toString().padStart(2, '0')}\u001b[0m`
          : `\u001b[30m${n.toString().padStart(2, '0')}\u001b[0m`;
      }

      static getNumberEmoji(number) {
        const n = parseInt(number);
        if (n === 0) return this.numberEmojis['0'];
        return this.redNumbers.has(n) ? this.numberEmojis['red'] : this.numberEmojis['black'];
      }

  static createSpinResult(result, bets, hotNumbers, coldNumbers) {
    const embed = new EmbedBuilder()
      .setTitle('Resultados de la Ruleta')
      .setDescription(`La bola cayó en: ${this.getNumberEmoji(result)}${result.padStart(2, '0')}`)
      .setColor(result === '0' ? '#00FF00' : (this.redNumbers.has(parseInt(result)) ? '#FF0000' : '#000000'));

    if (bets.length > 0) {
      embed.addFields({
        name: 'Apuestas',
        value: bets.map(bet => 
          `${bet.user.username}: ${bet.amount} a ${bet.type}. ${bet.won ? `Ganó ${bet.winnings}` : 'Perdió'}. Balance: ${bet.newBalance}`
        ).join('\n')
      });
    }

    if (hotNumbers.length > 0) {
      embed.addFields({
        name: 'Números calientes',
        value: hotNumbers.map(n => `${this.getNumberEmoji(n)}${n.padStart(2, '0')}`).join(', ')
      });
    }

    if (coldNumbers.length > 0) {
      embed.addFields({
        name: 'Números fríos',
        value: coldNumbers.map(n => `${this.getNumberEmoji(n)}${n.padStart(2, '0')}`).join(', ')
      });
    }

    return { embeds: [embed] };
  }

  static createBetConfirmation(user, bet, amount, newBalance) {
    return `${user.username}, apuesta de ${amount} a ${bet} confirmada. Balance actual: ${newBalance}.`;
  }

  static createHotNumbersView(hotNumbers) {
    return {
      embeds: [new EmbedBuilder()
        .setTitle('Números Calientes')
        .setDescription('Los números que han salido con más frecuencia:')
        .addFields({ 
          name: 'Top 5', 
          value: hotNumbers.map(n => `${this.getNumberEmoji(n)}${n.padStart(2, '0')}`).join(', ') 
        })
      ]
    };
  }

  static createColdNumbersView(coldNumbers) {
    return {
      embeds: [new EmbedBuilder()
        .setTitle('Números Fríos')
        .setDescription('Los números que han salido con menos frecuencia:')
        .addFields({ 
          name: 'Bottom 5', 
          value: coldNumbers.map(n => `${this.getNumberEmoji(n)}${n.padStart(2, '0')}`).join(', ') 
        })
      ]
    };
  }

  static createBalanceView(user) {
    return {
      embeds: [new EmbedBuilder()
        .setTitle('Balance de Usuario')
        .setDescription(`Balance actual de ${user.username}`)
        .addFields({ name: 'Balance', value: `${user.balance} monedas` })
      ]
    };
  }
}

module.exports = RouletteView;