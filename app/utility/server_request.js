define(function(){
    return{
        postRequest: function(postData){
            console.log(JSON.stringify(postData));

            var ajaxRequest = $.ajax({
                  type: 'POST',
                  data : {graphicEditorFSA:JSON.stringify(postData)},
                  url: 'http://www.martinbolot.com/graphicEditorFSA/',
                  beforeSend : function(){
                      $(".saving").fadeIn();
                  },
                  complete:function(){
                      $(".saving").fadeOut();
                  },
                  success: function(data){
                      console.log(data);
                  },
                  error: function(){
                      console.log("send error");
                  }
            });
        }
    }
});
