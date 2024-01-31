var storedData;
var retrievedGameData;
var defaultGameData;

function calculateRemainingTime(allottedTime, startTime) {
    // Calculate the current time
    const currentTime = new Date();
  
    // Calculate the elapsed time in seconds
    const elapsedSeconds = (currentTime - startTime) / 1000;
  
    // Calculate the remaining time in seconds
    const remainingSeconds = Math.max(allottedTime - elapsedSeconds, 0);
  
    // Check if remainingSeconds is less than 60
    if (remainingSeconds < 60) {
      // Format the remaining time with seconds as decimals
      const formattedTime = remainingSeconds.toFixed(1);
      return formattedTime;
    } else {
      // Calculate minutes and seconds
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = Math.floor(remainingSeconds % 60);
  
      // Format the remaining time as MM:SS
      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      return formattedTime;
    }
  }  

function DisplayScoreBoardValues() {
    $("#score1-value").text(retrievedGameData.score1);
    $("#score2-value").text(retrievedGameData.score2);
    $("#fouls1-value").text(retrievedGameData.fouls1);
    $("#fouls2-value").text(retrievedGameData.fouls2); 
    $("#period-box").text(retrievedGameData.period); 
    $("#shot-clock-value").text(retrievedGameData.shotClockTime)
    localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
}

function DisplayScoreBoardTimes() {
    if ((retrievedGameData.periodStarted == 1) || 
        (retrievedGameData.periodStarted == 1)) {
        if (typeof(retrievedGameData.periodStartTime)=="string") {
            retrievedGameData.periodStartTime = new Date(retrievedGameData.periodStartTime);
        }
        var displaying = calculateRemainingTime(retrievedGameData.periodTime, retrievedGameData.periodStartTime);
        $("#period-time-value").text(displaying);
        retrievedGameData.lastTimeDisplayed = displaying;
        localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  

      }
    else if (retrievedGameData.periodStarted == 2) {
      $("#period-time-value").text(retrievedGameData.lastTimeDisplayed);
    }
    else {
      $("#period-time-value").text("12:00");
    }
    
    if (retrievedGameData.shotClockStarted == 1) {
      var displaying = calculateRemainingTime(retrievedGameData.shotClockTime, retrievedGameData.shotClockStartTime);
      $("#shot-clock-value").text(displaying);
    }

    // $("#shot-clock-value").text(retrievedGameData.shotClockTime);
    localStorage.setItem('gameData', JSON.stringify(retrievedGameData));
}
function myRepeatingFunction() {
    DisplayScoreBoardTimes();
    console.log("whut")
  }
 
$(document).ready(function() {
    if (!localStorage.getItem('gameData')) {
        defaultGameData = {
          score1: 0,
          score2: 0,
          period: 1,
          periodTime: 12*60,   
          periodStarted: 0,
          periodStartTime: new Date(),
          lastTimeDisplayed: "12:00",
          shotClockTime: 24,
          shotClockStarted: 0,
          shotClockStartTime: new Date(),
          fouls1: 0,
          fouls2: 0,
          possession: 1,
        };

        localStorage.setItem('gameData', JSON.stringify(defaultGameData));
      }

      storedData = localStorage.getItem('gameData');
      retrievedGameData = JSON.parse(storedData);
      console.log(retrievedGameData);
      DisplayScoreBoardValues();
      DisplayScoreBoardTimes();

      const intervalId = setInterval(myRepeatingFunction, 100);


      $("#period-time-value").longpress(1000, function() //Replace 4000 with your desired milliseconds
      {
        retrievedGameData.periodStarted = -1;
        console.log("pressed longly");
        localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
      }, function() {
        console.log("pressed shortly");
      });
});

