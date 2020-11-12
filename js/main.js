var apiKey = 'Kh6At4nhdqEhFXjs1OINKDv99FrMOgT6XVHJjJCt'
var queryURL = 'https://api.nasa.gov/planetary/apod?date=2001-05-18&api_key=' + apiKey;
$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function (response) {
    console.log(response);
    var nasaDate = response.date
    var imgDesc = response.explanation
    var imgTitle = response.title
    var nasaImg = response.hdurl
    var nasaDiv = $('<div>')
    var divDate = $('<h3>').text(nasaDate)
    var divTitle = $('<h2>').text(imgTitle)
    var divImg = $('<img>').attr('src', nasaImg)
    var description = $('<p>').text(imgDesc)
    $('body').append(nasaDiv)
    nasaDiv.append(divTitle, divDate, divImg, description)
})