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
