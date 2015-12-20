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
