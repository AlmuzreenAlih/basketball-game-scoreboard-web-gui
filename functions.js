var storedData;
var retrievedGameData;
var defaultGameData;
var buzzer = new Audio('buzzer.mp3');

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

function SaveToLocal() {
  localStorage.setItem('gameData', JSON.stringify(retrievedGameData));  
}

//---------------REPEATING FUNCTIONS---------------
function DisplayScoreBoardValues() {
    $("#score1-value").text(retrievedGameData.score1);
    $("#score2-value").text(retrievedGameData.score2);
    $("#fouls1-value").text(retrievedGameData.fouls1);
    $("#fouls2-value").text(retrievedGameData.fouls2); 
    $("#period-box-value").text(retrievedGameData.period); 
    $("#team1-name").val(retrievedGameData.team1Name);
    $("#team2-name").val(retrievedGameData.team2Name);
    if (retrievedGameData.bonus1) {
      $("#team1-bonus").removeClass("off");
    } else {
      $("#team1-bonus").addClass("off");
    }
  
    if (retrievedGameData.bonus2) {
      $("#team2-bonus").removeClass("off");
    } else {
      $("#team2-bonus").addClass("off");
    }
    // alert(retrievedGameData.possession);
    if (retrievedGameData.possession == 1) {
      $("#arrow2").addClass("hidden");
      $("#arrow1").removeClass("hidden");
    }
    else {
      $("#arrow1").addClass("hidden");
      $("#arrow2").removeClass("hidden");
    }
    SaveToLocal();  
}

function secondToMMSS(secs) {
  if (secs < 60) {
    return new Date(secs*1000).toISOString().substring(17, 19);
  }
  return new Date(secs*1000).toISOString().substring(14, 19);
}

function GetSecondsAndMinutes(secs) {
  return [new Date(secs*1000).toISOString().substring(14, 16), new Date(secs*1000).toISOString().substring(17, 19)];
}

var ShownManualEdit = false;
var Played1 = false;
var Played2 = false;

function DisplayScoreBoardTimes() {
    if (retrievedGameData.periodStarted == 1) {
        if (retrievedGameData.periodTime > 0) {
          retrievedGameData.periodTime = retrievedGameData.periodTime - 1;
          Played1 = false;
        }
        else if ((retrievedGameData.periodTime==0) && (!Played1)) {
          Played1 = true;
          buzzer.play();
        }
        SaveToLocal();  
      }

    if (retrievedGameData.shotClockStarted == 1) {
      if (retrievedGameData.shotClockTime > 0) {
        retrievedGameData.shotClockTime = retrievedGameData.shotClockTime - 1; 
        Played2 = false;
      }
      else if ((retrievedGameData.shotClockTime==0) && (!Played2)) {
        Played2 = true;
        buzzer.play();
      }
      SaveToLocal();  
    }

    var displaying = secondToMMSS(retrievedGameData.periodTime);
    $("#period-time-value").text(displaying);
    
    var displaying = secondToMMSS(retrievedGameData.shotClockTime);
    $("#shot-clock-value").text(displaying);

    if (!ShownManualEdit) { 
      let ssss, mmm, sss;
      ssss = GetSecondsAndMinutes(retrievedGameData.periodTime);
      mmm = ssss[0]; // Assigning value to mmm
      sss = ssss[1]; // Assigning value to sss
      console.log(mmm,sss);
      $("#minutes-edit").val(mmm);
      $("#seconds-edit").val(sss);
    }
    SaveToLocal();
}
function myRepeatingFunction() {
    DisplayScoreBoardTimes();
  }

  function InitializeLocalStorage() {
    if (!localStorage.getItem('gameData')) {
      defaultGameData = {
        team1Name: "Team Red",
        team2Name: "Team Blue",
        score1: 0,
        score2: 0,
        bonus1: false,
        bonus2: false,
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

        gameTimeSyncShotClock: false,
        foulSyncShotClock: false,
        goalSyncShotClock: false,
        goalSyncPossession: false,

        DoNotShowWelcomePanelAtStart: false,
        firstTime: true,
      };
  
      localStorage.setItem('gameData', JSON.stringify(defaultGameData));
    }
  
    storedData = localStorage.getItem('gameData');
    retrievedGameData = JSON.parse(storedData);
    retrievedGameData.periodStartTime = new Date((retrievedGameData.periodStartTime));
    retrievedGameData.pauseTime = new Date((retrievedGameData.pauseTime));
    retrievedGameData.resumeTime = new Date((retrievedGameData.resumeTime));

    retrievedGameData.shotClockStartTime = new Date((retrievedGameData.shotClockStartTime));
    retrievedGameData.pauseTime2 = new Date((retrievedGameData.pauseTime2));
    retrievedGameData.resumeTime2 = new Date((retrievedGameData.resumeTime2));
    
    DisplayScoreBoardValues();
    DisplayScoreBoardTimes();
  }

