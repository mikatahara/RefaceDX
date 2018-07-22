
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

});

function editvalue(e){

	log.innerText = e.form.id;
	log.innerText += " ";
	log.innerText += e.name;
	log.innerText += "\n";

	switch(e.form.id){
		case 'function':
			break;
		case 'effect1':
			break;
		case 'effect2':
			break;
		case 'main':
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
			break;
		case 'mod2':
			break;
		case 'mod3':
			break;
		case 'mod4':
			break;
	}

}
