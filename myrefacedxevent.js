
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
			sendFormFunction(e);
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

/* パラメータファイルの保存 */
function savedata()
{
	var i, k;
	var savetext='';

	savetext += "__start__";
	savetext +="\r\n";

	for(i=0; i<0x30; i++){
		savetext += mVCOM[i].toString(10);
		savetext += " ";
	}
	savetext +="\r\n";

	for(k=0; k<4; i++){
		for(i=0; i<0x20; i++){
			savetext += mOP[k][i].toString(10);
			savetext += " ";
		}
		savetext +="\r\n";
	}

	savetext += "__end__";
	savetext +="\r\n";

	var fn=document.getElementById("file_name");
	var fname=fn.value;
	var psave = new Blob([savetext]);
	download(psave, fname);
}

/* パラメータファイルの読み込み*/
function loaddata()
{
	var textFile = document.getElementById("filedata").files[0];

	// 選択されたファイル情報
	log.innerText = "ファイル名：";
	log.innerText += textFile.name;
	log.innerText += "\n";
	log.innerText += "ファイルサイズ：";
	log.innerText += textFile.size;
	log.innerText += " バイト\n";
	log.innerText += "MIME Type：";
	log.innerText += textFile.type;
	log.innerText += "\n";
	log.innerText += "---------------\n";

	// テキストかどうか調べる
	if (textFile.type.indexOf("text/") != 0){
		ele.innerHTML += "選択したファイルはテキスト形式ではありません";
		return;
	}

	// テキストファイルなら処理を行う
	var reader = new FileReader();
	reader.onload = function(event){
		readresult(event.target.result);
	}
	reader.readAsText(textFile, "utf-8");

}

function readresult(text){
	var i=0, kk=0, flag=0;
	var chank=null;
	var imenu=null;
	var data;

	log.textContent += text;

	seq_stop();

	while(1){
		chank = text.substr(i,7);
		data=parseInt(text.substr(i+8,3));
		log.textContent += data;
		log.textContent += "\n";

		kk=0;
		flag=0;

		if(!chank.localeCompare("tempo__")) {
			imenu = document.getElementById("tempo");
			imenu.value = data;
			tempo = data;
			beatx = Math.floor(60000/tempo/8);
		}

		else if(!chank.localeCompare("tone__0")) {
			imenu = document.getElementById("tone0");
			flag=1;
			kk=0;
		}
		else if(!chank.localeCompare("tone__1")){
			imenu = document.getElementById("tone1");
			flag=1;
			kk=1;
		}
		else if(!chank.localeCompare("tone__2")){
			imenu = document.getElementById("tone2");
			flag=1;
			kk=2;
		}
		else if(!chank.localeCompare("tone__3")){
			imenu = document.getElementById("tone3");
			flag=1;
			kk=3;
		}

		else if(!chank.localeCompare("volume0")){
			imenu = document.getElementById("volume0");
			flag=2;
			kk=0;
		}
		else if(!chank.localeCompare("volume1")){
			imenu = document.getElementById("volume1");
			flag=2;
			kk=1;
		}
		else if(!chank.localeCompare("volume2")){
			imenu = document.getElementById("volume2");
			flag=2;
			kk=2;
		}
		else if(!chank.localeCompare("volume3")){
			imenu = document.getElementById("volume3");
			flag=2;
			kk=3;
		}

		else if(!chank.localeCompare("track_0")){ flag=3; kk=0; }
		else if(!chank.localeCompare("track_1")){ flag=3; kk=1; }
		else if(!chank.localeCompare("track_2")){ flag=3; kk=2; }
		else if(!chank.localeCompare("track_3")){ flag=3; kk=3; }

		if(flag==1){
			if(data>=45) data=45;
			imenu.value = data;
			tone[kk]=data+35;
		}
		else if(flag==2){
			if(data>=127) data=127;
			imenu.value = data;
			dvol[kk]=data;
		}
		else if(flag==3){
			for(var j=0; j<16; j++){
				data=parseInt(text.substr(i+8+j*2,1));
				toggle[j+kk*16]=data;
			}
			drawmatrix();
		}

		if(!chank.localeCompare("__end__")) break;

		i+=7; if(i>=1000) break;
		while(text[i]!="\n") i++;
		i++;

	}

}
