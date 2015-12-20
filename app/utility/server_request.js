define(function(){
    return{
        postRequest: function(postData){
            var ajaxRequest = $.ajax({
                  type: 'POST',
                  data : {graphicEditorFSA:JSON.stringify(postData)},
                  url: 'http://www.martinbolot.com/graphicEditorFSA/',
                  beforeSend : function(){
                      $(".load_helper").html("saving...").fadeIn();
                  },
                  complete:function(){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","transparent");
                  },
                  success: function(data){
                     // console.log(data);
                  },
                  error: function(){
                      console.log("send error");
                  }
            });
        }
    }
});
