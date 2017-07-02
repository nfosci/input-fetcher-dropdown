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
	    <div id="input-fetcher-dropdown-result"></div> 
	    <br>
	    <input type="text" id="input-fetcher-dropdown-selected-id" name="#input-fetcher-dropdown-selected-id">
    </form>

JS:

    <script type="text/javascript">
        $( "#sample-input" ).inputFetcherDropdown({
	        dataSourceURL: "data/test-data.json",
	        dataIndex: "uuid",
	        storeDataIdObject: "#input-fetcher-dropdown-selected-id",
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
	    "image":"images\/1.png",
	    "name":"<strong>Gi<\/strong>ani Thompson",
	    "uuid":"e552425f-26b1-11e7-9c74-123943fe746b",
	    "name_first":"Giani",
	    "name_last":"Thompson",
	    "birthday":"1985-04-31",
    	"contact_uuid":"a4523e5c-26b1-11e7-9c74-123943fe746b",
    	"contact_name":"Remember this is a static file so it will always look like 'gi' was typed in to the input block.",
    	"contact_number":"4351234321"
	  }
  ]

Notice that the attributes all match up.  The JSON data that is provided by the server is not currently provided as part of this package.
I may provide this in the future.

### Development

Want to contribute? Great! Reach out anytime.
