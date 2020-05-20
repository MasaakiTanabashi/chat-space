$(function(){

  let result = $('#UserSearchResult')

  function findUser(user) {
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    result.append(html);
  }

  function findNoUser() {
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>`;
    result.append(html);
  }

  $('#UserSearch__field').on("keyup",function(){
    let input = $('#UserSearch__field').val();
    $.ajax({
      type: "GET",
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(users){
      result.empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            findUser(user);
          });
        }
        else if (users.length == 0 ) {
          return false;
        }
        else {
          findNoUser();
        }
    })
    .fail(function(){
      alert('通信エラーです。ユーザーが表示できません。')
    })
  })
})