$("#team1-button1").click(function() {
    retrievedGameData.score1 = retrievedGameData.score1 + 3;
    DisplayScoreBoardValues();
})
$("#team1-button2").click(function() {
    retrievedGameData.score1 = retrievedGameData.score1 + 2;
    DisplayScoreBoardValues();
})
$("#team1-button3").click(function() {
    retrievedGameData.score1 = retrievedGameData.score1 + 1;
    DisplayScoreBoardValues();
})
$("#team1-button4").click(function() {
    retrievedGameData.score1 = retrievedGameData.score1 - 3;
    if (retrievedGameData.score1 < 0) {retrievedGameData.score1 = 0;}
    DisplayScoreBoardValues();
})
$("#team1-button5").click(function() {
    retrievedGameData.score1 = retrievedGameData.score1 - 2;
    if (retrievedGameData.score1 < 0) {retrievedGameData.score1 = 0;}
    DisplayScoreBoardValues();
})
$("#team1-button6").click(function() {
    retrievedGameData.score1 = retrievedGameData.score1 - 1;
    if (retrievedGameData.score1 < 0) {retrievedGameData.score1 = 0;}
    DisplayScoreBoardValues();
})
$("#period-time-value").click(function() {
    if (retrievedGameData.periodStarted == -1) {
      retrievedGameData.periodStarted = 0;
    }
    else if (retrievedGameData.periodStarted == 0) {
      retrievedGameData.periodStartTime = new Date();
      retrievedGameData.periodStarted = 1;
      localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
    }
    else if (retrievedGameData.periodStarted == 2) {
      retrievedGameData.periodStarted = 1;
      retrievedGameData.resumeTime = new Date();
            // Assuming retrievedGameData.resumeTime, retrievedGameData.pauseTime, and retrievedGameData.periodStartTime are Date objects
      const timeDifference = retrievedGameData.resumeTime - retrievedGameData.pauseTime;

      // Calculate the new periodStartTime
      retrievedGameData.periodStartTime = new Date(retrievedGameData.periodStartTime.getTime() + timeDifference);

      console.log(retrievedGameData.periodStartTime);
      localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
    }
    else {
      retrievedGameData.periodStarted = 2;
      retrievedGameData.pauseTime = new Date();
      localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
    }
    DisplayScoreBoardTimes();
});

$('#shot-clock-value').click(function() {
  retrievedGameData.shotClockStartTime = new Date();
  retrievedGameData.shotClockStarted = 1;
  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
  console.log("clicked");
  DisplayScoreBoardTimes();
})

$("#position-span").click(function() {
  $("#arrow1").toggleClass("hidden");
  $("#arrow2").toggleClass("hidden");
})

$("#fouls1-button1").click(function() {
  retrievedGameData.fouls1 = retrievedGameData.fouls1 + 1;
  DisplayScoreBoardValues();
  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
})
$("#fouls1-button2").click(function() {
  if (retrievedGameData.fouls1 > 0) {
    retrievedGameData.fouls1 = retrievedGameData.fouls1 - 1;
  }
  DisplayScoreBoardValues();
  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
})
$("#period-box").click(function() {
  if (retrievedGameData.period < 4) {
    retrievedGameData.period++;
  }
  else {
    retrievedGameData.period = 1;
  }
  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
  $("#period-box").text(retrievedGameData.period);
  localStorage.clear();
})

$("#team1-button1").width($("#team1-button1").height());
$("#team1-button2").width($("#team1-button2").height());
$("#team1-button3").width($("#team1-button3").height());
$("#team1-button4").width($("#team1-button4").height());
$("#team1-button5").width($("#team1-button5").height());
$("#team1-button6").width($("#team1-button6").height());

// $("#team1-score-box").css("height",6.5 * $("#team1-button6").height());

$("#clearer").click(function() {
  localStorage.clear();
  if (!localStorage.getItem('gameData')) {
    defaultGameData = {
      score1: 0,
      score2: 0,
      period: 1,
      periodTime: 12*60,   
      periodStarted: 0,
      periodStartTime: new Date(),
      lastTimeDisplayed: "12:00",
      shotClockTime: 24,
      shotClockStarted: 0,
      shotClockStartTime: new Date(),
      fouls1: 0,
      fouls2: 0,
      possession: 1,
    };

    localStorage.setItem('gameData', JSON.stringify(defaultGameData));
  }

  storedData = localStorage.getItem('gameData');
  retrievedGameData = JSON.parse(storedData);
  console.log(retrievedGameData);
  DisplayScoreBoardValues();
  DisplayScoreBoardTimes();

  const intervalId = setInterval(myRepeatingFunction, 100);


  $("#period-time-value").longpress(1000, function() //Replace 4000 with your desired milliseconds
  {
    retrievedGameData.periodStarted = -1;
    console.log("pressed longly");
    localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
  }, function() {
    console.log("pressed shortly");
  });
  alert("cleared");

})