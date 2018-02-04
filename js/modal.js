//modal
var modal = document.getElementById('modal');
var span = document.getElementsByClassName("close")[0];
var view_modal = document.getElementById('view_modal');
var view_close = document.getElementsByClassName("view_close")[0];

function modal_open(){
    view_modal.style.display = "none";
    modal.style.display = "block";
}

function view_modal_open(){
    modal.style.display = "none";
    view_modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

view_close.onclick = function() {
    view_modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
    	modal.style.display = "none";
    }
    if (event.target == view_modal) {
        view_modal.style.display = "none";
    }
}

function modal_insert() {
    document.getElementById("form_content").innerHTML = 
    '<div id="modal_content" class="w3-container">'+
        '<h2 id="form_header">Insert</h2>'+
        '<form id="insert_form">'+

            '<p><label>Name</label>'+
            '<input class="w3-input w3-border w3-round" id="name" name="name" type="text"></p>'+
        
            '<p><label>Value</label>'+
            '<input class="w3-input w3-border w3-round" id="value" name="value" type="text"></p>'+
        
            '<p><label>Text</label>'+
            '<textarea class="w3-input w3-border w3-round" id="text" name="text" type="text" style="resize:none"></textarea></p>'+
        
            '<Input Type="File" Name="upfile[]" onchange="readURL(this)" targetID="preview_progressbarTW_img" multiple/ ><br>'+
            '<div id="preview_progressbarTW_imgs" overflow:scroll;"><p>目前沒有圖片</p></div>'+
        
            '<div align="right">'+
            '<p><input id="upimage" class="w3-btn w3-card w3-round w3-blue-grey" id="form_button" type="submit" value="Submit"><p>'+
            '</div>'+

        '</form>'+
    '</div>';
    
    $("#insert_form").validate({
        rules: {
            name: {required: true},
            value: {required: true, number: true}
        },
        submitHandler:function(form){        
            //disable the default form submission
            event.preventDefault();
            //grab all form data  
            var formData = new FormData($(form)[0]);
            $.ajax({
                url: 'php/insert.php',
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    alert(data);
                    get_data();
                    sort_id(0);
                    modal.style.display = "none";
                },
                error: function(jqXHR) {
                    alert("Error"+jqXHR.status);
                }
            });
            return false;
        }   
    });


}

function modal_edit(index) {
    var obj = sql_data[ index ];
    var edit_id = obj['id'];
    document.getElementById("form_content").innerHTML = 
    '<div id="modal_content" class="w3-container">'+
        '<h2 id="form_header">Edit</h2>'+
        '<form id="form">'+

            '<p><label>Name</label>'+
            '<input class="w3-input w3-border w3-round" id="name" name="name" type="text" value="'+ obj["name"] +'" autofocus></p>'+
        
            '<p><label>Value</label>'+
            '<input class="w3-input w3-border w3-round" id="value" name="value" type="text" value="'+ obj["value"] +'" ></p>'+
        
            '<p><label>Text</label>'+
            '<textarea class="w3-input w3-border w3-round" id="text" name="text" type="text" value="'+ obj["text"] +'" style="resize:none"></textarea></p>'+
        
            '<p><label>Image</label><br>'+
            '<input Type="File" id="upfile" ><br>'+
        
            '<div align="right">'+
            '<p><input class="w3-btn w3-card w3-round w3-blue-grey" id="form_button" type="submit" value="Submit"><p>'+
            '</div>'+

        '</form>'+
        '<div id="'+ edit_id +'_edit_images"></div>'+
    '</div>';
    edit_image(edit_id);

    $("#form").validate({
        rules: {
            name: {required: true},
            value: {required: true, number: true}
        },
        submitHandler:function(form){        
            edit(obj["id"],index);
            return false; //stop the original submit
        }   
    });
}

