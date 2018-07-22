
$(document).ready(function(){
	$('#send').click(function() {
		log.innerText = 'sendがクリックされました！';
	});

	$('#load').click(function() {
		goload();
	});

	$('#op2 . input[name=opon]').click(function(){
		log.innerText += "OP1";
    });

//	$('input[name="opon"]').click(function() {
//		log.innerText += "OPON";
//	});
//
	$('.op1').click( function(){
		log.innerText += "OP2";
	});

});
