
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

var strPartmode = ['poly','full','legto'];
var strcEftype  = ['thru','dist','twah','cho','fla','pha','dly','rev'];
var strcWave    = ['sin','tri','sawu','sawd','squ','sh8','sh'];

function setFormVCOM()
{
	var vname = document.getElementById("vname");
	vname.value = '';
	for(var i=0; i<10; i++) vname.value += String.fromCharCode(mVCOM[i]);

	var fnc = document.getElementById("function");

	fnc.trans.value 	= mVCOM[cTrans]-64;
	fnc.partmode.value	= strPartmode[mVCOM[cPartmode]];
	fnc.portament.value = mVCOM[cPortament];
	fnc.pitchbend.value = mVCOM[cPitchbend]-64;

	var efct1 = document.getElementById("effect1");
	efct1.type.value	= strcEftype[mVCOM[cEf1type]];
	efct1.param1.value	= mVCOM[cEf1param1];
	efct1.param2.value	= mVCOM[cEf1param2];

	var efct2 = document.getElementById("effect2");
	efct2.type.value	= strcEftype[mVCOM[cEf2type]];
	efct2.param1.value	= mVCOM[cEf1param2];
	efct2.param2.value	= mVCOM[cEf2param2];

	var main = document.getElementById("main");
	main.alg.value		= mVCOM[cMalg]+1;
	main.wave.value		= strcWave[mVCOM[cWave]];
	main.speed.value	= mVCOM[cSpeed];
	main.delay.value	= mVCOM[cDelay];
	main.pmd.value		= mVCOM[cPmd];

	main.rate1.value	= mVCOM[cMrate1];
	main.level1.value	= mVCOM[cMlevel1]-64;
	main.rate2.value	= mVCOM[cMrate2];
	main.level2.value	= mVCOM[cMlevel2]-64;
	main.rate3.value	= mVCOM[cMrate3];
	main.level3.value	= mVCOM[cMlevel3]-64;
	main.rate4.value	= mVCOM[cMrate4];
	main.level4.value	= mVCOM[cMlevel4]-64;
}


var mAddrFunction = {
	'trans'			:cTrans,
	'partmode'		:cPartmode,
	'porrtament'	:cPortament,
	'pitchbend'		:cPitchbend,
};

function sendFormFunction(e)
{
	var addr=mAddrFunction[e.name];
	var data=e.valueAsNumber;

	switch(e.name){
		case 'trans':
			data += 64;
			break;
		case 'partmode':
			data = sarchNumber(strPartmode,e.value);
			break;
		case 'pitchbend':
			data += 64;
			break;
	}

	sendSysExFunction(addr,data);
}

