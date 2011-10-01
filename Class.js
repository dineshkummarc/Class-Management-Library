var Class = function(parent) {
	var _class = function() {
		this.init.apply(this, arguments);
	};
	
	// If a parent is passed to the Class constructor, 
	// we make sure any subclasses share the same prototype
	/*
		// Example usage
		var Animal = new Class;
		Animal.include({
			breath: function() {
				console.log('breath');
			}
		});
		var Cat = new Class(Animal);
		var tommy = new Cat;
		tommy.breath();
	*/
	if (parent) {
		var subclass = function(){};
		subclass.prototype = parent.prototype;
		_class.prototype = new subclass;
	}
	
	_class.prototype.init = function(){};
	
	// Shortcut to access prototype
	_class.fn = _class.prototype;
	
	// Shortcut to access class
	_class.fn.parent = _class;
	
	// Adding a proxy function to help control scope in our Class library
	/*
		// Example usage
		var Button = new Class;
		Button.include({
			init: function(element) {
				this.element = jQuery(element);
				
				// Proxy the click function
				this.element.click(this.proxy(this.click));
			},
			click: function() {}
		});
	*/
	_class.proxy = function(fn) {
		var self = this;
		return function() {
			return fn.apply(self, arguments);
		};
	}
	
	// Allow the adding of 'static' (i.e. instance specific) class properties
	// This method accepts an object as an argument, it loops through its properties copying them directly to the current class instance.
	// So these properties are 'static' (i.e. they do not show up on all other class instances like adding to the prototype would)
	/*
		// Example usage
		var Person = new Class;
		Person.extend({
			find: function(id) {},
			exists: function(id) {}
		});
		var person = Person.find(i);
	*/
	_class.extend = function(obj) {
		var extended = obj.extended;
		
		for (var i in obj) {
			_class[i] = obj[i];
		}
		
		// If there is a callback called 'extended' then it will be invoked
		if (extended) {
			extended(_class);
		}
	};
	
	// Allow the adding of 'instance' class properties 
	// i.e. they are added to the prototype chain so they are added to all instances of this class
	/*
		// Example usage
		var Person = new Class;
		Person.include({
			save: function(id) {},
			destroy: function(id) {}
		});
		var person = new Person;
		person.save();
	*/
	_class.include = function(obj) {
		var included = obj.included;
		
		for (var i in obj) {
			_class.fn[i] = obj[i];
		}
		
		// If there is a callback called 'included' then it will be invoked
		if (included) {
			extended(_class);
		}
	};
	
	return _class;
};