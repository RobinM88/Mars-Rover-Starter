const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
const rover = new Rover();

describe("Rover class", function () {
  it("constructor sets position and default values for mode and generatorWatts", function () {
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function () {
    const message = new Message("Test Message", []);
    const result = rover.receiveMessage(message);
    expect(result.message).toBe("Test Message");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    const message = new Message("Test Message", [
      { commandType: "MOVE", value: 200 },
      { commandType: "STATUS_CHECK" },
    ]);
    const result = rover.receiveMessage(message);
    expect(result.results).toHaveLength(2);
  });

  it("responds correctly to the status check command", function () {
    const rover = new Rover(100)
    const message = new Message("Test Message", [
      { commandType: "STATUS_CHECK" },
    ]);
    const result = rover.receiveMessage(message);
    expect(result.results[0].completed).toBe(true);
    expect(result.results[0].roverStatus).toEqual({
      mode: "NORMAL",
      generatorWatts: 110,
      position: 200,
    });
  });

  it("responds correctly to the mode change command", function () {
    const rover = new Rover(100);
    const message = new Message("Test Message", [
      { commandType: "MODE_CHANGE", value: "LOW_POWER" },
    ]);
    const result = rover.receiveMessage(message);
    expect(result.results[0].completed).toBe(true);
    expect(rover.mode).toBe("LOW_POWER");
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    const rover = new Rover(100);
    rover.mode = "LOW_POWER";
    const message = new Message("Test Message", [
      { commandType: "MOVE", value: 200 },
    ]);
    const result = rover.receiveMessage(message);
    expect(result.results[0].completed).toBe(false);
    expect(rover.position).toBe(100); // Position should not change
  });
  it("responds with the position for the move command", function () {
    const message = new Message("Test Message", [
      { commandType: "MOVE", value: "newPosition" },
    ]);
    const result = rover.receiveMessage(message);
    expect(result.results[0].completed).toBe(true);
    expect(rover.position).toBe("newPosition");
  });
});
