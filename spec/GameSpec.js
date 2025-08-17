'use strict';

describe("Game of Bowling", function() {

  var game;
  var i;

  beforeEach(function(){
    game = new Game();
  });

  it("calculates a perfect game", function() {
    rollMany(12, 10); // 12 strikes for perfect game
    expect(game.score()).toEqual(300);
  });

  it("calculates a normal game", function() {
    rollMany(20, 1); // 20 rolls of 1 pin each = 20 points
    expect(game.score()).toEqual(20);
  });

  it("calculates a gutter game", function() {
    rollMany(20, 0); // 20 rolls of 0 pins = 0 points
    expect(game.score()).toEqual(0);
  });

  it("calculates a spare game", function() {
    rollSpare();
    game.roll(3);
    rollMany(17, 0);
    expect(game.score()).toEqual(16); // 10 + 3 + 3 = 16
  });

  it("calculates a strike game", function() {
    rollStrike();
    game.roll(3);
    game.roll(4);
    rollMany(16, 0);
    expect(game.score()).toEqual(24); // 10 + 3 + 4 + 3 + 4 = 24
  });

  function rollMany(n, pins) {
    for(i = 0; i < n; i++) {
      game.roll(pins);
    }
  }

  function rollSpare() {
    game.roll(5);
    game.roll(5);
  }

  function rollStrike() {
    game.roll(10);
  }
});