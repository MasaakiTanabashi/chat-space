$(function(){
  
  function buildHTML(message){
    let img = message.image ? `<img src="${message.image}">`:"";
    let html =　`<div class="MessageBox" data-message-id=${message.id}>
                  <div class="messageList">
                    <div class="messageList__name">
                      ${message.user_name}
                    </div>
                    <div class="messageList__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="messages">
                    <p class="messages__content">
                      ${message.content}
                    </p>
                      ${img}
                  </div>
                </div>`
    return html;
  }

  let reloadMessages = function() {
    let last_message_id = $('.MessageBox:last').data("message-id");
    $.ajax({
      type: "GET",
      url: "api/messages",
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        let messageList = $('.chat-main__messageList')
        messageList.append(insertHTML);
        messageList.animate({ scrollTop: messageList[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});