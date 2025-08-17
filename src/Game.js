var Game = function() {
  this._frames = [];
  this._rolls = [];
  this._currentRoll = 0;
};

Game.prototype.roll = function(pins) {
  this._rolls[this._currentRoll++] = pins;
};

Game.prototype.score = function() {
  var score = 0;
  var rollIndex = 0;
  
  for (var frameIndex = 0; frameIndex < 10; frameIndex++) {
    if (this._isStrike(rollIndex)) {
      score += 10 + this._strikeBonus(rollIndex);
      rollIndex++;
    } else if (this._isSpare(rollIndex)) {
      score += 10 + this._spareBonus(rollIndex);
      rollIndex += 2;
    } else {
      score += this._rolls[rollIndex] + this._rolls[rollIndex + 1];
      rollIndex += 2;
    }
  }
  
  return score;
};

Game.prototype._isStrike = function(rollIndex) {
  return this._rolls[rollIndex] === 10;
};

Game.prototype._isSpare = function(rollIndex) {
  return this._rolls[rollIndex] + this._rolls[rollIndex + 1] === 10;
};

Game.prototype._strikeBonus = function(rollIndex) {
  return this._rolls[rollIndex + 1] + this._rolls[rollIndex + 2];
};

Game.prototype._spareBonus = function(rollIndex) {
  return this._rolls[rollIndex + 2];
};