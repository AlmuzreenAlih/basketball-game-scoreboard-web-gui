$(document).ready(function() {
    if (localStorage.getItem('gameData')) {
        var defaultGameData = {
          score1: 0,
          score2: 0,
          periodTime: 12*60,   
          periodStarted: false,
          periodStartTime: new Date(),
          shotClockTime: 24,
          fouls1: 0,
          fouls2: 0,
          possession: 1,
        };

        localStorage.setItem('gameData', JSON.stringify(defaultGameData));
      }

      var storedData = localStorage.getItem('gameData');
      var retrievedGameData = JSON.parse(storedData);
      $("#score1-value").text("10");
      $("#score2-value").text("20");
      $("#fouls1-value").text("30");
      $("#fouls2-value").text("40");
      $("#period-time-value").text("10:00");

      $("#score1-value").text(retrievedGameData.score1);
      $("#score2-value").text(retrievedGameData.score2);
      $("#fouls1-value").text(retrievedGameData.fouls1);
      $("#fouls2-value").text(retrievedGameData.fouls2);
      if (retrievedGameData.periodStarted) {
        $("#period-time-value").text(retrievedGameData.periodTime);
      }
      else {
        $("#period-time-value").text("12:00");
      }
      $("#shot-clock-value").text(retrievedGameData.shotClockTime)
});

function DisplayPeriodTime() {
    
}