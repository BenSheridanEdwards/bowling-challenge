var Interface = function() {
  this.game = new Game();
  this.currentRoll = 0;
  this.currentFrame = 1;
  this.isGameComplete = false;
};

Interface.prototype.init = function() {
  var self = this;
  
  // Handle form submission
  $('form').on('submit', function(e) {
    e.preventDefault();
    self.calculateScore();
  });
  
  // Handle individual input changes for real-time updates
  $('input[type="text"]').on('input', function() {
    self.updateScoreDisplay();
  });
  
  this.createScoreDisplay();
};

Interface.prototype.calculateScore = function() {
  this.game = new Game(); // Reset game
  var inputs = this.getAllInputs();
  var rolls = this.parseRolls(inputs);
  
  // Add all rolls to the game
  for (var i = 0; i < rolls.length; i++) {
    if (rolls[i] !== null && rolls[i] !== undefined && rolls[i] !== '') {
      this.game.roll(parseInt(rolls[i]) || 0);
    }
  }
  
  var totalScore = this.game.score();
  this.displayFinalScore(totalScore);
};

Interface.prototype.getAllInputs = function() {
  var inputs = {};
  
  // Get player name
  inputs.name = $('input[name="Name"]').val();
  
  // Get all frame rolls
  for (var frame = 1; frame <= 9; frame++) {
    inputs['F' + frame + 'R1'] = $('input[name="F' + frame + 'R1"]').val();
    inputs['F' + frame + 'R2'] = $('input[name="F' + frame + 'R2"]').val();
  }
  
  // Get 10th frame (special case - can have 3 rolls)
  inputs.F10R1 = $('input[name="F10R1"]').val();
  inputs.F10R2 = $('input[name="F10R2"]').val();
  inputs.F10R3 = $('input[name="F10R3"]').val();
  
  return inputs;
};

Interface.prototype.parseRolls = function(inputs) {
  var rolls = [];
  
  // Process frames 1-9
  for (var frame = 1; frame <= 9; frame++) {
    var roll1 = inputs['F' + frame + 'R1'];
    var roll2 = inputs['F' + frame + 'R2'];
    
    if (roll1 !== '' && roll1 !== null && roll1 !== undefined) {
      var roll1Val = parseInt(roll1) || 0;
      rolls.push(roll1Val);
      
      // If it's a strike, don't add second roll
      if (roll1Val === 10) {
        continue;
      }
      
      // Add second roll if it exists
      if (roll2 !== '' && roll2 !== null && roll2 !== undefined) {
        rolls.push(parseInt(roll2) || 0);
      }
    }
  }
  
  // Process 10th frame (special handling)
  if (inputs.F10R1 !== '' && inputs.F10R1 !== null && inputs.F10R1 !== undefined) {
    rolls.push(parseInt(inputs.F10R1) || 0);
  }
  if (inputs.F10R2 !== '' && inputs.F10R2 !== null && inputs.F10R2 !== undefined) {
    rolls.push(parseInt(inputs.F10R2) || 0);
  }
  if (inputs.F10R3 !== '' && inputs.F10R3 !== null && inputs.F10R3 !== undefined) {
    rolls.push(parseInt(inputs.F10R3) || 0);
  }
  
  return rolls;
};

Interface.prototype.createScoreDisplay = function() {
  var scoreDisplay = '<div id="scoreDisplay" style="margin-top: 20px; padding: 20px; background: white; border-radius: 5px;">' +
    '<h2>Scorecard</h2>' +
    '<div id="frameScores" style="display: flex; gap: 10px; margin-bottom: 20px;"></div>' +
    '<div id="totalScore" style="font-size: 24px; font-weight: bold; text-align: center;"></div>' +
    '</div>';
  
  $('section').append(scoreDisplay);
  this.updateScoreDisplay();
};

Interface.prototype.updateScoreDisplay = function() {
  var inputs = this.getAllInputs();
  var frameScoresHtml = '';
  
  // Display frame by frame scores
  for (var frame = 1; frame <= 10; frame++) {
    var frameHtml = '<div style="border: 1px solid #ccc; padding: 10px; text-align: center; min-width: 60px;">';
    frameHtml += '<div style="font-weight: bold;">Frame ' + frame + '</div>';
    
    if (frame <= 9) {
      var roll1 = inputs['F' + frame + 'R1'] || '-';
      var roll2 = inputs['F' + frame + 'R2'] || '-';
      
      // Display strikes and spares properly
      if (parseInt(roll1) === 10) {
        frameHtml += '<div>X | -</div>';
      } else if (parseInt(roll1) + parseInt(roll2) === 10 && roll2 !== '' && roll2 !== '-') {
        frameHtml += '<div>' + roll1 + ' | /</div>';
      } else {
        frameHtml += '<div>' + roll1 + ' | ' + roll2 + '</div>';
      }
    } else {
      // 10th frame special display
      var roll1 = inputs.F10R1 || '-';
      var roll2 = inputs.F10R2 || '-';
      var roll3 = inputs.F10R3 || '-';
      frameHtml += '<div>' + roll1 + ' | ' + roll2 + ' | ' + roll3 + '</div>';
    }
    
    frameHtml += '</div>';
    frameScoresHtml += frameHtml;
  }
  
  $('#frameScores').html(frameScoresHtml);
};

Interface.prototype.displayFinalScore = function(score) {
  var inputs = this.getAllInputs();
  var playerName = inputs.name || 'Player';
  
  $('#totalScore').html(
    '<div style="color: #333;">' + playerName + '\'s Total Score: <span style="color: #e74c3c;">' + score + '</span></div>'
  );
  
  // Add some celebration for perfect games
  if (score === 300) {
    $('#totalScore').append('<div style="color: #27ae60; font-size: 18px; margin-top: 10px;">🎉 PERFECT GAME! 🎉</div>');
  } else if (score === 0) {
    $('#totalScore').append('<div style="color: #f39c12; font-size: 18px; margin-top: 10px;">Gutter Game - Better luck next time!</div>');
  }
};