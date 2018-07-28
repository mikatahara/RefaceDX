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


//-- 	------------------------------------------------------------------	-->
// 選択したテキストファイルの内容を表示
window.addEventListener("load", function(){
	// File APIが使えるか調べる
	if (!window.File){
		ele.innerHTML = "File APIが使用できません";
		return;
	}
	// 情報を表示する領域の要素
	var ele = document.getElementById("log");
	// 進捗状況を表示するプログレスバーの要素を特定
	var prog = document.getElementById("loadstatus");
	// ファイルを読み込むためのFile Readerオブジェクトを入れる変数
	var reader;

	// 「保存する」ボタンがクリックされた時の処理
	document.getElementById("read").addEventListener("click", function(){
		var textFile = document.getElementById("filedata").files[0];
		// 選択されたファイル情報
		ele.innerText = "ファイル名：";
		ele.innerText += textFile.name;
		ele.innerText += "\n";
		ele.innerText += "ファイルサイズ：";
		ele.innerText += textFile.size;
		ele.innerText += " バイト\n";
		ele.innerText += "MIME Type：";
		ele.innerText += textFile.type;
		ele.innerText += "\n";
		ele.innerText += "---------------\n";

		// テキストかどうか調べる
		if (textFile.type.indexOf("text/") != 0){
			ele.innerHTML += "選択したファイルはテキスト形式ではありません";
			return;
		}
		// テキストファイルなら処理を行う
		reader = new FileReader();
		reader.onload = function(evt){
			var text = evt.target.result;
			var text = text.substr(0, 100);	// 先頭100文字だけ表示
			ele.textContent += text;
		}
		reader.onerror = function(evt){
			var errorNo = evt.target.error.code
			ele.innerHTML += "エラー発生："+errorNo;
		}
		reader.onabort = function(evt){
			ele.innerHTML += "読み込みが中断されました";
		}
		reader.onprogress = function(evt){

		}
		reader.readAsText(textFile, "utf-8");
	}, true);

}, true);


//-- 	------------------------------------------------------------------	-->

	function download(blob, filename) {
		var objectURL = (window.URL || window.webkitURL).createObjectURL(blob),

// createElementはその名前の通り、エレメント(オブジェクト)を生成します。
// ここでのエレメントというのは、HTMLのタグのことです
		a = document.createElement('a');

// a要素のdownload属性にファイル名を設定
		a.download = filename;
		a.href = objectURL;

// 指定されたタイプの イベント を作成します。返されるオブジェクトは初めに初期
// 化する必要があり、その後で element.dispatchEvent へ渡すことができます。
		e = document.createEvent('MouseEvent');

// clickイベントを着火
// event.initMouseEvent(type, canBubble, cancelable, view,
//                      detail, screenX, screenY, clientX, clientY,
//                      ctrlKey, altKey, shiftKey, metaKey,
//                      button, relatedTarget);

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent

		e.initEvent("click", true, true, window,
				1, 0, 0, 0, 0,
				false, false, false, false,
				0, null);

	a.dispatchEvent(e);
	}

function exportfile(){
	var fn=document.getElementById("file_name");
	var fname=fn.value;
	var dc=document.getElementById("doc_ment");
	var aaa=new Blob([dc.value]);
	download(aaa, fname);
}
