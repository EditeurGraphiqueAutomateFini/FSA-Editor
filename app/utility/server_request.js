define(function(){
    return{
        sendRequest: function(data){
            var ajaxRequest = $.ajax({
                  type: 'POST',
                  data : {graphicEditorFSA:data},
                  url: 'http://www.martinbolot.com/graphicEditorFSA/',
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
