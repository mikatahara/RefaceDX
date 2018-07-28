
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

	var i,k;
	var savetext='';

	savetext += "tempo__:"
	savetext += tempo.toString(10);
	savetext +="\r\n";

	for(k=0; k<4; k++){
		savetext += "tone__"
		savetext += k.toString(10);
		savetext += ":";
		savetext += (tone[k].toString(10)-35);
		savetext +="\r\n";
	}

	for(k=0; k<4; k++){
		savetext += "volume"
		savetext += k.toString(10);
		savetext += ":";
		savetext += dvol[k].toString(10);
		savetext +="\r\n";
	}

	for(k=0; k<4; k++){
		savetext += "track_"
		savetext += k.toString(10);
		savetext += ":";
		for(i=0; i<16; i++){
			savetext += toggle[i+k*16].toString(10);
			savetext += " "
		}
		savetext +="\r\n";
	}

	savetext += "__end__";
	savetext +="\r\n";

	var fn=document.getElementById("file_name");
	var fname=fn.value;
	var aaa=new Blob([savetext]);
	download(aaa, fname);

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

