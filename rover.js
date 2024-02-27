const Message = require("./message.js");
const Command = require("./command.js");
class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  updatePosition(newPosition) {
    this.position = newPosition;
  }

  receiveMessage(message) {
   const results = message.commands.map(command => {
     if (command.commandType === 'MOVE') {
       if (this.mode === 'LOW_POWER') {
         return { completed: false };
       } else {
         this.position = command.value;
         return { completed: true };
       } 
     } else if (command.commandType === 'STATUS_CHECK') {
       return {
         completed: true,
         roverStatus: {
           mode: this.mode,
           generatorWatts: this.generatorWatts,
           position: this.position
         }
       };
     } else if (command.commandType === 'MODE_CHANGE') {
       this.mode = command.value;
       return { completed: true };
     } else {
       return { completed: false };
     }
   });
   
   return { message: message.name, results };
 }
}



module.exports = Rover;