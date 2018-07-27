var cOpon 		= 0;
var cArate1 	= cOpon+1;
var cArate2 	= cArate1+1;
var cArate3 	= cArate2+1;
var cArate4 	= cArate3+1;
var cAlevel1 	= cArate4+1;
var cAlevel2 	= cAlevel1+1;
var cAlevel3 	= cAlevel2+1;
var cAlevel4 	= cAlevel3+1;

var cKscr		= cAlevel4+1;
var cLvl_l		= cKscr+1;
var cLvl_r		= cLvl_l+1;
var cCuv_l		= cLvl_r+1;
var cCuv_r		= cCuv_l+1;

var cAmd		= cCuv_r+1;
var cPmdsw		= cAmd+1;
var cPeg		= cPmdsw+1;

var cVels		= cPeg+1;
var cLevel		= cVels+1;
var cFblevel	= cLevel+1;
var cFbtype		= cFblevel+1;
var cRatio		= cFbtype+1;
var cFcoarse	= cRatio+1;
var cFfine		= cFcoarse+1;
var cDetune		= cFfine+1;

var strcRatio	= ['ratio','fix'];
var strcFbtype  = ['saw','squ'];
var strcCuv		= ['mlin','mexp','pexp','plin'];

function setFormOP(am)
{
	var ope = null;
	var mod = null;

	switch(am){
		case 0:
			ope = document.getElementById("op1");
			mod = document.getElementById("mod1");
			break;
		case 1:
			ope = document.getElementById("op2");
			mod = document.getElementById("mod2");
			break;
		case 2:
			ope = document.getElementById("op3");
			mod = document.getElementById("mod3");
			break;
		case 3:
			ope = document.getElementById("op4");
			mod = document.getElementById("mod4");
			break;
	}


	ope.opon.checked	= mOP[am][cOpon 	];
	
	ope.ratio.value		= strcRatio[mOP[am][cRatio	]];
	ope.freq.value 		= mOP[am][cFcoarse] +mOP[am][cFfine]<<5;
	ope.detune.value	= mOP[am][cDetune]-64;

	ope.vels.value		= mOP[am][cVels	];
	ope.level.value		= mOP[am][cLevel	];
	ope.fbtype.value	= strcFbtype[mOP[am][cFbtype]];
	ope.fblevel.value	= mOP[am][cFblevel];

	ope.rate1.value		= mOP[am][cArate1	];
	ope.rate2.value		= mOP[am][cArate2 ];
	ope.rate3.value		= mOP[am][cArate3 ];
	ope.rate4.value		= mOP[am][cArate4 ];
	ope.level1.value	= mOP[am][cAlevel1];
	ope.level2.value	= mOP[am][cAlevel2];
	ope.level3.value	= mOP[am][cAlevel3];
	ope.level4.value	= mOP[am][cAlevel4];

	mod.amd.value		= mOP[am][cAmd	];
	mod.pmd.checked		= mOP[am][cPmdsw];
	mod.peg.checked		= mOP[am][cPeg	];

	mod.kscr.value		= mOP[am][cKscr];
	mod.lvl_l.value		= mOP[am][cLvl_l];
	mod.lvl_r.value		= mOP[am][cLvl_r];
	mod.cuv_l.value		= strcCuv[mOP[am][cCuv_l]];
	mod.cuv_r.value		= strcCuv[mOP[am][cCuv_r]];

}

var mAddrOp = {
	'opon' 		:cOpon,
	'ratio'		:cRatio,
	'ffine'		:cFfine,
	'fcoarse'	:cFcoarse,
	'detune' 	:cDetune,
	'vels'   	:cVels,
	'level' 	:cLevel,
	'fbtype'	:cFbtype,
	'fblevel'	:cFblevel,
	'rate1' 	:cArate1,
	'rate2' 	:cArate2,
	'rate3' 	:cArate3,
	'rate4' 	:cArate4,
	'level1'	:cAlevel1,
	'level2'	:cAlevel2,
	'level3'	:cAlevel3,
	'level4'	:cAlevel4
};

function sendFormOp(am,e)
{
	var addr=mAddrOp[e.name];
	var data=e.valueAsNumber;

	switch(e.name){
		case 'opon':
			data = (e.checked? 1: 0);
			break;
		case 'ratio':
			data = sarchNumber(strcRatio,e.value);
			break;
		case 'detune':
			data = data +64;
			break;

		case 'fbtype':
			data = sarchNumber(strcFbtype,e.value);
			break;
	}	

	if( e.name!='freq'){
		mOP[am][addr] = data;
		sendSysExOP(am,addr,data);
	} else {
		mOP[am][cFcoarse] = data & 0x1F;
		mOP[am][cFfine] = (data >>5)&0x7F;
		addr = cFcoarse;
		sendSysExOP(am,addr,mOP[am][cFcoarse]);
		addr = cFfine;
		sendSysExOP(am,addr,mOP[am][cFfine]);
	}

	log.innerText += addr;
	log.innerText += " ";
	log.innerText += data;

}

var mAddrMod = {
	'amd'		:cAmd,
	'pmdsw'		:cPmdsw,
	'pwg'		:cPeg,
	'kscr'		:cKscr,
	'lvl_l'		:cLvl_l,
	'lvl_r'		:cLvl_r,
	'cuv_l'		:cCuv_l,
	'cuv_r'		:cCuv_r
};

function sendFormMod(am,e)
{
	var addr=mAddrMod[e.name];
	var data=e.valueAsNumber;

	if(e.name=='cuv_l' || e.name=='cuv_r'){
		data = sarchNumber(strcCuv,e.value);
	}

	sendSysExOP(am,addr,data);

}
