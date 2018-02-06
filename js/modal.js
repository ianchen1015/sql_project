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
            '<div id="preview_progressbarTW_imgs"></div>'+
        
            '<div align="right">'+
            '<p><input class="w3-btn w3-card w3-round w3-blue-grey" type="submit" value="Submit"><p>'+
            '</div>'+

        '</form>'+
    '</div>';
    
    $("#insert_form").validate({
        rules: {
            name: {required: true},
            value: {required: true, number: true}
        },
        submitHandler:function(form){
            modal.style.display = "none";  
            //disable the default form submission
            event.preventDefault();
            //grab all form data  
            var formData = new FormData($(form)[0]);
            $.ajax({
                url: 'php/insert.php',
                type: 'POST',
                data: formData,
                //async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    alert(data);
                    get_data();
                    sort_id(0);
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
        '<form id="form">'+//edit form

            '<p><label>Name</label>'+
            '<input class="w3-input w3-border w3-round" id="name" name="name" type="text" value="'+ obj["name"] +'" autofocus></p>'+
        
            '<p><label>Value</label>'+
            '<input class="w3-input w3-border w3-round" id="value" name="value" type="text" value="'+ obj["value"] +'" ></p>'+
        
            '<p><label>Text</label>'+
            '<textarea class="w3-input w3-border w3-round" id="text" name="text" type="text" value="'+ obj["text"] +'" style="resize:none"></textarea></p>'+
        
            '<div align="right">'+
            '<p><input class="w3-btn w3-card w3-round w3-blue-grey" type="submit" value="Submit"><p>'+
            '</div>'+

        '</form>'+

        '<p><div class="w3-container w3-border w3-round w3-light-grey"><p>'+
        '<form id="upload_img">'+//upload img
        '<input class="hide w3-input w3-border w3-round" name="id" type="text" value="'+ edit_id +'" ></p>'+
            '<Input id ="input_upload" Type="File" Name="upfile[]" onchange="readURL(this)" targetID="preview_progressbarTW_img" multiple/ ><br>'+
                '<div id="preview_progressbarTW_imgs"></div>'+
            '<div align="right">'+
                '<p><input class="w3-btn w3-card w3-round w3-blue-grey" type="submit" value="upload"><p>'+
                '</div>'+
        '</form>'+
        '</p></div></p>'+

        '<div id="'+ edit_id +'_edit_images"></div>'+//show imgs
    '</div>';
    edit_files(edit_id);

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

    $("#upload_img").validate({
        rules: {
        },
        submitHandler:function(form){
            //disable the default form submission
            event.preventDefault();
            //grab all form data  
            var formData = new FormData($(form)[0]);
            $.ajax({
                url: 'php/upload_files.php',
                type: 'POST',
                data: formData,
                //async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    $( "#input_upload" ).load(window.location.href + " #input_upload" );
                    $( "#preview_progressbarTW_imgs" ).load(window.location.href + " #preview_progressbarTW_imgs" );
                    //alert(data);
                    edit_files(edit_id);
                    show_image(edit_id);
                },
                error: function(jqXHR) {
                    alert("upload_img Error"+jqXHR.status);
                    edit_files(edit_id);
                    show_image(edit_id);
                }
            });
        }   
    });
}

function edit_files(edit_id) {
    $.ajax({
        type: "Post",
        url: "php/load_files.php",
        dataType: "json",
        data: {
            id: edit_id,
        },
        success: function(phpdata) {
            var output =
            '<div class="images w3-container">';
            for(var i = 0; i < phpdata.length; i++){
                //console.log(phpdata[i]);
                var file_dir = "../data/"+ edit_id +"/"+ phpdata[i];
                output += 
                    '<div class="gallery w3-round">'+
                        '<div align="right">'+
                            '<span class="w3-button w3-round-xxlarge" onclick="del_file('+ "'" + file_dir + "'" +','+ edit_id + ','+"'"+ phpdata[i] +"'"+')">&times;</span>'+
                        '</div>'+
                        '<img class="w3-round" src="data/'+ edit_id +'/'+ phpdata[i] +'" width="400" height="300">'+
                        '<div class="desc w3-light-grey w3-round">'+ phpdata[i] +'</div>'+
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

function del_file (file_dir, edit_id, filename) {
    var r = confirm("Delete "+ filename +"?\n\n");
    if (r == true) {
        $.ajax({
            type: "POST",
            url: "php/delete_file.php",
            dataType: "text",
            data: {
                dir : file_dir,
            },
            success: function(data) {
                //alert(filename+data);
                edit_files(edit_id);
                show_image(edit_id);
            },
            error: function(jqXHR) {
                alert("Error"+jqXHR.status);
                edit_files(edit_id);
            }
        })
    }
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
    '<div id="view_content" class="w3-container">'+
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
    //console.log(view_id);
    output +=
    '</div>'+
    '<div id="'+ view_id +'_view_files"></div>';

    document.getElementById("view_content").innerHTML = output;
    view_files(view_id);
    //alert("Image Error: " + jqXHR.status);
    view_modal_open();

}

function view_files(view_id){
    $.ajax({
        type: "Post",
        url: "php/load_files.php",
        dataType: "json",
        data: {
            id: view_id,
        },
        success: function(phpdata) {
            var image_names = [];
            var audio_names = [];
            var video_names = [];
            var other_names = [];
            var image_extensions = ["jpg", "jpeg", "png", "gif"];
            var audio_extensions = ["ogg"];
            var video_extensions = ["mp4"];

            for(var i = 0; i < phpdata.length; i++){
                var file_extension = phpdata[i].split('.').pop();
                //console.log(file_extension);
                if(image_extensions.includes(file_extension))
                    image_names.push(phpdata[i]);
                else if(audio_extensions.includes(file_extension))
                    audio_names.push(phpdata[i]);
                else if(video_extensions.includes(file_extension))
                    video_names.push(phpdata[i]);
                else
                    other_names.push(phpdata[i]);
            }
            console.log("image, "+image_names);
            console.log("audio, "+audio_names);
            console.log("video, "+video_names);
            console.log("other, "+other_names);

            var output = "";

            //image
            if(image_names.length != 0){
                output +=
                '<p><div class="w3-container w3-border w3-round w3-white">'+
                '<h2>Image</h2>'+
                '<p><div class="images w3-container">';
                for(var i = 0; i < image_names.length; i++){
                    //console.log(phpdata[i]);
                    output += 
                    '<div class="gallery w3-round">'+
                        '<img class="w3-round" src="data/'+ view_id +'/'+ image_names[i] +'" >'+
                        '<div class="desc w3-light-grey w3-round">'+ image_names[i] +'</div>'+
                    '</div>';
                }
                output +=
                '</div></p>'+
                '</div></p>';                
            }

            //audio
            if(audio_names.length != 0){
                output +=
                '<p><div class="w3-container w3-border w3-round w3-white">'+
                '<h2>Audio</h2>'+
                '<div class="w3-container">';
                for(var i = 0; i < audio_names.length; i++){
                    //console.log(phpdata[i]);
                    output += 
                    '<p>'+ 
                        '<div class="w3-border w3-round">'+
                        audio_names[i] +'<br>'+
                        '<audio controls style="max-width: 100%">'+
                        '<source src="data/'+ view_id +'/'+ audio_names[i] +'" type="video/ogg">'+
                        'Your browser does not support the audio element.'+
                    '</div>'+
                    '</audio>'+
                    '</p>';
                }
                output +=
                '</div>'+
                '</div></p>';                 
            }

            //video
            if(video_names.length != 0){
                output +=
                '<p><div class="w3-container w3-border w3-round w3-white">'+
                '<h2>Video</h2>'+
                '<div class="w3-container">';
                for(var i = 0; i < video_names.length; i++){
                    //console.log(phpdata[i]);
                    output += 
                    '<p>'+ 
                        '<div class="w3-border w3-round">'+
                        video_names[i] +
                        '<video controls style="max-width: 100%">'+
                        '<source src="data/'+ view_id +'/'+ video_names[i] +'" type="video/mp4">'+
                        'Your browser does not support HTML5 video.'+
                        '</div>'+
                        '</video>'+
                    '</p>';
                }
                output +=
                '</div>'+
                '</div></p>';                
            }

            //other
            if(other_names.length != 0){
                output +=
                '<p><div class="w3-container w3-border w3-round w3-white">'+
                '<h2>Unknown type</h2>'+
                '<div class="w3-container">';
                for(var i = 0; i < other_names.length; i++){
                    //console.log(phpdata[i]);
                    output += 
                    '<div class="w3-container w3-round">'+
                        '<div class="desc w3-light-grey w3-round">'+ other_names[i] +'</div>'+
                    '</div>';
                }
                output +=
                '</div></p>'+
                '</div>'+
                '</div></p>';                
            }


            document.getElementById(view_id +"_view_files").innerHTML = output;
            $('.image').viewer();
            $('.images').viewer();
        },
        error: function(jqXHR) {
            var output = '';
            document.getElementById(view_id +"_view_files").innerHTML = output;
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
    var r = confirm("Are you sure?\n\n" + output);
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
            var del_dir = '../data/'+ del_id ;//del_dir
            $.ajax({
                type: "POST",
                url: "php/delete_dir.php",
                dataType: "text",
                data: {
                    dir : del_dir,
                },
                success: function(del_dir_data) {
                    alert(data+del_dir_data);
                    get_data();
                },
                error: function(del_dir_jqXHR) {
                    alert("Error"+del_dir_jqXHR.status);
                    get_data();
                }
            })
        },
        error: function(jqXHR) {
            alert("Error"+jqXHR.status);
            get_data();
        }
    })
    modal.style.display = "none";
}
