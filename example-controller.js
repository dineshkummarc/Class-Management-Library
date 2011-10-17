// We pass in the global Controller
(function($, Controller) {
	
	var module = new Controller;
	
	module.toggleClass = function(e) {
		// 'this.view' is the #view element.
		// And we're using jQuery's 'toggleClass' method to change the styles of the element.
		this.view.toggleClass('over');
	};
	
	// Once a new Controller has been instantiated we create a new 'view' variable.
	// Note: The Controller's 'load' method helps keep the scope of 'this' attached to the Controller class
	module.load(function() {
		// We're using jQuery to grab the 'View' and to attach some event listeners which call the 'toggleClass' method (and pass some custom data)
		this.view = $('#view');
		
		// Notice we're using the 'proxy' method to ensure when the mouseover/out callback is executed 
		// then the 'this' value is scoped to this Controller instance still (rather than the global Window object)
		this.view.mouseover(this.proxy(this.toggleClass));
		this.view.mouseout(this.proxy(this.toggleClass));
	});
	
}(jQuery, Controller))