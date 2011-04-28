/* Author: Nathan Stilwell

*/

(function($, window, document, undefined){
	$(function(){
		/**
		 *	Initial our plugin and pass in a custom
		 *	validation as an option
		 */
		$('form').validator({
			//
			//	custom form validation can be created like this
			//
			validations : {
				'zip' : function(val){
					return (val.length === 5 && !isNaN(val))|| val === "";
				}
			}
		});
		
	});
})(jQuery, window, document);





















