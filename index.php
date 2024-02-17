<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimum-scale=1, viewport-fit=cover">
    <title>Masjid Harmony Live Scoreboard</title>
    <link href="https://fonts.cdnfonts.com/css/ds-digital" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" /> 
    <link rel="stylesheet" href="styles.css?x=<?php echo strval(rand())?>">
    <script src="https://code.jquery.com/jquery-3.7.1.slim.min.js" integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous"></script>
    <script src="./longpress.js?x=<?php echo strval(rand())?>"></script>
    
</head>
<body>
    <section id="panel">
        <button id="settings-button">
            <img src="img/settings.png" alt="">
            <div id="arrowUp5" class="handY hidden"><img src="./img/arrow1.png" alt=""></div>
        </button>
        <div id="tutorials-panel" class="hidden panels">
            <p id="tutorial-wordings">Press the period to proceed to next period (i.e. 1-4).</p>
            <br>
            <section id="tutorial-buttons">
                <button id="tuts-close">CLOSE</button>
                <button id="tuts-next">NEXT</button>
            </section>
            
        </div>
        <div id="period-time-panel" class="hidden panels">
            <section>Manually edit the period time:</section>
            
            <section>
                <select name="minutes-edit" id="minutes-edit">
                </select> :

                <select name="seconds-edit" id="seconds-edit">
                </select>
            </section>
            <section id="manual-buttons">
                <button id="cancel-manual">CANCEL</button>
                <button id="set-manual">SET</button>
            </section>
        </div>
        <div id="settings-panel" class="hidden panels">
            <div id="the-settings">
                <section>SETTINGS</section>            
                <section>
                    <input type="checkbox" id="SettingCheckbox1" value="Bike">
                    <label for="SettingCheckbox1"> Synchronize game period time with shot clock time</label><br>
            
                    <!-- <p>Tips:</p> -->
                    <p>- Only click the game period time, the shot clock will do the same thing.</p>
                    <p>- if there is a foul, press game clock, it will pause both the game clock and shot clock</p>
                </section>
                <section>
                    <input type="checkbox" id="SettingCheckbox2" value="Bike">
                    <label for="SettingCheckbox2"> Pause game time and reset shot clock timer when foul is added. </label><br>
                </section>
                <section>
                    <input type="checkbox" id="SettingCheckbox3" value="Bike">
                    <label for="SettingCheckbox3"> Switch possesion/sides after a 2pt or 3pt goal is added. </label><br>
                </section>
                
                <section>
                    <input type="checkbox" id="SettingCheckbox4" value="Bike">
                    <label for="SettingCheckbox4"> Reset shot clock after a 2pt or 3pt goal is added. </label><br>
                </section>   
                <section>
                    <input type="checkbox" id="DoNotShowCheckbox2" value="Bike">
                    <label for="DoNotShowCheckbox2"> Do not show welcome dialog box at start </label><br>
                </section>
            </div>      
            <section id="setting-buttons">
                <button id="setting-button-cancel">Cancel</button>
                <button id="setting-button-apply">Apply</button>
            </section>
        </div>
        <div id="welcome-panel" class="hidden panels">
            <section>Welcome to basketball game scoreboard interface for referees!</section>
            <section>
                <input type="checkbox" id="DoNotShowCheckbox" value="Bike">
                <label for="DoNotShowCheckbox"> Do not show again</label><br><br>
            </section>
            <section id="welcome-buttons">
                <button id="welcome-dismiss">Dismiss</button>
                <button id="welcome-tutorial">Show tutorial</button>
            </section>
        </div>
        <div id="row1">
            <section id="team1-section">
                <input id="team1-name"></input>
                <span id="team1-score-box">
                    <span id="score1-value">0</span>
                    <button id="team1-button1">+3</button>
                    <button id="team1-button2">+2</button>
                    <button id="team1-button3">+1</button>
                    <button id="team1-button4">-3</button>
                    <button id="team1-button5">-2</button>
                    <button id="team1-button6">-1</button>
                    <div id="arrowUp1" class="handY hidden"><img src="./img/arrow1.png" alt=""></div>
                </span>
                <span id="team1-bonus" class="off bonux">BONUS</span>
            </section>
            <section id="center-section-row1">
                <span id="period-span">PERIOD
                    <span id="period-box">
                        <p id="period-box-value">1</p>
                        <div id="hand1" class="handY hidden"><img src="./img/hand.png" alt=""></div>
                    </span>
                </span>
                <span id="quarter-time-box">
                    <span class="" id="period-time-value">12:00</span>
                    <button id="edit-button" class="material-symbols-outlined">edit</button>
                    <button id="reset-button" class="material-symbols-outlined">device_reset</button>
                    <div id="hand2" class="handY hidden"><img src="./img/hand.png" alt=""></div>
                </span>
                <span id="position-span">
                    <div id="arrow1">◄</div>
                    <span>POSSESSION</span>
                    <div id="arrow2" class="hidden">►</div>
                    <div id="hand3" class="handY hidden"><img src="./img/hand.png" alt=""></div>
                </span>
                <!-- <span>
                    <button id="play-button" class="material-symbols-outlined">play_arrow</button>
                    <button id="clearall-button" class="material-symbols-outlined">replay</button>
                </span> -->
            </section>
            <section id="team2-section">
                <input id="team2-name"></input>
                <!-- <span id="team2-name">Team Mahdi</span> -->
                <span id="team2-score-box">
                    <span id="score2-value">0</span>
                    <button id="team2-button1">+3</button>
                    <button id="team2-button2">+2</button>
                    <button id="team2-button3">+1</button>
                    <button id="team2-button4">-3</button>
                    <button id="team2-button5">-2</button>
                    <button id="team2-button6">-1</button>
                    <div id="arrowUp2" class="handY hidden"><img src="./img/arrow1.png" alt=""></div>
                </span>
                <span id="team2-bonus" class="off">BONUS</span>
            </section>
        </div>
        <div id="row2">
            <section id="fouls1-section">FOULS
                <span id="fouls1-box">
                    <span class="" id="fouls1-value">0</span>
                    <button id="fouls1-button1">+1</button>
                    <button id="fouls1-button2">-1</button>
                    <div id="arrowUp3" class="handY hidden"><img src="./img/arrow1.png" alt=""></div>
                </span>
            </section>
            <section id="shot-clock-section">SHOT CLOCK
                <span id="shot-clock-box">
                    <span class="" id="shot-clock-value">0</span>
                    <!-- <button class="material-symbols-outlined play-button2">device_reset</button> -->
                    <button id="reset-button2" class="material-symbols-outlined">device_reset</button>
                    <div id="hand4" class="handY hidden"><img src="./img/hand.png" alt=""></div>
                </span>
            </section>
            <section id="fouls2-section">FOULS
                <span id="fouls2-box">
                    <span class="" id="fouls2-value">0</span>
                    <button id="fouls2-button1">+1</button>
                    <button id="fouls2-button2">-1</button>
                    <div id="arrowUp4" class="handY hidden"><img src="./img/arrow1.png" alt=""></div>
                </span>
            </section>
        </div>
    </section>
    <!-- <button id="clearer">Clear</button> -->
    <script src="functions.js?x=<?php echo strval(rand())?>"></script>
</body>
</html>

<!-- norm = 16
Desc = 24
A = 36
B = 56
C = 80
D = 112 -->

