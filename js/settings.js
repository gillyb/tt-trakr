
var settingsService = angular.module('SettingsService', []);

settingsService.factory('Settings', ['$http', '$q', 'CacheProvider', function($http, $q, CacheProvider) {

	var fs = require('fs');
	var cacheKey = '__SETTINGS__';
	var settingsFile = './settings.dat';

	var defaultSettings = {
		alwaysOnTop: true,
		hideSeconds: false,
		stopTasksOnClose: true,
		startRunningImmediately: true,
		hideDoneTasks: false
	};
	var _settings;

	function loadSettings() {
		var settings = undefined;

		// check if the settings are in the cache
		settings = CacheProvider.get(cacheKey);
		if (settings) {
			this._settings = settings;
			return;
		}

		// check if the settings are in the file
		var buffer;
		try {
			buffer = fs.readFileSync(settingsFile);
			CacheProvider.put(cacheKey, buffer.toString());
			this._settings = JSON.parse(buffer.toString());
			return;
		}
		catch (e) {
			if (!fs.existsSync(settingsFile)) {
				// create a new settings file with default settings
				buffer = new Buffer(JSON.stringify(defaultSettings));
				var fd = fs.openSync(settingsFile, 'w+');
				fs.writeSync(fd, buffer, 0, buffer.length, 0);
				CacheProvider.put(cacheKey, buffer.toString());
				this._settings = defaultSettings;
				return;
			}

			// TODO: report about some weird error... ?
			return;
		}
	}

	var settings = {
		get: function() {
			loadSettings();
			return this._settings;
		},
		saveSettings: function() {
			var buffer = new Buffer(JSON.stringify(this._settings));
			var fd = fs.openSync(settingsFile, 'w+');
			fs.writeSync(fd, buffer, 0, buffer.length, 0);
		},
	};

	return settings;

}]);