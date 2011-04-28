;(function($, undefined){
	$.fn.validator = function(opts){
		var options = $.extend({}, $.fn.validator.defaults, opts);
		var $this = $(this);
		
	/* Add a required field legend */
		var $requiredLegend = $('<p>')
			.addClass('validator-required-fields-legend')
			.html("<span style=\"color:#f00;\">*</span> Required Fields");
		$this.before($requiredLegend);
		
	/* Add tooltips for required fields */
		processRequiredFields(this);
		
		
	/* Listen for blur on form fields */
		$this.delegate("input, select, textarea", "blur", function(){
			var $this = $(this);
			
			if( typeof(options.validations[$this.metadata().validation]) !== 'function' ){
				if( typeof(validations[$this.metadata().validation]) === 'function' ){
					validations[$this.metadata().validation]($this.val())?
						$this.removeClass( options.invalidClass )
					:
						$this.addClass( options.invalidClass ) ;
					;
				}
			} else {
				options.validations[$this.metadata().validation]($this.val())?
					$this.removeClass( options.invalidClass )
				:
					$this.addClass( options.invalidClass ) ;
				;
			}
		});
		
	/* Listen for form submission, then hijack */
		$this.submit(function(e){
			e.preventDefault();
			console.log("form submitted  ... ha ha, not really!");
			
			//really we need to processRequiredFields and log the errors to the error Queue
			var valid = !missingRequiredFields(this) && $('.invalid').length == 0;
			console.log("Submission returned " + valid);
			return false;
		});
		
//		
//		Private Functions
//
		function processRequiredFields( form ){
			var $required = $(".validator-required", form);
			
			//add tooltip for required fields
			$required.attr("title", "This is a required field");
			
			//add mark to labels of required fields
			$required.siblings('label').addClass('validator-required-key');
			
		}
		
		function missingRequiredFields( form ){
			var valid = true;
			$('.validator-required', form).each(function(){
				var missing = ($(this).val() == "");
				(missing) ? $(this).addClass("validator-invalid") : false ;
				valid = missing && valid;
			});
			return !valid;
		}		
		
	}
	
	var validations = {
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
	
	//Default options added here
	$.fn.validator.defaults = {
		invalidClass : 'validator-invalid',
		attachNotificationElement : 'body',
		notificationClass : 'notification'
	};
})(jQuery);