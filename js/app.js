let timerState = false;
let timer = Number(0);
let counter = Number(1);
let tasks = new Object();

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

function handle_add_time_task_input(task_name)
{
    tasks[task_name] += Number(timer);

    let field_name = "#" + task_name + "_time";
    jQuery(field_name).html(new Date(tasks[task_name] * 1000).toISOString().substr(11, 8).toString());
}

function handle_add_task_input()
{
    let task_name = jQuery('#task_text').val();

    if(task_name && tasks[task_name] == undefined)
    {
        tasks[task_name] = Number(0)
        jQuery('#tasks-table tr:last').after('<tr><td id="' + task_name + "_name" + '">' + task_name + '</td><td id="' + task_name+"_time" + '">' + tasks[task_name] + '</td><td>' + '<input type="button" value="+" onclick="handle_add_time_task_input(\''+task_name+'\')"/>' + '</td></tr>');               
    }
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