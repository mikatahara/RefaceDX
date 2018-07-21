	var mVCOM=null;
	var mOP=null;

window.addEventListener("load", function(){

	runTest2();

	mVCOM  = new Int32Array(0x30);
	mOP    = new Array(4);
	mOP[0] = new Int32Array(0x20);
	mOP[1] = new Int32Array(0x20);
	mOP[2] = new Int32Array(0x20);
	mOP[3] = new Int32Array(0x20);

	for(var i=0; i<0x30; i++) mVCOM[i]=0;
	for(var i=0; i<4; i++) for(var j=0; j<0x20; j++) mOP[i][j]=0;

	var hoge = setInterval(function() {
		if (inputs != null) {
			setInputMenuID(document.input_device_select.ids);
			setOutputMenuID(document.output_device_select.ids);
			if(input_menu_id!=null){ setInputDeviceSelect();
				input.onmidimessage = handleMIDIMessage;
			}
			if(output_menu_id!=null) setOutputDeviceSelect();
			clearInterval(hoge);
		}
	}, 200);

});

function inputDeviceSelect2(e)
{
	inputDeviceSelect(e);
	input.onmidimessage = handleMIDIMessage;
}


$(document).ready(function(){
	$('#send').click(function() {
		console.log('sendがクリックされました！');
	});

	$('#load').click(function() {
		goload();
	});

	$('button').click(function() {
		console.log('クリックされました！');
	});	
});


function goload()
{
	var ex1 = [0x43,0x20,0x7f,0x1c,0x05,0x00,0x00,0x00];
	
	outSysEx(ex1,ex1.length);
}

function handleMIDIMessage( event)
{
	var length, ah, am, al;

	if( event.data[0] ==0xFE ) return;
	if( event.data[0] ==0xF8 ) return;

	if( event.data[0] ==0xF0 ){
		if( ( event.data[1] ==0x43 ) &&
			( event.data[2] ==0x00 ) &&
			( event.data[3] ==0x7F ) &&
			( event.data[4] ==0x1C ) &&
			( event.data[7] ==0x05 ) ){

			length = ((event.data[5]&0x7F)<<7) + event.data[6]&0x7F;
			ah = event.data[8] &0x7F;
			am = event.data[9]&0x7F;
			al = event.data[10]&0x7F;
			log.innerText = "Sys Ex length = "
			log.innerText += length.toString(16);
			log.innerText += " "
			log.innerText += ah.toString(16);
			log.innerText += " "
			log.innerText += am.toString(16);
			log.innerText += " "
			log.innerText += al.toString(16);

			saveMEM(event,12,ah,am,al,length);
		}
	}
}

function saveMEM(event,st,ah,am,al,length)
{
	var i;

	switch(ah){
		case 0x00:
			for(i=0; i<length; i++){
				mVCOM[i]=event.data[st+i];
			}
			setFormVCOM();
			break;
		case 0x31:
			for(i=0; i<length; i++){
				mOP[am][i]=event.data[st+i];
			}
			break;
	}
}

var cTrans 		= 0x0C;
var cPartmode 	= cTrans+1;
var cPortament	= cPartmode+1;
var cPitchbend	= cPortament+1;

var cMalg		= cPitchbend+1;	//0x10

var cWave 		= cMalg+1;
var cSpeed 		= cWave+1;
var cDelay 		= cSpeed+1;
var cPmd 		= cDelay+1;

var cMrate1		= cPmd+1;		//0x15
var cMrate2		= cMrate1+1
var cMrate3		= cMrate2+1
var cMrate4		= cMrate3+1
var cMlevel1	= cMrate4+1
var cMlevel2	= cMlevel1+1
var cMlevel3	= cMlevel2+1
var cMlevel4	= cMlevel3+1

var cEf1type	= cMlevel4+1;	//0x1D
var cEf1param1	= cEf1type+1;
var cEf1param2	= cEf1param1+1;
var cEf2type	= cEf1param2+1;
var cEf2param1	= cEf2type+1;
var cEf2param2	= cEf2param1+1;


function setFormVCOM()
{
	var fnc = document.getElementById("function");

	fnc.trans.value 	= mVCOM[cTrans];
	fnc.partmode.value	= mVCOM[cPartmode];
	fnc.portament.value = mVCOM[cPortament];
	fnc.pitchbend.value = mVCOM[cPitchbend];

	var efct1 = document.getElementById("effect1");
	efct1.type.value	= mVCOM[cEf1type];
	efct1.param1.value	= mVCOM[cEf1param1];
	efct1.param2.value	= mVCOM[cEf1param2];

	var efct2 = document.getElementById("effect2");
	efct2.type.value	= mVCOM[cEf2type];
	efct2.param1.value	= mVCOM[cEf1param2];
	efct2.param2.value	= mVCOM[cEf2param2];

	var main = document.getElementById("main");
	main.alg.value		= mVCOM[cMalg];
	main.wave.value		= mVCOM[cWave];
	main.speed.value	= mVCOM[cSpeed];
	main.delay.value	= mVCOM[cDelay];
	main.pmd.value		= mVCOM[cPmd];

	main.rate1.value	= mVCOM[cMrate1];
	main.level1.value	= mVCOM[cMlevel1];
	main.rate2.value	= mVCOM[cMrate2];
	main.level2.value	= mVCOM[cMlevel2];
	main.rate3.value	= mVCOM[cMrate3];
	main.level3.value	= mVCOM[cMlevel3];
	main.rate4.value	= mVCOM[cMrate4];
	main.level4.value	= mVCOM[cMlevel4];
}

