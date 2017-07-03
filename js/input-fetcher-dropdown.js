
(function ( $ ) {
    $.fn.inputFetcherDropdown = function( options ) {
        var thisObject = this;
		
		this.parent().append("<div id='"+ thisObject.attr('id') +"-input-fetcher-dropdown-result' class='input-fetcher-dropdown-result'></div>");
		this.parent().append("<input type='hidden' id='"+ thisObject.attr('id') +"-selected-index' name='"+ thisObject.attr('id') +"-selected-result' >");
		
		// setup default options, also allow overwriting of defaults with options
        var settings = $.extend({
			
            dropdownObject: "#" + thisObject.attr('id') + "-input-fetcher-dropdown-result" ,
			dataSourceURL: "data/test-data.json",
			dataIndex: "uuid",
			storeDataIdObject: "#" + thisObject.attr('id') + "-selected-index", 
			displayFormat: "%%image%% %%name%%<br>%%birthday%% - %%contact_name%% - %%contact_number%%",
			displayData: {'image':'TRUE', 'name':'TRUE', 'birthday':'TRUE', 'contact_name':'TRUE', 'contact_number':'FALSE'},
			dataObjectSelection: 'name'
			
		}, options );
 		
		
 		// process the click
		$(settings.dropdownObject).click(function(event){
    		
			var thisisit = $(event.target).closest('.input-fetcher-dropdown-show')
			
			thisObject.val( thisisit.children('.'+ settings.dataObjectSelection).text() );
			event.stopPropagation();
			$(settings.storeDataIdObject).val( thisisit.attr('id') );
			alert( settings.storeDataIdObject + " -- " + thisisit.attr('id'));
			
			//$(settings.dropdownObject).html(''); 
			$(settings.dropdownObject).hide();
			
		});
		
		// hide the dropdown display
		$('html').click(function() {
			$(settings.dropdownObject).html(''); 
			$(settings.dropdownObject).hide();	  
		});
		
		$(this).keyup(function() 
		{ 
			$(settings.storeDataIdObject).val('');
			var searchid = $(this).val();
			var dataString = 'search='+ searchid;
			if(searchid=='' || searchid.length < 2)
			{
				$(settings.dropdownObject).html(''); 
				$(settings.dropdownObject).hide();	  
			}
			if(searchid!='' && searchid.length > 1)
			{
   		 		$.ajax({
 	   				type: 'POST',
    				url: settings.dataSourceURL,
    				data: dataString,
    				cache: false,
    				success: function(result_json)
    				{
 						var next_div;   
	
						$(settings.dropdownObject).show();
						$(settings.dropdownObject).html('');
						
						var index = 0;
						$.each( result_json, function( i, val ) {
							var htmlout = settings.displayFormat;
  			
							$(settings.dropdownObject).append( '<div id=\''+settings.dataIndex+'-' + val[settings.dataIndex] + '\' ></div>' );
						
							$('#'+settings.dataIndex+'-'+val[settings.dataIndex]).addClass( 'input-fetcher-dropdown-show' );
							if(index == result_json.length-1)
							{
								$('#'+settings.dataIndex+'-'+val[settings.dataIndex]).addClass( 'last' );
							}
							$('#'+settings.dataIndex+'-'+val[settings.dataIndex]).addClass( 'input-fetcher-dropdown-option' );
							 
							$('#'+settings.dataIndex+'-'+val[settings.dataIndex]).attr( 'align', 'left' );
		
							$.each(settings.displayData, function( x, y ) {
								if(val[x] == null) 
								{
									htmlout = htmlout.replace('%%' + x + '%%', '');
								}
								if(x == 'image') 
								{
									htmlout = htmlout.replace('%%' + x + '%%',  "<img src='"+val[x]+"' />" );
								}
								if(y == 'TRUE') 
								{
									htmlout = htmlout.replace('%%' + x + '%%', "<span class='"+x+"'>" + val[x] + "</span>");
								}
								else
								{
									htmlout = htmlout.replace('%%' + x + '%%', "<span class='"+x+" input-fetcher-dropdown-hidden'>" + val[x] + "</span>");
								}
							});
							$('#'+settings.dataIndex+'-'+val[settings.dataIndex]).html(htmlout);
							index++;
  						});	
				    }
    			});	
			}return false;    		
		});
    };
}( jQuery ));