$(document).ready(function() {
      InitializeLocalStorage();
      InitializeSettingsPanel();

      const intervalId = setInterval(myRepeatingFunction, 1000);
      $("#period-time-value").longpress(1000, function() //Replace 4000 with your desired milliseconds
      {
        retrievedGameData.periodStarted = -1;
        console.log("pressed longly");
        SaveToLocal();  
      }, function() {
        console.log("pressed shortly");
      });

      // $("#settings-panel").hide()
      if ((!retrievedGameData.DoNotShowWelcomePanelAtStart)) {
        $("#welcome-panel").removeClass("hidden");
        $("#DoNotShowCheckbox").prop("checked", retrievedGameData.DoNotShowWelcomePanelAtStart)
        $("#DoNotShowCheckbox2").prop("checked", retrievedGameData.DoNotShowWelcomePanelAtStart)
        SaveToLocal();  
      }
});

// Define a function to handle clicks outside the settings panel
function handleClickOutsideSettingsPanel(event) {
  if (!$(event.target).closest('#settings-panel').length) {
    if (PanelShown) {
      $("#settings-panel").hide();
      setTimeout(disableClickListener,100);
      PanelShown = false; // Update PanelShown status
    }
  }
}

// Attach the event listener initially
$(document).on('click', handleClickOutsideSettingsPanel);

// Later, if you want to disable the listener
function disableClickListener() {
  $(document).off('click', handleClickOutsideSettingsPanel);
}

// To re-enable the listener
function enableClickListener() {
  $(document).on('click', handleClickOutsideSettingsPanel);
}

disableClickListener();
//---------------Button Functions ---------------
function hideAllPointers() {
  $("#hand1").addClass("hidden");
  $("#hand2").addClass("hidden");
  $("#hand3").addClass("hidden");
  $("#hand4").addClass("hidden");

  $("#arrowUp1").addClass("hidden");
  $("#arrowUp2").addClass("hidden");
  $("#arrowUp3").addClass("hidden");
  $("#arrowUp4").addClass("hidden");
}

function Team1Button1Function() {CheckPoss2(); ResetShotClock(); retrievedGameData.score1 = retrievedGameData.score1 + 3; DisplayScoreBoardValues();}
function Team1Button2Function() {CheckPoss2(); ResetShotClock(); retrievedGameData.score1 = retrievedGameData.score1 + 2; DisplayScoreBoardValues();}
function Team1Button3Function() {retrievedGameData.score1 = retrievedGameData.score1 + 1; DisplayScoreBoardValues();}
function Team1Button4Function() {retrievedGameData.score1 = retrievedGameData.score1 - 3; if (retrievedGameData.score1 < 0) {retrievedGameData.score1 = 0;} DisplayScoreBoardValues();}
function Team1Button5Function() {retrievedGameData.score1 = retrievedGameData.score1 - 2; if (retrievedGameData.score1 < 0) {retrievedGameData.score1 = 0;} DisplayScoreBoardValues();}
function Team1Button6Function() {retrievedGameData.score1 = retrievedGameData.score1 - 1; if (retrievedGameData.score1 < 0) {retrievedGameData.score1 = 0;} DisplayScoreBoardValues();}

function Team2Button1Function() {CheckPoss1(); ResetShotClock(); retrievedGameData.score2 = retrievedGameData.score2 + 3; DisplayScoreBoardValues();}
function Team2Button2Function() {CheckPoss1(); ResetShotClock(); retrievedGameData.score2 = retrievedGameData.score2 + 2; DisplayScoreBoardValues();}
function Team2Button3Function() {retrievedGameData.score2 = retrievedGameData.score2 + 1; DisplayScoreBoardValues();}
function Team2Button4Function() {retrievedGameData.score2 = retrievedGameData.score2 - 3; if (retrievedGameData.score2 < 0) {retrievedGameData.score2 = 0;} DisplayScoreBoardValues();}
function Team2Button5Function() {retrievedGameData.score2 = retrievedGameData.score2 - 2; if (retrievedGameData.score2 < 0) {retrievedGameData.score2 = 0;} DisplayScoreBoardValues();}
function Team2Button6Function() {retrievedGameData.score2 = retrievedGameData.score2 - 1; if (retrievedGameData.score2 < 0) {retrievedGameData.score2 = 0;} DisplayScoreBoardValues();}

