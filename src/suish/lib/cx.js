const prefix = 'suish';

function toVal(mix) {
	var k, y, str='';
	if (mix) {
		if (typeof mix === 'object') {
			if (Array.isArray(mix)) {
				for (k=0; k < mix.length; k++) {
					if (mix[k] && (y = toVal(mix[k]))) {
            str && (str += ' ');
            if (y.slice(0, 1) === '-') {
              str += prefix;
            }
						str += y;
					}
				}
			} else {
				for (k in mix) {
					if (mix[k] && (y = toVal(k))) {
            str && (str += ' ');
            if (y.slice(0, 1) === '-') {
              str += prefix;
            }
						str += y;
					}
				}
			}
		} else if (typeof mix !== 'boolean' && !mix.call) {
      str && (str += ' ');
      if (mix.slice(0, 1) === '-') {
        str += prefix;
      }
			str += mix;
		}
	}
	return str;
}

export default function () {
	var i=0, x, str='';
	while (i < arguments.length) {
		if (x = toVal(arguments[i++])) {
      str && (str += ' ');
      if (x.slice(0, 1) === '-') {
        str += prefix;
      }
			str += x
		}
	}
	return str;
}