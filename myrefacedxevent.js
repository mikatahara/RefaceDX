
$(document).ready(function(){
	$('#send').click(function() {
		log.innerText = 'sendがクリックされました！';
	});

	$('#sync').click(function() {
		goload();
	});

});

function editvalue(e){

	log.innerText = e.form.id;
	log.innerText += " ";
	log.innerText += e.name;
	log.innerText += "\n";

	switch(e.form.id){
		case 'function':
			sendFormFuncion(e);
			break;
		case 'effect1':
			sendFormEffec1(e);
			break;
		case 'effect2':
			sendFormEffec2(e);
			break;
		case 'main':
			sendFormCommon(e);
			break;

		case 'op1':
			sendFormOp(0,e);
			break;
		case 'op2':
			sendFormOp(1,e);
			break;
		case 'op3':
			sendFormOp(2,e);
			break;
		case 'op4':
			sendFormOp(3,e);
			break;
		case 'mod1':
			sendFormMod(0,e);
			break;
		case 'mod2':
			sendFormMod(1,e);
			break;
		case 'mod3':
			sendFormMod(2,e);
			break;
		case 'mod4':
			sendFormMod(3,e);
			break;
	}

}
