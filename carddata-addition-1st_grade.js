var makeMath = function(){
	var result = {};
	result['Addition'] = [];
	result['Subtraction'] = [];
	result['Multiplication'] = [];
	result['Division'] = [];

	for (var i = 0, leni = 12; i <= leni; i++) {
		for (var j = 0, lenj = 12; j <= lenj; j++) {
			result['Addition'].push([i + ' + ' + j, '', i+j]);
			result['Subtraction'].push([i + ' - ' + j, '', i-j]);
			result['Multiplication'].push([i + ' × ' + j, '', i*j]);
			result['Division'].push([i + ' ÷ ' + j, '', i/j]);
		}
	}
	return result;
}

var cardData = makeMath();