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

  $('.form__contents').on('submit',function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      let message = $('.chat-main__messageList')
      message.append(html);
      message.animate({ scrollTop: message[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
     })
    .always(function(){
      $('.form__contents')[0].reset();
      $('.form__submitBtn').prop('disabled', false);
    })
  });
});