function PeriodStart() {
  retrievedGameData.periodStarted = 1;
  SaveToLocal();  
  // DisplayScoreBoardTimes();
}

function PeriodPause() {
  retrievedGameData.periodStarted = 2;
  SaveToLocal();  
  // DisplayScoreBoardTimes();
}

function PeriodResume() {
  retrievedGameData.periodStarted = 1;
  SaveToLocal();  
  // DisplayScoreBoardTimes();
}

function PeriodTimeValueFunction() {
  if (retrievedGameData.periodStarted == -1) {
    retrievedGameData.periodStarted = 0;
  }
  else if (retrievedGameData.periodStarted == 0) {
    PeriodStart(); 
    if ((retrievedGameData.shotClockStarted == 0) && (retrievedGameData.gameTimeSyncShotClock == true)) {//Option 1
      ShotClockStart();
    }
  }
  else if (retrievedGameData.periodStarted == 2) {
    PeriodResume();
    if (((retrievedGameData.shotClockStarted==0) || (retrievedGameData.shotClockStarted==2)) && (retrievedGameData.gameTimeSyncShotClock == true)) {//Option 1
      ShotClockResume();
    }
  }

  else {
    PeriodPause();
    if ((retrievedGameData.shotClockStarted == 1) && (retrievedGameData.gameTimeSyncShotClock == true)) {//Option 1
      ShotClockPause();
    }
  }
}

function ShotClockStart() {
  retrievedGameData.shotClockStartTime = new Date();
  retrievedGameData.shotClockStarted = 1;
  SaveToLocal();

  DisplayScoreBoardTimes();
}

function ShotClockPause() {
  retrievedGameData.shotClockStarted = 2;
  retrievedGameData.pauseTime2 = new Date();
  SaveToLocal();  

  DisplayScoreBoardTimes();
}

