$(function(){
   // variables
        // App mode
        var mode = false;
        // time counter
        var time_counter = 0;
        // lap counter
        var lap_counter = 0;
        // variable for setInterval
        var action;
        // Number of Laps
        var laps = 0;
        // minutes, seconds, centiseconds for time and lap 
        var min_t, sec_t,centsec_t =0;
        var min_l,sec_l, centsec_l = 0;
    
        // On App load show start and lap buttons
         hideshowButtons("#startButton","#lapButton");

        // click on startButton
            $("#startButton").click(function(){
                 // mode on
                mode = true;
                 // show stop and lap buttons
                 hideshowButtons("#stopButton","#lapButton");
                 // start counter
                startCounter();
            });
     
        // click on stopButton
          $("#stopButton").click(function(){
            // show resume and reset buttons
                hideshowButtons("#resumeButton","#resetButton");
            // stop counter
              stopCounter();
          });
    
        // click on resumeButton
             $("#resumeButton").click(function(){
                 // show stop and lap buttons
                  hideshowButtons("#stopButton","#lapButton");
                 // start counter
                 startCounter();
             });
    
        // click on resetButton
            $("#resetButton").click(function(){
            // reload the page
             location.reload();    
            });
    
        // click on lapButton
            $("#lapButton").click(function(){
            // if mode is ON
                if(mode){
                    // stop counter
                    stopCounter();
                     // resetLap and print lap details
                    lap_counter = 0;
                    addLap();
                     // start counter
                        startCounter();
                }
            });
    
// FUNCTIONS
// start the counter    
function startCounter(){
    action = setInterval(function(){
    time_counter++;
        if(time_counter == 100*60*100){
            time_counter = 0;
        }
    lap_counter++;
        if(lap_counter == 100 * 60 * 100){
            lap_counter = 0;
        }
    updateTime();    
    }, 10);
   
}    
function stopCounter(){
        clearInterval(action);
} 
    
//   shows two buttons where are x and y  
function hideshowButtons(x, y){
    // clear all buttons
    $(".control").hide();
    // show buttons where x and y id's
    $(x).show();
    $(y).show();
}
    
// converts counters to min, sec, centisec
function updateTime(){
    // 1min = 60 * 100centiseconds = 6000 centiseconds
    min_t = Math.floor(time_counter/ 6000);
    // 1 sec = 100centiseconds
    sec_t =  Math.floor((time_counter%6000)/100);
    centsec_t = (time_counter%6000)%100;
        $("#timeminute").text(format(min_t));
        $("#timesecond").text(format(sec_t));
        $("#timecentisecond").text(format(centsec_t));
        
    // 1min = 60 * 100centiseconds = 6000 centiseconds
    min_l = Math.floor(lap_counter/ 6000);
    // 1 sec = 100centiseconds
    sec_l =  Math.floor((lap_counter%6000)/100);
    centsec_l = (lap_counter%6000)%100;
        $("#lapminute").text(format(min_l));
        $("#lapsecond").text(format(sec_l));
        $("#lapcentisecond").text(format(centsec_l));
    
}  

// format numbers
function format(number){
    if(number<10){
        return'0' + number;
    }else{
        return number;
    }
}    
 
// print lap details inside the lap box
function addLap(){
    laps++;
    var laptimer = format(min_t) + ":" + format(sec_t) + ":" + format(centsec_t);
    var myLapDetails = 
        '<div class="lap">'+
            '<div class="laptimetitle">'+
                'Lap'+ laps +
            '</div>'+
              '<div class="laptime">'+
                 '<span>' + laptimer + '</span>'
            '</div>'
        '</div>';
    $(myLapDetails).prependTo("#laps");
}   
});