$(function () {
  pollQuotes();

  $('#submit').click(function () {
      console.log('OK');
      let quote = $('#quote').val();
      let author = $('#author').val();
      let place = $('#place').val();
      if (quote) {
        console.log('Send');
        $.post('/quote',{ quote:quote, author:author, place:place }, function (data) {
          pollQuotes();
        });
      }
      // TODO: Fazer o else
  });

  function pollQuotes(){
    $.get( "/quote", function(data) {
        console.log(data);
        $('#quotes').empty();
        for (var i of data) {
          console.log(i);
          let btnDelete = $('<button>').text('Delete').click(deleteQuote);
          let btnEdit = $('<button>').text('Edit').click(editQuote);

          $('<div>')
              .text(i.quote+' '+i.author+' '+i.place)// TODO: Ajeitar
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
        $('#authorEdit').val(data.author);
        $('#placeEdit').val(data.place);
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
    let author = $('#authorEdit').val();
    let place = $('#placeEdit').val();
    if (quote) {
      $.ajax({
          url: '/quote',
          type: 'PUT',
          data: { id:id, quote:quote, author:author, place:place },
          success: function(data) {
              console.log(data);
              pollQuotes();
              $('#main').removeClass();
              $('#edit').removeClass();
              $('#edit').addClass('hide');
              $('#main').addClass('show');
          }
      });
    }
  });

});
