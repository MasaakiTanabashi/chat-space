$(function(){

  let result = $('#UserSearchResult')

  function findUser(user) {
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    result.append(html);
  }

  function addUser(id, name) {
    let html = `<div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>`;
    $('.ChatMembers').append(html);
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

  result.on("click", '.ChatMember__add', function(){
    const userId = $(this).attr('data-user-id');
    const userName = $(this).attr('data-user-name');
    $(this).parent().remove();
    addUser(userId, userName);
  })

  $('.ChatMembers').on("click", '.ChatMember__remove', function(){
    $(this).parent().remove();
  })
})