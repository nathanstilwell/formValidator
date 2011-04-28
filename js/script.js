/* Author: Nathan Stilwell

*/

(function($, window, document, undefined){
	$(function(){
		/**
		 *	Initial our plugin and pass in a custom
		 *	validation as an option
		 */
		$('form').validator({
			validations : {
				'zip' : function(val){
					return val.length === 5 || val === "";
				}
			}
		});
		
	});
})(jQuery, window, document);





