function ShotClockResume() {
  retrievedGameData.shotClockStarted = 1;
  retrievedGameData.resumeTime2 = new Date();
  const timeDifference = retrievedGameData.resumeTime2 - retrievedGameData.pauseTime2;

  retrievedGameData.shotClockStartTime = new Date(retrievedGameData.shotClockStartTime.getTime() + timeDifference);

  SaveToLocal();

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

function InitializeSettingsPanel() {
  $("#SettingCheckbox1").prop("checked", retrievedGameData.gameTimeSyncShotClock);
  $("#SettingCheckbox2").prop("checked", retrievedGameData.foulSyncShotClock);
  $("#SettingCheckbox3").prop("checked", retrievedGameData.goalSyncPossession);
  $("#SettingCheckbox4").prop("checked", retrievedGameData.goalSyncShotClock);
  $("#DoNotShowCheckbox2").prop("checked", retrievedGameData.DoNotShowWelcomePanelAtStart);;

}

function Reset2() {
  retrievedGameData.shotClockTime = 24;
  retrievedGameData.resumeTime2 = new Date();
  if ((retrievedGameData.shotClockStarted == 2) || (retrievedGameData.shotClockStarted == 4)) {
    retrievedGameData.shotClockStartTime = new Date();
    retrievedGameData.shotClockStarted = 0;
  }
  else {
    retrievedGameData.shotClockStartTime = new Date();
  }

  SaveToLocal();
}

function ResetShotClock() {
  if (retrievedGameData.goalSyncShotClock) {
    Reset2();
  }
}

function SwitchPossesion1() {
  retrievedGameData.possession = 1;
  $("#arrow2").addClass("hidden");
  $("#arrow1").removeClass("hidden");
  SaveToLocal();
}

function SwitchPossesion2() {
  retrievedGameData.possession = 2;
  $("#arrow1").addClass("hidden");
  $("#arrow2").removeClass("hidden");
  SaveToLocal();
}

function CheckPoss1() {
  if (retrievedGameData.goalSyncPossession) {
    SwitchPossesion1();
  }
}

function CheckPoss2() {
  if (retrievedGameData.goalSyncPossession) { 
    SwitchPossesion2();
  }
}

$('#team1-name').on('input', function() {
  // This function will be triggered when the value of the input changes
  var changedValue = $(this).val(); // Get the new value of the input
  retrievedGameData.team1Name = changedValue
  SaveToLocal();  
  // console.log(changedValue);
});

$('#team2-name').on('input', function() {
  // This function will be triggered when the value of the input changes
  var changedValue = $(this).val(); // Get the new value of the input
  retrievedGameData.team2Name = changedValue;
  SaveToLocal();  
});

//---------------Button Function Links---------------
function ChangeTutorialWordings() {
  if (tuts == 0) {
    hideAllPointers();
    $("#tutorial-wordings").text("Press the period to proceed to next period (i.e. 1-4).");
    $("#hand1").removeClass("hidden");
  } else if (tuts == 1) {
    hideAllPointers();
    $("#tutorial-wordings").text("Press the game time to start or pause the game time.");
    $("#hand2").removeClass("hidden");
  } else if (tuts == 2) {
    hideAllPointers();
    $("#tutorial-wordings").text("Press the possession to switch the possession.");
    $("#hand3").removeClass("hidden");
  } else if (tuts == 3) {
    hideAllPointers();
    $("#tutorial-wordings").text("Press the shot clock time to start or pause the shot clock time.");
    $("#hand4").removeClass("hidden");
  } else if (tuts == 4) {
    hideAllPointers();
    $("#tutorial-wordings").text("Team scores has add and minus point buttons that you can use to control the score of each team. \nYou can also change each team's name.");
    $("#arrowUp1").removeClass("hidden");
    $("#arrowUp2").removeClass("hidden");
  } else if (tuts == 5) {
    hideAllPointers();
    $("#tutorial-wordings").text("Also, fouls have add and minus point buttons that you can use to control the number of fouls for each team");
    $("#arrowUp3").removeClass("hidden");
    $("#arrowUp4").removeClass("hidden");
  }
}

function WelcomeTutorialFunction() {
  $("#welcome-panel").addClass("hidden");
  $("#tutorials-panel").removeClass("hidden");
  $("#tuts-next").text("NEXT");
  $("#tuts-close").show();
  tuts = 0;
  ChangeTutorialWordings(tuts);
  retrievedGameData.DoNotShowWelcomePanelAtStart = $("#DoNotShowCheckbox").prop("checked");
  $("#DoNotShowCheckbox2").prop("checked", retrievedGameData.DoNotShowWelcomePanelAtStart);;
  SaveToLocal();  
}

$("#welcome-tutorial").click(function() {
  WelcomeTutorialFunction();
})
$("#welcome-dismiss").click(function() {
  $("#welcome-panel").addClass("hidden");
  retrievedGameData.DoNotShowWelcomePanelAtStart = $("#DoNotShowCheckbox").prop("checked");
  $("#DoNotShowCheckbox2").prop("checked", retrievedGameData.DoNotShowWelcomePanelAtStart);;
  SaveToLocal();  
  // $("#tutorials-panel").removeClass("hidden");
})

$("#tuts-close").click(function() {
  $("#tutorials-panel").hide();
  hideAllPointers();
})
let tuts = 0;
$("#tuts-next").click(function() {
  tuts++;
  ChangeTutorialWordings(tuts);

  if (tuts == 5) {$("#tuts-next").text("DONE"); 
                  $("#tuts-close").hide();}
  if (tuts == 6) {$("#tutorials-panel").hide(); hideAllPointers();}
})

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

$("#period-time-value").click(function() {PeriodTimeValueFunction();});
$('#shot-clock-value').click(function() {ShotClockValueFunction();})

$("#position-span").click(function() {
  if (retrievedGameData.possession == 1) {
    retrievedGameData.possession = 2;
  } else {
    retrievedGameData.possession = 1;
  }

  $("#arrow1").toggleClass("hidden");
  $("#arrow2").toggleClass("hidden");
})

$("#fouls1-button1").click(function() {
  retrievedGameData.fouls1 = retrievedGameData.fouls1 + 1;
  DisplayScoreBoardValues();
  if (retrievedGameData.foulSyncShotClock) {
    retrievedGameData.shotClockStarted = 0;
    PeriodPause();
    Reset2();
  }
  SaveToLocal();  
})
$("#fouls1-button2").click(function() {
  if (retrievedGameData.fouls1 > 0) {
    retrievedGameData.fouls1 = retrievedGameData.fouls1 - 1;
  }
  DisplayScoreBoardValues();
  SaveToLocal();  
})

// $('label').click(function() {
//   alert("label");
// });

$("#fouls2-button1").click(function() {
  retrievedGameData.fouls2 = retrievedGameData.fouls2 + 1;
  DisplayScoreBoardValues();
  if (retrievedGameData.foulSyncShotClock) {
    retrievedGameData.shotClockStarted = 0;
    PeriodPause();
    Reset2();
  }
  SaveToLocal();  
})
$("#fouls2-button2").click(function() {
  if (retrievedGameData.fouls2 > 0) {
    retrievedGameData.fouls2 = retrievedGameData.fouls2 - 1;
  }
  DisplayScoreBoardValues();
  SaveToLocal();  
})

$("#period-box").click(function() {
  if (retrievedGameData.period < 4) {
    retrievedGameData.period++;
  }
  else {
    retrievedGameData.period = 1;
  }
  SaveToLocal();  
  $("#period-box-value").text(retrievedGameData.period);
  localStorage.clear();
})

$("#settings-button").click(function() {
  $("#settings-panel").removeClass("hidden"); 
  $("#settings-panel").show()
  PanelShown = true; 
  setTimeout(enableClickListener,100);
})
$("#setting-button-cancel").click(function() {
  $("#settings-panel").hide(); setTimeout(disableClickListener,100);
})

$("#setting-button-apply").click(function() {
  $("#settings-panel").hide()
  retrievedGameData.gameTimeSyncShotClock = $("#SettingCheckbox1").prop("checked");
  retrievedGameData.foulSyncShotClock = $("#SettingCheckbox2").prop("checked");
  retrievedGameData.goalSyncPossession = $("#SettingCheckbox3").prop("checked");
  retrievedGameData.goalSyncShotClock = $("#SettingCheckbox4").prop("checked");
  retrievedGameData.DoNotShowWelcomePanelAtStart = $("#DoNotShowCheckbox2").prop("checked");
  SaveToLocal();
  setTimeout(disableClickListener,100);
});

$("#reset-button").click(function() {
  retrievedGameData.periodTime = 12*60;
  retrievedGameData.resumeTime = new Date();
  if ((retrievedGameData.periodStarted == 2) || (retrievedGameData.periodStarted == 4)) {
    retrievedGameData.periodStartTime = new Date();
    retrievedGameData.periodStarted = 0;
  }
  else {
    retrievedGameData.periodStartTime = new Date();
  }

  SaveToLocal();
})

$("#reset-button2").click(function() {
  Reset2();
})

// $("#team1-button1").width($("#team1-button1").height());
// $("#team1-button2").width($("#team1-button2").height());
// $("#team1-button3").width($("#team1-button3").height());
// $("#team1-button4").width($("#team1-button4").height());
// $("#team1-button5").width($("#team1-button5").height());
// $("#team1-button6").width($("#team1-button6").height());

// $("#team1-score-box").css("height",6.5 * $("#team1-button6").height());

$("#clearer").click(function() {
  localStorage.clear();
  InitializeLocalStorage();
  InitializeSettingsPanel();
  retrievedGameData.DoNotShowWelcomePanelAtStart = false;
  hideAllPointers();
  $("#settings-panel").addClass("hidden");
  $("#tutorials-panel").addClass("hidden");
  if ((!retrievedGameData.DoNotShowWelcomePanelAtStart)) {
    $("#welcome-panel").removeClass("hidden");
    $("#DoNotShowCheckbox").prop("checked", retrievedGameData.DoNotShowWelcomePanelAtStart);
    $("#DoNotShowCheckbox2").prop("checked", retrievedGameData.DoNotShowWelcomePanelAtStart);
    SaveToLocal();  
  }
  // alert("Clearing Successful");
})

var minutesSelect = $('#minutes-edit');
for (var i = 0; i <= 12; i++) {
  var paddedValue = i.toString().padStart(2, '0');
  minutesSelect.append($('<option>', { 
    value: paddedValue,
    text : paddedValue 
  }));
}

var secondsSelect = $('#seconds-edit');
for (var i = 0; i <= 59; i++) {
  var paddedValue = i.toString().padStart(2, '0');
  secondsSelect.append($('<option>', { 
    value: paddedValue,
    text : paddedValue 
  }));
}

$("#edit-button").click(function() {
  $("#period-time-panel").removeClass("hidden");
  ShownManualEdit = true;
})

$("#cancel-manual").click(function() {
  $("#period-time-panel").addClass("hidden");
  ShownManualEdit = false;
})

$("#set-manual").click(function() {
  let gm = parseInt($("#minutes-edit").val());
  let gs = parseInt($("#seconds-edit").val());
  // console.log(fg,fg2);
  let gts = gm*60 + gs;
  retrievedGameData.periodTime = gts;
  SaveToLocal();  
  $("#period-time-panel").addClass("hidden");
  ShownManualEdit = false;
})

$("#team1-bonus").click(function() {
  if (retrievedGameData.bonus1) {
    retrievedGameData.bonus1 = false;
  } else {
    retrievedGameData.bonus1 = true;
  }
  SaveToLocal(); 
  DisplayScoreBoardValues(); 
})

$("#team2-bonus").click(function() {
  if (retrievedGameData.bonus2) {
    retrievedGameData.bonus2 = false;
  } else {
    retrievedGameData.bonus2 = true;
  }
  SaveToLocal();  
  DisplayScoreBoardValues(); 
})