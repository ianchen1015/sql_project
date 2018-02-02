$("#progressbarTWInput").change(function(){
  $("#preview_progressbarTW_imgs").html(""); // 清除預覽
  readURL(this);
});

 

function readURL(input){
  if (input.files && input.files.length >= 0) {
    for(var i = 0; i < input.files.length; i ++){
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = $("<img width='300' height='200'>").attr('src', e.target.result);
        $("#preview_progressbarTW_imgs").append(img);
      }
      reader.readAsDataURL(input.files[i]);
    }
  }else{
     var noPictures = $("<p>目前沒有圖片</p>");
     $("#preview_progressbarTW_imgs").append(noPictures);
  }
}