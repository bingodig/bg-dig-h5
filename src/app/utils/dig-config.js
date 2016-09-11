var configCache = {};

module.exports = {
	ConfigCache: configCache,

	/**
	 * 设置Config
	 * @param config
	 */
	setConfigCache: function(config) {
		this.ConfigCache = config;
	}
};