# input-fetcher-dropdown


input-fetcher-dropdown is a jQuery plugin that facilitates the use of server side lookup via ajax and json.

  - completely editable in CSS file
  - Customize the HTML in the drop down
  - full setting override
  - visible and hidden attributes are accessable after selection

# New Features!

  This is a new plug in, features will be added...

# Useage

>Copy the contents of the directory structure to your server.  The files are setup to run a demonstration of the tool.  The demo loads a static file so expect that the output doesnt match what is typed.    
    
HTML:    
    
    <form>
	    <input type="text" class="input-fetcher-dropdown" id="sample-input" placeholder="Search for Name" /> 
    </form>

The the selected visual data is 'dataObjectSelection' below will be the value for 'sample-input' above.  The 'dataIndex' in our example is a uuid will be stored in an automatically created hidden input with the id='sample-input-selected-index'.  -selected-index is appended to the id of the provided input field.  

JS:

    <script type="text/javascript">
        $( "#sample-input" ).inputFetcherDropdown({
	        dataSourceURL: "data/test-data.json",
	        dataIndex: "uuid",
	        displayFormat: "%%image%% %%name%% <br> %%birthday%%   %%contact_name%%   %%contact_number%%",
	        displayData: {
		    	'image':'TRUE', 
		    	'name':'TRUE', 
		    	'birthday':'TRUE', 
	    		'contact_name':'TRUE', 
		    	'contact_number':'FALSE'
		    	},
	    dataObjectSelection: 'name'
    });
    </script>

Each dropdown is formated with "displayFormat" with the attributes to be displayed wrapped in double-percents.  ie: %%name%%    The "displayData" provides the fields that are used and if they are visable.   



JSON from server:

    [
        {
	"image":"images\/2.png",
	"name":"Tom Ec<strong>gi<\/strong>o",
	"uuid":"e553425f-26b1-11e7-9c74-123943fe746b",
	"name_first":"Tom",
	"name_last":"Ecgio",
	"birthday":"1974-02-21",
	"contact_uuid":"1263415e-26b1-11e7-9c74-123943fe746b",
	"contact_name":"Jim Smith",
	"contact_number":"7021231234"
	}
    ]

Notice that the attributes all match up to the fields provide in the JS section.  The JSON in our exapmple comes from the 'data/test-data.json' file in this package.  This must be tested on a server b/c the ajax query will not work in local viewing.  

The JSON data that is provided by the server is not currently provided as part of this package.  I may provide this in the future.

### Using The Data

The other data that was provided can still be accessed once the object has been selected and the index has been stored in the hidden input field.  all the data is stored in spans with classes set to the variable name. 

> Example:  \<div id="uuid-e553425f-26b1-11e7-9c74-123943fe746b">\<img src="images/2.png"> \<span class="name">Tom Ec\<strong>gi\</strong>o\</span> \<br> \<span class="birthday">1974-02-21\</span>\<span class="contact_name">Jim Smith\</span>\<span class="contact_number input-fetcher-dropdown-hidden">7021231234\</span>\</div>

Take note that the id will have the 'dataIndex' prefix followed by a '-'.  This ensures that the id is always a letter.  The 'dataObjectSelection' (in the example is 'name') will have some html formatting to identify the characters that were used in the ajax query.  Using the below jQuery:  
> alert( $('#uuid-e553425f-26b1-11e7-9c74-123943fe746b').children('.name').text() );
outputs 'Tom Ecgio'.  

Also, the contact_uuid is not displayed in the example above.  This is because it was not provided as a data element in 'displayData'.  If you were to add it, you also need to add it onto the 'displayFormat' string.  

The 'displayData' object also controls if the element is visible to the end user.  Setting the value to 'FALSE' still allows access via the DOM as you can see in the example above.     





### Development

Want to contribute? Great! Reach out anytime.
