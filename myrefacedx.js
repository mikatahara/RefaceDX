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

//	var fnc = document.getElementById("function");
//	fnc.trans.value	= 12;
//	var ope = document.getElementById("op1");
//	ope.opon.checked =1;
//	var vname = document.getElementById("vname");
//	vname.value = 'a';
//	vname.value += 'b';
//	vname.value += 'c';
//	vname.value += 'd';

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

function goload()
{
	var ex1 = [0x43,0x20,0x7f,0x1c,0x05,0x0e,0x0f,0x00];
	outSysEx(ex1,ex1.length);
}

function sendSysExOP(am,addr,data)
{
	var ex2 = [0x43,0x10,0x7f,0x1c,0x05,0x31,am,addr,data];
	outSysEx(ex2,ex2.length);
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

			saveMEM(event,11,ah,am,al,length);
		}
	}
}

function saveMEM(event,st,ah,am,al,length)
{
	var i;

	switch(ah){
		case 0x30:
			for(i=0; i<length; i++){
				mVCOM[i]=event.data[st+i];
			}
			setFormVCOM();
			break;
		case 0x31:
			for(i=0; i<length; i++){
				mOP[am][i]=event.data[st+i];
			}
			setFormOP(am);
			break;
	}
}

function sarchNumber(strarray,name){
	var rtn=-1;

	for(var i=0; i<strarray.length; i++){
		if(strarray[i]==name){ rtn=i; break; }
	}

	return rtn;
}


