var Frame = function(rolls) {
  this.MAX_SCORE = 10;
  this.rolls = rolls || [];
};

Frame.prototype.total = function(nextFrame, afterNextFrame) {
  var score = this._rollScore();
  
  if (this._isFinalFrame()) {
    return score; // Final frame doesn't get bonus from next frames
  }
  
  if (this._isStrike()) {
    score += this._getStrikeBonus(nextFrame, afterNextFrame);
  } else if (this._isSpare()) {
    score += this._getSpareBonus(nextFrame);
  }
  
  return score;
};

Frame.prototype._rollScore = function() {
  return this.rolls.reduce(function(score, roll) {
    return score + roll;
  }, 0);
};

Frame.prototype._isSpare = function() {
  return !this._isStrike() && this._rollScore() === this.MAX_SCORE;
};

Frame.prototype._isStrike = function() {
  return this.rolls[0] === this.MAX_SCORE;
};

Frame.prototype._isFinalFrame = function() {
  return this.rolls.length === 3;
};

Frame.prototype._getSpareBonus = function(nextFrame) {
  if (!nextFrame) return 0;
  return nextFrame.rolls[0] || 0;
};

Frame.prototype._getStrikeBonus = function(nextFrame, afterNextFrame) {
  if (!nextFrame) return 0;
  
  if (nextFrame._isStrike()) {
    // Next frame is a strike, need one more roll
    if (nextFrame._isFinalFrame()) {
      // Next frame is final frame, use its second roll
      return 10 + (nextFrame.rolls[1] || 0);
    } else if (afterNextFrame) {
      // Use the strike from next frame plus first roll of frame after
      return 10 + (afterNextFrame.rolls[0] || 0);
    } else {
      return 10; // Only have the strike from next frame
    }
  } else {
    // Next frame is not a strike, use both its rolls
    return (nextFrame.rolls[0] || 0) + (nextFrame.rolls[1] || 0);
  }
};

// Legacy methods for backward compatibility
Frame.prototype._spareBonus = function() {
  return this.rolls[0] || 0;
};

Frame.prototype._strikeBonus = function(nextFrame, afterNextFrame) {
  return this._getStrikeBonus(nextFrame, afterNextFrame);
};

Frame.prototype._firstRoll = function() {
  return this.rolls[0] || 0;
};
