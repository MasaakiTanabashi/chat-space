$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox">
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
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="MessageBox">
          <div class="messageList">
            <div class="messageList__name">
              ${message.user_name}
            </div>
            <div class="messageList__date">
              ${message.created_at}
            </div>
          </div>
          <div class="messages">
            <p class="message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
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
      $('.chat-main__messageList').append(html);
      $('.chat-main__messageList').animate({ scrollTop: $('.chat-main__messageList')[0].scrollHeight});
      $('.form__contents')[0].reset();
      $('.form__submitBtn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
})