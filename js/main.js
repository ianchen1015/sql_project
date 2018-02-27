
function show(out_index){//output by out_id id order
	var output = '';
    for(var i = 0; i < out_index.length; i++){
    	//output += '<div class="w3-panel w3-card w3-white"><p>';
    	var obj = sql_data[ out_index[i] ];
		output += 
		'<div class="w3-panel w3-card w3-round w3-white">'+
		'<p>'+
		'<button onclick="modal_view('+ out_index[i] +');" class="w3-button w3-white w3-border w3-round w3-margin-right">View</button>'+
		'<button onclick="del_confirm('+ out_index[i] +')" class="w3-button w3-white w3-border w3-round w3-margin-right w3-hover-red">Del</button>'+
			'<div class="w3-row w3-border w3-round ">'+
				'<div class="w3-col m6">'+
					'<ul class="w3-ul w3-hoverable">';
	    for (var key in obj){
	        //console.log(key, obj[key]);
			output += 
			'<li><span class="w3-small w3-text-grey">'+
			key +
			'&emsp;</span>'+
			obj[key] +
			'</li>';
		}
		
		var show_id = obj['id'];

	    output += 
				'</ul>'+
				'</div>'+
				'<div class="w3-col m6 w3-center">'+
				'<div id="'+ show_id +'_show_images"></div>'+
				'</div>'+
			'</div>'+
		'</p>'+
		'</div>';			
		show_image(show_id);

		document.getElementById("show").innerHTML = output;
    }
}

function show_image(show_id) {
	$.ajax({
		type: "Post",
		url: "php/load_files.php",
		dataType: "json",
		data: {
			id: show_id,
		},
		success: function(phpdata) {
			var output =
			'<div class="images w3-container">';
			for(var i = 0; i < phpdata.length; i++){
				//console.log(phpdata[i]);
				var image_extensions = ["jpg", "jpeg", "png", "gif"];
				var file_extension = phpdata[i].split('.').pop();
				//image_extensions.includes(file_extension)
				if(0){
					output += 
					'<div class="small-gallery w3-round">'+
						'<img class="w3-round" src="data/'+ show_id +'/'+ phpdata[i] +'">'+
					'</div>';					
				}
				else{
					output += 
						'<p>'+ phpdata[i] +'</p>';
				}
			}
			output +=
			'</div>';
			document.getElementById(show_id +"_show_images").innerHTML = output;
			$('.image').viewer();
    		$('.images').viewer();
		},
		error: function(jqXHR) {
			var output ='';
			document.getElementById(show_id +"_show_images").innerHTML = output;
		}
	})
}

function sort_id(x) {
    var output = '';
    var sortable = [];
    var index = 0;
    for(var i = 0; i < sql_data.length; i++){
    	var obj = sql_data[i];
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
    for(var i = 0; i < sql_data.length; i++){
    	var obj = sql_data[i];
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
    for(var i = 0; i < sql_data.length; i++){
    	var obj = sql_data[i];
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






