var storedData;
var retrievedGameData;
var defaultGameData;

function calculateRemainingTime(allottedTime, startTime,ShowDecimalWhenLessthan60) {
    const currentTime = new Date();
    const elapsedSeconds = (currentTime - startTime) / 1000;
    const remainingSeconds = Math.max(allottedTime - elapsedSeconds, 0);
    if (remainingSeconds < 60) {
      if (ShowDecimalWhenLessthan60) {
        // Format the remaining time with seconds without decimals
        const formattedTime = remainingSeconds.toFixed(0);
        return formattedTime;
      } else {
        // Format the remaining time with seconds as decimals
        const formattedTime = remainingSeconds.toFixed(1);
        return formattedTime;
      }
    } else {
      // Calculate minutes and seconds
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = Math.floor(remainingSeconds % 60);
  
      // Format the remaining time as MM:SS
      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      return formattedTime;
    }
  }  

//---------------REPEATING FUNCTIONS---------------
function DisplayScoreBoardValues() {
    $("#score1-value").text(retrievedGameData.score1);
    $("#score2-value").text(retrievedGameData.score2);
    $("#fouls1-value").text(retrievedGameData.fouls1);
    $("#fouls2-value").text(retrievedGameData.fouls2); 
    $("#period-box").text(retrievedGameData.period); 
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
      var displaying = calculateRemainingTime(retrievedGameData.shotClockTime, retrievedGameData.shotClockStartTime, ShowDecimalWhenLessthan60=true);
      $("#shot-clock-value").text(displaying);
      retrievedGameData.lastTimeDisplayed2 = displaying;
    }
    else if (retrievedGameData.shotClockStarted == 2) {
      $("#shot-clock-value").text(retrievedGameData.lastTimeDisplayed2);
    }
    else {
      $("#shot-clock-value").text("24");
    }
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

//---------------Button Functions ---------------
function Team1Button1Function() {retrievedGameData.score1 = retrievedGameData.score1 + 3; DisplayScoreBoardValues();}
function Team1Button2Function() {retrievedGameData.score1 = retrievedGameData.score1 + 2; DisplayScoreBoardValues();}
function Team1Button3Function() {retrievedGameData.score1 = retrievedGameData.score1 + 1; DisplayScoreBoardValues();}
function Team1Button4Function() {retrievedGameData.score1 = retrievedGameData.score1 - 3; if (retrievedGameData.score1 < 0) {retrievedGameData.score1 = 0;} DisplayScoreBoardValues();}
function Team1Button5Function() {retrievedGameData.score1 = retrievedGameData.score1 - 2; if (retrievedGameData.score1 < 0) {retrievedGameData.score1 = 0;} DisplayScoreBoardValues();}
function Team1Button6Function() {retrievedGameData.score1 = retrievedGameData.score1 - 1; if (retrievedGameData.score1 < 0) {retrievedGameData.score1 = 0;} DisplayScoreBoardValues();}

function Team2Button1Function() {retrievedGameData.score2 = retrievedGameData.score2 + 3; DisplayScoreBoardValues();}
function Team2Button2Function() {retrievedGameData.score2 = retrievedGameData.score2 + 2; DisplayScoreBoardValues();}
function Team2Button3Function() {retrievedGameData.score2 = retrievedGameData.score2 + 1; DisplayScoreBoardValues();}
function Team2Button4Function() {retrievedGameData.score2 = retrievedGameData.score2 - 3; if (retrievedGameData.score2 < 0) {retrievedGameData.score2 = 0;} DisplayScoreBoardValues();}
function Team2Button5Function() {retrievedGameData.score2 = retrievedGameData.score2 - 2; if (retrievedGameData.score2 < 0) {retrievedGameData.score2 = 0;} DisplayScoreBoardValues();}
function Team2Button6Function() {retrievedGameData.score2 = retrievedGameData.score2 - 1; if (retrievedGameData.score2 < 0) {retrievedGameData.score2 = 0;} DisplayScoreBoardValues();}

function PeriodStart() {
  retrievedGameData.periodStartTime = new Date();
  retrievedGameData.periodStarted = 1;
  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  

  DisplayScoreBoardTimes();
}

function PeriodPause() {
  retrievedGameData.periodStarted = 2;
  retrievedGameData.pauseTime = new Date();
  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  

  DisplayScoreBoardTimes();
}

function PeriodResume() {
  retrievedGameData.periodStarted = 1;
  retrievedGameData.resumeTime = new Date();
  const timeDifference = retrievedGameData.resumeTime - retrievedGameData.pauseTime;

  retrievedGameData.periodStartTime = new Date(retrievedGameData.periodStartTime.getTime() + timeDifference);

  console.log(retrievedGameData.periodStartTime);
  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  

  DisplayScoreBoardTimes();
}

function PeriodTimeValueFunction() {
  if (retrievedGameData.periodStarted == -1) {retrievedGameData.periodStarted = 0;}
  else if (retrievedGameData.periodStarted == 0) {PeriodStart();}
  else if (retrievedGameData.periodStarted == 2) {PeriodResume();}
  else {PeriodPause();}
}

function ShotClockStart() {
  retrievedGameData.shotClockStartTime = new Date();
  retrievedGameData.shotClockStarted = 1;
  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));

  DisplayScoreBoardTimes();
}

function ShotClockPause() {
  retrievedGameData.shotClockStarted = 2;
  retrievedGameData.pauseTime2 = new Date();
  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  

  DisplayScoreBoardTimes();
}

function ShotClockResume() {
  retrievedGameData.shotClockStarted = 1;
  retrievedGameData.resumeTime2 = new Date();
  const timeDifference = retrievedGameData.resumeTime2 - retrievedGameData.pauseTime2;

  retrievedGameData.shotClockStartTime = new Date(retrievedGameData.shotClockStartTime.getTime() + timeDifference);

  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));

  DisplayScoreBoardTimes();
}

function ShotClockValueFunction() {
  if (retrievedGameData.shotClockStarted == -1) {
    retrievedGameData.shotClockStarted = 0;
  }
  else if (retrievedGameData.shotClockStarted == 0) {ShotClockStart();}
  else if (retrievedGameData.shotClockStarted == 2) {ShotClockResume();}
  else {ShotClockPause();}
}
//---------------Button Function Links---------------
$("#team1-button1").click(function() {Team1Button1Function();})
$("#team1-button2").click(function() {Team1Button2Function();})
$("#team1-button3").click(function() {Team1Button3Function();})
$("#team1-button4").click(function() {Team1Button4Function();})
$("#team1-button5").click(function() {Team1Button5Function();})
$("#team1-button6").click(function() {Team1Button6Function();})

$("#team2-button1").click(function() {Team2Button1Function();})
$("#team2-button2").click(function() {Team2Button2Function();})
$("#team2-button3").click(function() {Team2Button3Function();})
$("#team2-button4").click(function() {Team2Button4Function();})
$("#team2-button5").click(function() {Team2Button5Function();})
$("#team2-button6").click(function() {Team2Button6Function();})

$("#period-time-value").click(function() {
  PeriodTimeValueFunction();
  if ((retrievedGameData.shotClockStarted == 0) || (retrievedGameData.shotClockStarted == 2)) {}
});
$('#shot-clock-value').click(function() {ShotClockValueFunction();})

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