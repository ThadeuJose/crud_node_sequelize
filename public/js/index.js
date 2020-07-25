$(function () {
  pollQuotes();

  $('#submit').click(function () {
      console.log('OK');
      let value = $('#quote').val();
      if (value) {
        console.log('Send');
        $.post('/quote',{ quote:value },function (data) {
          pollQuotes();
        });
      }
      // TODO: Fazer o else
  });

  function pollQuotes(){
    $.get( "/allquote", function(data) {
        console.log(data);
        $('#quotes').empty();
        for (var i of data) {
          console.log(i);
          let btnDelete = $('<button>').text('Delete').click(deleteQuote);
          let btnEdit = $('<button>').text('Edit').click(editQuote);

          $('<div>')
              .text(i.quote)
              .attr('id',i.id)
              .append(btnDelete)
              .append(btnEdit)
              .appendTo($('#quotes'));
        }
    });
  }

  function deleteQuote(e){
    let id = e.target.parentElement.id
    console.log(id);

    $.ajax({
        url: '/quote/'+id,
        type: 'DELETE',
        success: function(data) {
            console.log(data);
            pollQuotes();
        }
    });
  }

  function editQuote(e){
    let id = e.target.parentElement.id
    console.log(id);

    $.get('/quote/'+id, function(data) {
        console.log(data);
        $('#quoteEdit').val(data.quote);
        $('#idEdit').val(data.id);
        $('#main').removeClass();
        $('#edit').removeClass();
        $('#main').addClass('hide');
        $('#edit').addClass('show');
    });
  }

  $('#submitEdit').click(function () {
    let id = $('#idEdit').val();
    let quote = $('#quoteEdit').val();
    $.ajax({
        url: '/quote',
        type: 'PUT',
        data: { id:id, quote:quote },
        success: function(data) {
            console.log(data);
            pollQuotes();
            $('#main').removeClass();
            $('#edit').removeClass();
            $('#edit').addClass('hide');
            $('#main').addClass('show');
        }
    });

  });

});
