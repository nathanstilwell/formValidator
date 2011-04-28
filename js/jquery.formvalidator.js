/**
 *		Nameless Form Validation jQuery Plugin
 *
 *		Author : Nathan Stilwell
 *
 *		@requires jQuery version 1.4.4 or higher
 */
 
;(function($, undefined){
	
	$.fn.validator = function( options ){
		//
		//	Merge User Options with default options
		//
		var opts = $.extend({}, $.fn.validator.defaults, options),
			//
			//	Merge user defined validations with defaults
			//
			validations = $.extend({}, $.fn.validator.validations, options.validations);
		
		return this.each(function(){
			var elem = $(this),
				o = $.extend({}, opts, elem.data());
				
			//
			//	Prepend Legend showing Required Fields
			//
			elem.before(o.requiredLegend);
			
			//
			//	Mark all required fields
			//
			elem
				.find('.' + o.requiredClass)
				.attr('title', 'This is a required field')
				.siblings('label')
					.addClass(o.requiredKeyClass);
					
			//
			//	Listen for blur on form fields
			//
			elem.delegate('input, select, textarea', 'blur', function(e){
				var $this = $(this);
				
				//
				//	If we have a validation function for the type specified
				//	in the DOM ...
				//
				if( typeof( validations[$this.data("validation")]) === 'function' ){
					//
					//	Run validation on the value of the element,
					//	returns a boolean
					//
					var valid = validations[$this.data("validation")]($this.val());
					
					//
					//	Based on if the value is valid or not,
					//	add or remove the invalid class from the element
					//
					$this[ ((valid) ? 'remove' : 'add') + 'Class']( o.invalidClass );
				}
			});
			
			//
			//	Listen for submission (since it's supposed to be a form),
			//	hijack the event and then act accordingly
			//
			elem.submit(function(e){
				var valid = true; // form valid until proven otherwise
				
				//
				//	Prevent the form from submitting
				//
				e.preventDefault();
				
				//
				//	Check for empty required fields
				//
				elem.find('.' + o.requiredClass).each(function(i, el){
					var $el = $(el),
						missing = $el.val() === "";
					//
					//	if element value is empty, then add invalid css class
					//
					$el[((missing) ? 'add' : 'remove') + 'Class'](o.invalidClass);
					
					//
					//	set valid to false if a required field is missing
					//
					valid = !missing && valid;
				});
				
				//
				//	Check to see if any fields are marked invalid
				//
				valid = !( $('.' + o.invalidClass)[0] ) && valid;
				//
				//	Based on the validity of the form you can
				//
				
				if( !valid ){
					$( o.attachNotificationElement ).append(
						$('<div />', {
							'class' : o.notificationClass,
							html : 'Please review form.'
						})
					);
					
					$('.' + o.notificationClass).slideDown();
				} else {
					//
					//	if we've given a notification, hide it
					//
					if($('.' + o.notificationClass)[0]){
						$('.' + o.notificationClass).slideUp();
					}
				}
				
			});
		});
	}
	
	
	//
	//	Default Validation Methods
	//
	$.fn.validator.validations = {
		'phone' : function(val){
			var phonex1 = /^([0-9]{3})([.-])([0-9]{3})([.-])([0-9]{4})$/; // 888.888.8888 or 888-888-8888
			var phonex2 = /^\(\d{3}\)([\s]{0,1})([\d]{3})([.-])([\d]){4}$/; // (888)888-8888 or (888) 888-8888 or same with dots
			var phonex3 = /^[\d]{10}$/; //8888888888 or 10 solid digits
			return phonex1.test(val) || phonex2.test(val) || phonex3.test(val) || val === "";
		},
		
		'hex' : function(val){
			return (parseInt(val, 16) < 256 && parseInt(val, 16) > -1 ) || val === "";
		},
		
		'email' : function(val){
			var mailex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
			return mailex.test(val) || val === "";
		},
		
		'zip' : function(val){
			return val.length === 6 || val === "";
		},
					
		'serial-number' : function(val){
			return (val !== "");
		}
	};
	
	//
	//	Plugin Default options
	//
	$.fn.validator.defaults = {
		invalidClass : 'validator-invalid',
		requiredClass : 'validator-required',
		requiredKeyClass : 'validator-required-key',
		attachNotificationElement : 'body',
		notificationClass : 'notification',
		requiredLegend : '<p class="validator-required-fields-legend"><span style="color:#f00">*</span> Required Fields</p>'
	};
})(jQuery);
