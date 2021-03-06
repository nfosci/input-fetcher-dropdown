# input-fetcher-dropdown


input-fetcher-dropdown is a jQuery plugin that facilitates the use of server side lookup via ajax and json.

  - completely editable in CSS file
  - customize the HTML in the drop down
  - full setting override
  - visible and hidden attributes are accessable after selection
  - call a function after selection



# Useage

>Copy the contents of the directory structure to your server.  The files are setup to run a demonstration of the tool.  The demo loads a static file so expect that the output doesnt match what is typed.    
    
### HTML:    
    
    <form>
	    <input type="text" class="input-fetcher-dropdown" id="sample-input" placeholder="Search for Name" /> 
    </form>

The the selected visual data is 'dataObjectSelection' below will be the value for 'sample-input' above.  The 'dataIndex' in our example is a uuid will be stored in an automatically created hidden input with the id='sample-input-selected-index'.  -selected-index is appended to the id of the provided input field.  

### JS:

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
	    	dataObjectSelection: 'name',
	    	afterSelectFunction: null
    });
    </script>

Each dropdown is formated with "displayFormat" with the attributes to be displayed wrapped in double-percents.  ie: %%name%%    The "displayData" provides the fields that are used and if they are visable.   


### Options

**dataSourceURL** 

This is a data source that can provide the JSON data need to populate the dropdown.  
Example:   dataSourceURL: "data/test-data.json"

**dataIndex**

This is one of the data fields that is provided in the JSON data.  This is what will be used to manage the dropdown data.

**displayFormat**

This provides for some simple formatting of the dropdown.  The fields are wrapped in the double percent symbols. 
*Note that %%image%% will convert into an image tag with the image data as the source.*  

**displayData**

Provides which data elements will be displayed (when set to 'TRUE') to the end user through the dropdown. And if set to 'FALSE' will only be available as a hidden input field when the user clicks on the dropdown.

**dataObjectSelection**

Selects the data element that will populate the original input form field.

**afterSelectFunction**

This can setup a function call after the user makes a selection and after the hidden form input fields have been setup.  This can be useful for using the data without having to setup a listener.  

Example:   afterSelectFunction: 'testMeOut()'



### JSON from server:

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

The data is displayed in the format below while in the dropdown view.  

    Example:  
    
	<div id="uuid-e553425f-26b1-11e7-9c74-123943fe746b">
 		<img src="images/2.png"> 
		<span class="name">Tom Ec<strong>gi</strong>o</span> 
		<br> 
		<span class="birthday">1974-02-21</span>
		<span class="contact_name">Jim Smith</span>
		<span class="contact_number input-fetcher-dropdown-hidden">7021231234</span>
	</div>


Once the selection occurs, the displayed div is hidden and each 'displayData' will become a hidden input field.  (With the exception of 'image')  Note that the data feilds provided by 'displayData' are appended to the input textbox's id.  In this example the textbox is 'sample-input' so the selected birthday value would be stored in 'sample-input-birthday'


    <input type="hidden" id="sample-input-uuid" name="sample-input-uuid" value="e553425f-26b1-11e7-9c74-123943fe746b">
    <input type="hidden" id="sample-input-name" name="sample-input-name" value="Tom Ecgio">
    <input type="hidden" id="sample-input-birthday" name="sample-input-birthday" value="1974-02-21">
    <input type="hidden" id="sample-input-contact_name" name="sample-input-contact_name" value="Jim Smith">
    <input type="hidden" id="sample-input-contact_number" name="sample-input-contact_number" value="7021231234">


Also, the 'contact_uuid' field is not displayed in the example above.  This is because it was not provided as a data element in 'displayData'.  If you were to add it, you also may add it onto the 'displayFormat' string or it will be appended to the end. 

The 'displayData' object also controls if the element is visible to the end user.  Setting the value to 'FALSE' still creates the hidden input field.  'contact_number' is a good example of this.




### Development

Want to contribute? Great! Reach out anytime.
