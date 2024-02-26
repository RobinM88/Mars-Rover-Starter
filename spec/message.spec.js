const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function () {
  it("throws error if a name is Not passed into the constructor as the first parameter", function () {
    expect(function () {
      new Message(); 
    }).toThrow(new Error("Name required."));
  });
  it("constructor sets name", function () {
    const testName = "TestMessage";
    const testMessage = new Message(testName);
    expect(testMessage.name).toBe(testName);
  });
  it("contains a commands array passed into the constructor as the 2nd argument", function () {
    const testName = "TestMessage";
    const testCommands = [new Command("testCommand")]; // Creating an array of test commands
    const testMessage = new Message(testName, testCommands);

    expect(testMessage.commands).toEqual(testCommands); // Checking if the commands property matches the test commands array
  });
});
