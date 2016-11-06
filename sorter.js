var lastClick = 0;

makeTablesSortable = function(_tables) {
	for (var i = 0; i < _tables.length; ++i)  addClickEvent(_tables.eq(i));
}

addClickEvent = function(_table) {
	var _ths = _table.find('th');
	var _trs = _table.find('tbody tr');
	for (let i = 0; i < _ths.length; ++i) {
		_ths.eq(i).attr('clickTime', 0);

		_ths.eq(i).click(function() {
			var clickTime = parseInt(_ths.eq(i).attr('clickTime'))+1;
			_ths.eq(i).attr('clickTime', clickTime);

			if (lastClick == 0)  lastClick = _ths.eq(i);
			removeLastClick(_ths.eq(i));

			if (clickTime%2 == 1)  { clickOne(_ths.eq(i)); sortTableUp(_trs, i); }
			else { clickTwo(_ths.eq(i)); sortTableDown(_trs, i); }
		});
	}
}

sortTableUp = function(_trs, i) {
	for (let j = 0; j < _trs.length-1; ++j)
		for (let k = j+1; k < _trs.length; ++k)
			if (_trs.eq(j).find('td').eq(i).html() > _trs.eq(k).find('td').eq(i).html()) changeHtml(_trs.eq(j), _trs.eq(k));
}

sortTableDown = function(_trs, i) {
	for (let j = 0; j < _trs.length-1; ++j)
		for (let k = j+1; k < _trs.length; ++k) 
			if (_trs.eq(j).find('td').eq(i).html() <= _trs.eq(k).find('td').eq(i).html()) changeHtml(_trs.eq(j), _trs.eq(k));
			
}

clickOne = function(_current) {
	_current.removeClass('selectTwo')
	_current.addClass('selectOne');
}

clickTwo = function(_current) {
	_current.removeClass('selectOne');
	_current.addClass('selectTwo');
}

removeLastClick = function(_current) {
	if (lastClick != _current) {
		lastClick.removeClass('selectOne selectTwo');
		lastClick = _current;
	}
}

changeHtml = function(_tr1, _tr2) {
	var tempHtml = _tr1.html();
	_tr1.html(_tr2.html());
	_tr2.html(tempHtml);
} 

window.onload = function() {
	var tables = $("table");
	makeTablesSortable(tables);
}
