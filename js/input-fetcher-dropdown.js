/*
LICENSE

The MIT License

Copyright (c) 2016, nfosci

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function ( $ ) {
    $.fn.inputFetcherDropdown = function( options ) {
		
		var thisObject = this;
		
		// setup default options, also allow overwriting of defaults with options
        var settings = $.extend({
			
            dropdownObject: "#" + thisObject.attr('id') + "-input-fetcher-dropdown-result" ,
			dataSourceURL: "data/test-data.json",
			dataIndex: "uuid",
			storeDataIdObject: "", 
			displayFormat: "%%image%% %%name%%<br>%%birthday%% - %%contact_name%% - %%contact_number%%",
			displayData: {'image':'TRUE', 'name':'TRUE', 'birthday':'TRUE', 'contact_name':'TRUE', 'contact_number':'FALSE'},
			dataObjectSelection: 'name'
			
		}, options );
		
		settings.storeDataIdObject = "#" + thisObject.attr('id') + "-" + settings.dataIndex;
		
		
		this.parent().append("<div id='" + thisObject.attr('id') + "-input-fetcher-dropdown-result' class='input-fetcher-dropdown-result'></div>");
		this.parent().append("<input type='hidden' id='" + thisObject.attr('id') + "-" + settings.dataIndex + "' name='" + thisObject.attr('id') + "-" + settings.dataIndex + "' >");
		
 		
		
 		// process the click
		$(settings.dropdownObject).click(function(event){
    		
			var thisisit = $(event.target).closest('.input-fetcher-dropdown-show')
			
			thisObject.val( thisisit.children('.' + settings.dataObjectSelection).text() );
			event.stopPropagation();
			$(settings.storeDataIdObject).val( thisisit.attr('id').substr(settings.dataIndex.length + 1, thisisit.attr('id').length ) );
			
			// Remove the existing data
			$.each(settings.displayData, function( x, y ) {
				$('#' + thisObject.attr('id') + "-" + x ).remove();
			});
			
			$.each(settings.displayData, function( x, y ) {
				if(x != "image")
				{
				thisObject.parent().append("<input type='hidden' id='"+ thisObject.attr('id') + "-" + x + "' name='"+ thisObject.attr('id') + "-" + x + "' value='" + $('#' + thisisit.attr('id')).find('.' + x ).text() + "'>");
				}
			});
			
			
			
			
			
			$(settings.dropdownObject).hide();
			$(settings.dropdownObject).html('');
			
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
			var dataString = 'search=' + searchid;
			if( searchid == '' || searchid.length < 2)
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
  			
							$(settings.dropdownObject).append( '<div id=\'' + settings.dataIndex + '-' + val[settings.dataIndex] + '\' ></div>' );
						
							$('#' + settings.dataIndex + '-' + val[settings.dataIndex]).addClass( 'input-fetcher-dropdown-show' );
							if(index == result_json.length - 1)
							{
								$('#' + settings.dataIndex + '-' + val[settings.dataIndex]).addClass( 'last' );
							}
							$('#' + settings.dataIndex + '-' + val[settings.dataIndex]).addClass( 'input-fetcher-dropdown-option' );
							 
							$('#' + settings.dataIndex + '-' + val[settings.dataIndex]).attr( 'align', 'left' );
		
							$.each(settings.displayData, function( x, y ) {
								if(val[x] == null) 
								{
									htmlout = htmlout.replace('%%' + x + '%%', '');
									val[x] = '';
								}
								if(x == 'image') 
								{
									htmlout = htmlout.replace('%%' + x + '%%',  "<img src='" + val[x] + "' />" );
								}
								
								sresult = htmlout.search('%%' + x + '%%');
								
								if(y == 'TRUE') 
								{
									// if the displayData isnt in displayFormat let add it to the end
									if( sresult >= 0)
									{
										htmlout = htmlout.replace('%%' + x + '%%', "<span class='"+x+"'>" + val[x] + "</span>");
									}
									if( sresult < 0 && x != 'image')
									{
										htmlout +=  "<span class='"+x+"'>" + val[x] + "</span>";
									}
								}
								else
								{
									// if the displayData isnt in displayFormat let add it to the end
									if( sresult >= 0)
									{
										htmlout = htmlout.replace('%%' + x + '%%', "<span class='"+x+" input-fetcher-dropdown-hidden'>" + val[x] + "</span>");
									}
									if( sresult < 0 && x != 'image')
									{
										htmlout +=  "<span class='" + x + " input-fetcher-dropdown-hidden'>" + val[x] + "</span>";
									}
								}
							});
							$('#' + settings.dataIndex + '-' + val[settings.dataIndex] ).html(htmlout);
							index++;
  						});	
				    }
    			});	
			}return false;    		
		});
    };
}( jQuery ));