function edit_image(edit_id) {
    $.ajax({
        type: "Post",
        url: "php/load_images.php",
        dataType: "json",
        data: {
            id: edit_id,
        },
        success: function(phpdata) {
            var output =
            '<div class="images w3-container">';
            for(var i = 0; i < phpdata.length; i++){
                console.log(phpdata[i]);
                output += 
                '<div class="gallery w3-round">'+
                    '<img class="w3-round" src="data/'+ edit_id +'/images/'+ phpdata[i] +'" width="400" height="300">'+
                    '<div class="desc w3-light-grey">'+ phpdata[i] +'</div>'+
                '</div>';
            }
            output +=
            '</div>'+
            '</div></p>';
            document.getElementById(edit_id +"_edit_images").innerHTML = output;
            $('.image').viewer();
            $('.images').viewer();
        },
        error: function(jqXHR) {
            var output = '';
            document.getElementById(edit_id +"_edit_images").innerHTML = output;
            //alert("Image Error: " + jqXHR.status);
        }
    })
}

function edit(edit_id,index) {
    $.ajax({
        type: "POST",
        url: "php/edit.php",
        dataType: "text",
        data: {
            id: edit_id,
            name: $("#name").val(),
            value: $("#value").val(),
            text: $("#text").val(),
        },
        success: function(data) {
            alert(data);
            modal.style.display = "none";
            view_update(index);
        },
        error: function(jqXHR) {
            alert("Error"+jqXHR.status);
        }
    })
}

function modal_view(index) {
    var obj = sql_data[ index ];
    var output = 
    '<p><div id="view_content" class="w3-container">'+
        '<p><button onclick="modal_open();modal_edit('+ index +');" class="w3-button w3-white w3-round w3-border" style="width:70px" align="center">Edit</button></p>'+
        '<p><div class="w3-row w3-border w3-round w3-white">'+
            '<ul class="w3-ul w3-hoverable">';
    for (var key in obj){
        output +=
            '<li><span class="w3-small w3-text-grey">'+
        key+
            '&emsp;</span>'+
        obj[key]+
            '</li>';
    }
    output +=
            '</ul>'+
        '</p>';

    var view_id = obj['id'];
    console.log(view_id);
    output +='<div id="'+ view_id +'_view_images"></div>'+
    '</div>'+
    '</p>';
    view_image(view_id);
    document.getElementById("view_content").innerHTML = output;
    //alert("Image Error: " + jqXHR.status);
    view_modal_open();

}

function view_image(view_id){
    $.ajax({
        type: "Post",
        url: "php/load_images.php",
        dataType: "json",
        data: {
            id: view_id,
        },
        success: function(phpdata) {
            var output =
            '<div class="images w3-container">';
            for(var i = 0; i < phpdata.length; i++){
                console.log(phpdata[i]);
                output += 
                '<div class="gallery w3-round">'+
                    '<img class="w3-round" src="data/'+ view_id +'/images/'+ phpdata[i] +'" width="400" height="300">'+
                    '<div class="desc w3-light-grey">'+ phpdata[i] +'</div>'+
                '</div>';
            }
            output +=
            '</div>'+
            '</div></p>';
            document.getElementById(view_id +"_view_images").innerHTML = output;
            $('.image').viewer();
            $('.images').viewer();
        },
        error: function(jqXHR) {
            var output = '';
            document.getElementById(view_id +"_view_images").innerHTML = output;
            //alert("Image Error: " + jqXHR.status);
        }
    })
}

function del_confirm(index){
    var obj = sql_data[ index ];
    var output = "";
    for (var key in obj){
        output += key + ": " + obj[key] + "\n";
    }
    var r = confirm("Are rou sure???\n\n" + output);
    if (r == true) {
        del(index);
    }
}

function del(index) {
    var obj = sql_data[ index ];
    var del_id = obj["id"];
    
    $.ajax({
        type: "POST",
        url: "php/delete.php",
        dataType: "text",
        data: {
            id: del_id,
        },
        success: function(data) {
            alert(data);
            get_data();
        },
        error: function(jqXHR) {
            alert("Error"+jqXHR.status);
        }
    })
    modal.style.display = "none";
    get_data();
}