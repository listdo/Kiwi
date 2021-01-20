let timerState = false;
let timer = Number(0);
let counter = Number(1);

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('service worker registered'))
      .catch(err => console.log('service worker not registered', err));
}

function handle_button_input()
{
    timerState = !timerState;

    let btnContent = "";

    if(timerState)
        btnContent = "Pause ❚❚";    
    else
        btnContent="Play ►";

    jQuery('#start_btn').prop('value', btnContent);   
}

function handle_reset_input()
{
    timerState = false;
    timer = 0;

    window.localStorage.setItem('currentTimer', timer);
    setDefault();
}

function handle_count_mode(checkbox)
{
    counter *= -1;
}

function setDefault()
{
    var timerField = jQuery('#timer');

    if(window.localStorage.getItem('currentTimer'))
    {
        timer = window.localStorage.getItem('currentTimer');
        timerField.val(new Date(timer * 1000).toISOString().substr(11, 8).toString());
    }      
    else
        timerField.val(new Date(0 * 1000).toISOString().substr(11, 8).toString());
}

jQuery(document).ready(function() {
    setDefault();
    var timerField = jQuery('#timer');
    
    function updateTime() {
        if(timerState && Number(timer) + Number(counter) >= 0)
        {
            timer = Number(timer) + Number(counter);

            timerField.val(new Date(timer * 1000).toISOString().substr(11, 8).toString());        
            window.localStorage.setItem('currentTimer', timer);            
        }
    }

    updateTime();
    setInterval(updateTime, 1000);
});

document.onkeypress = function (event) {
    event = event || window.event;

    if(event.keyCode === 43)
        timer += 60;      

    if(event.keyCode === 45)
        timer = (timer >= 60) ? timer - 60 : 0;
};