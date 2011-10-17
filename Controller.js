// Any global variables needed will be specified via 'exports'
(function($, exports) {
	
	// We're creating a re-usable module
	// This is our Controller's constructor
	var module = function(includes) {
		if (includes) {
			this.include(includes);
		}
	};
	
	// Give ourselves a shortcut to the prototype chain
	module.fn = module.prototype;
	
	// Instead of directly using the jQuery 'proxy' method we mask over it. 
	// This means we can now more easily swap out the implementation either for our own or another library's.
	module.fn.proxy = function(func) {
		return $.proxy(func, this);
	};
	
	// The load method executes the passed in function.
	// Note: we use a proxy method to call the passed in function.
	// This is so when a user creates a new Controller instance the 'this' value is scoped to the instance rather than the global Window object.
	module.fn.load = function(func) {
		$(this.proxy(func, this));
	};
	
	// This is a shortcut for adding properties onto the controller
	module.fn.include = function(obj) {
		$.extend(this, obj);
	};
	
	exports.Controller = module;
	
}(jQuery, window))