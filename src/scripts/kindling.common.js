var kindling = kindling || (function (domReady) {
	'use strict';

	function regExpEscape(text) {
		var regex = new RegExp('[.*+?|()\\[\\]{}\\\\]', 'g');
		return text.replace(regex, '\\$&');
	}

	return {
		getUsernameRegex: function (username) {
			var escapedUsername = regExpEscape(username);
			return new RegExp('\\b(' + escapedUsername + '|' + escapedUsername.split(' ').join('|') + ')\\b', 'i');
		},

		getDomain: function (url) {
			var regex = new RegExp('(chrome-extension|https?):\/\/(.[^/]+)');
			var match = url.match(regex);
			return match ? match[0] : '';
		},

		module: function (m) {
			if (m.init) {
				domReady(function () {
					m.init();
				});
			}
			return m;
		}
	};
}(window.$ || function (f) { f() }));