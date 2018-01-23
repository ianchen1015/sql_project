//get data by ajax
var data;
var oReq = new XMLHttpRequest();
oReq.open("get", "php/get-data.php", true);
oReq.send();

oReq.onload = function() {
    //console.log(this.responseText)
    data = JSON.parse(this.responseText);
    sort_id(0);
};
////

function show(out_index){//output by out_id id order
	var output = '';
    for(var i = 0; i < out_index.length; i++){
    	//output += '<div class="w3-panel w3-card w3-white"><p>';
    	var obj = data[ out_index[i] ];
    	output += 
    	'<div class="w3-panel w3-card w3-white">'+
    	'	<div class="w3-row">'+
    	'		<div class="w3-col" style="width:75px">'+
    	'			<p><button id="modal_edit_btn" onclick="modal_edit_btn('+obj['id']+')" class="w3-button w3-white w3-border" style="width:60px">Edit</button></p>'+
    	'			<p><button class="w3-button w3-white w3-border" style="width:60px">Del</button></p>'+
    	'		</div>'+
    	'	<div class="w3-rest">'+
    	'		<p>';
	    for (var key in obj){
	        //console.log(key, obj[key]);
	        output += key + ': ' + obj[key] + '<br>';
	    }
	    output += 
	    '		</p></div></div></div>';
    }
   	document.getElementById("show").innerHTML = output;
}

function sort_id(x) {
    var output = '';
    var sortable = [];
    var index = 0;
    for(var i = 0; i < data.length; i++){
    	var obj = data[i];
    	sortable.push( [ Number(obj['id']), index ] );
    	index += 1;
    }
    sortable.sort(function(a, b) {
    	if(x == 0)
    		return b[0] - a[0];
    	else
    		return a[0] - b[0];
	});
    var out_index = [];
    for(var i = 0; i < sortable.length; i++){
    	out_index.push( sortable[i][1] );
    }
    console.log('sort by id',out_index);
    show(out_index);
}

function sort_name(x){
    var output = '';
    var sortable = [];
    var index = 0;
    for(var i = 0; i < data.length; i++){
    	var obj = data[i];
    	sortable.push( [ obj['name'], index ] );
    	index += 1;
    }
    sortable.sort(function(a, b) {
    	if(x == 0){
			if (a[0] < b[0])
				return -1
			if ( a[0] > b[0])
				return 1
			return 0
		}
		else{
			if (a[0] < b[0])
				return 1
			if ( a[0] > b[0])
				return -1
			return 0
		}
	});
    var out_index = [];
    for(var i = 0; i < sortable.length; i++){
    	out_index.push( sortable[i][1] );
    }
    console.log('sort by name',out_index);
    show(out_index);
}

function sort_value(x){
    var output = '';
    var sortable = [];
    var index = 0;
    for(var i = 0; i < data.length; i++){
    	var obj = data[i];
    	sortable.push( [ obj['value'], index ] );
    	index += 1;
    }
    sortable.sort(function(a, b) {
    	if(x == 0)
    		return b[0] - a[0];
    	else
    		return a[0] - b[0];
	});
    var out_index = [];
    for(var i = 0; i < sortable.length; i++){
    	out_index.push( sortable[i][1] );
    }
    console.log('sort by value',out_index);
    show(out_index);
}






