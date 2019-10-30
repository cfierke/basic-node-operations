const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {

  const userInputArray = userInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
    case 'echo':
      commandLibrary.echo(userInputArray.slice(1).join(' '));
      break;
    case 'cat':
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case 'head':
      commandLibrary.head(userInputArray.slice(1));
      break;
    case 'tail':
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.error(userInputArray.join(' '));
      break;
  }
}

const commandLibrary = {
  'echo': function(userInput) {
    done(userInput);
  },

  'cat': function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },

  'head': function(fullPath) {
    const fileName = fullPath[0];
    let dataArray = [];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      dataArray = data.toString().split('\n');
      done(dataArray.slice(0, 10).join('\n'));
    });
  },

  'tail': function(fullPath) {
    const fileName = fullPath[0];
    let dataArray = [];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      dataArray = data.toString().split('\n');
      done(dataArray.slice(dataArray.length - 10).join('\n'));
    });
  },

  'error': function(userInput) {
    done(`Error, no such command: ${userInput}`)
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
