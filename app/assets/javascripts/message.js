$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox">
          <div class="Message-list">
            <div class="Message-list__username">
              ${message.user_name}
            </div>
            <div class="Message-list__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MessageBox">
        <div class="Message-list">
          <div class="Message-list__username">
            ${message.user_name}
          </div>
          <div class="Message-list__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form-form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');

    $('#submit').removeAttr('data-disable-with');

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
      $('.Message-field').append(html);
      $('form')[0].reset();
      $('.Message-field').animate({ scrollTop: $('.Message-field')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });
});
