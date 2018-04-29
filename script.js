//Define code for search book by isbn number
var addElement = function (data, type) {
  switch (type) {
    case 'p':
    return "<p>" + data + "</p>";
    break;
    case 'img':
    return "<img class=\"book-img\" src=\"" + data + "\"></img>";
    break;
  }  
}

var showDetails = function (data) {
  $('.searchResultByIsbn').append(addElement(data.items[0].volumeInfo.title, 'p'))
    .append(addElement(data.items[0].volumeInfo.authors, 'p'))
    .append(addElement(data.items[0].volumeInfo.description, 'p'))
    .append(addElement(data.items[0].volumeInfo.imageLinks.smallThumbnail, 'img'));
}

var fetchByIsbn = function (isbn) {
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn,
    success: function (data) {
      showDetails(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};//'https://www.googleapis.com/books/v1/volumes?q=isbn:0439023521',

$('.search-book-isbn').click(function () {
  fetchByIsbn($('#isbn').val());
  $('#isbn').val('');
});

$('.clear-book-isbn').click(function () {
  $('.searchResultByIsbn').children().empty();
  $('#title').val('');
});

// Define code for search book by title of book
$('body').delegate('li', 'click', function () {
  var animalType = $(this).next().data().name;
  if ($(this).next().hasClass("hide")) {
    $(this).nextUntil('li').removeClass('hide');
  }
  else {
    $(this).nextUntil('li').addClass('hide');
  }
});

var addElementEndClass = function (data, i, type) {
  switch (type) {
    case 'p':
    return "<p data-name=" + i + " class=\"hide list-group-item\" >" + data + "</p>";    
    break;
    case 'img':
    return "<img data-name=" + i + " class=\"hide\" src=\"" + data + "\"></img>";
    break;
  }  
}

var showDetail = function (data, i) {
  $('ul').append("<li>" + data.volumeInfo.title + "</li>")
    .append(addElementEndClass(data.id, i, 'p'))
    .append(addElementEndClass(data.volumeInfo.authors, i, 'p'))
    .append(addElementEndClass(data.volumeInfo.description, i, 'p'))
    .append(addElementEndClass(data.volumeInfo.imageLinks.smallThumbnail, i, 'img'));
}

var fetchByTitle = function (title) {
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title,
    success: function (data) {
      $('.searchResultByTitle').append("<ul class=\"list-group\"></ul>");
      for (var i = 0; i < 10; i++) {
        showDetail(data.items[i], i);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

$('.search-book-title').click(function () {
  fetchByTitle($('#title').val());
  $('#title').val('');
});
$('.clear-book-title').click(function () {
  $('.searchResultByTitle').children().empty();
  $('#title').val('');
});

// Define code for search book by title of author
var fetchByAuthor = function (author) {
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + author,
    success: function (data) {
      $('.searchResultByAuthor').append("<ul class=\"list-group\"></ul>");
      for (var i = 0; i < 10; i++) {
        showDetail(data.items[i], i);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

$('.search-book-author').click(function () {
  fetchByAuthor($('#title').val());
  $('#author').val('');
});

$('.clear-book-author').click(function () {
  $('.searchResultByAuthor').children().empty();
  $('#title').val('');
});

$('#isbnForm').parsley();

//$('#isbnForm').formValidation();