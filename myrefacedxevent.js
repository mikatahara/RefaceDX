
$(document).ready(function(){
	$('#send').click(function() {
		log.innerText = 'sendがクリックされました！';
	});

	$('#load').click(function() {
		goload();
	});

	$('#1_opon').click(function(){
		log.innerText += "A";
    });
	$('#1_freq').change(function(){
		log.innerText += "B";
    });
	$('#1_detune').change(function(){
		log.innerText += "C";
    });
	$('#1_level').change(function(){
		log.innerText += "D";
    });
	$('#1_vels').change(function(){
		log.innerText += "E";
    });

	$('#op2').click( function(){
		log.innerText += "OP2";
	});

});
