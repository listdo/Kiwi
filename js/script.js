let timerState = false;
let timer = 0;

function handle_button_input()
{
    timerState = !timerState;
}

function handle_reset_input()
{
    timerState = false;
    timer = 0;

    var timerField = jQuery('#timer');
    timerField.val(new Date(timer * 1000).toISOString().substr(11, 8).toString());
}

jQuery(document).ready(function() {
    
        var timerField = jQuery('#timer');
      
        function updateTime() {
            if(timerState)
            {
                timer++;       
                timerField.val(new Date(timer * 1000).toISOString().substr(11, 8).toString());              
            }
        }

        updateTime();
        setInterval(updateTime, 1000);
});
