function launchLibrary() {
    var launchLibraryURL = 'https://launchlibrary.net/1.3/launch?';
    var startDate = 'startdate=' + '2000-04-01';    // placeholder test value
    var endDate = '&enddate=' + '2000-04-31';       // placeholder test value
    var targetDate = 15;                            // placeholder test value

    $.ajax(
        {
            url: launchLibraryURL + startDate + endDate,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var launches = response.launches;
            console.log(launches);

            var closestDate = launches[getClosestDate(launches, targetDate)];
            console.log(closestDate);
        });
}

// Determines the closest launch date to the targeted date
// Parameters: launchDates - an array of launches passed from launchLibrary function
//              targetDate - assumed to be an integer
function getClosestDate(launchDates, targetDate) {
    if (!Array.isArray(launchDates)) {
        return 0;
    }

    var count = 0;
    var date = launchDates[0].net.split(' ');
    var closest = Math.abs(targetDate - parseInt(date[1]));

    console.log(closest);

    for (var i = 1; i < launchDates.length; i++) {
        var date = launchDates[i].net.split(' ');

        if (Math.abs(targetDate - parseInt(date[1])) < closest) {
            closest = Math.abs(targetDate - date[1]);
            count = i;
        }
    }

    return count;
}

launchLibrary();

var apiKey = 'Kh6At4nhdqEhFXjs1OINKDv99FrMOgT6XVHJjJCt'
var date = '05-18'
var year = Math.floor(Math.random() * (moment().format('yyyy') - 1996) + 1996)
var queryURL = `https://api.nasa.gov/planetary/apod?date=${year}-${date}&api_key=${apiKey} `;
console.log(year)
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
    var divImg = $('<img>').attr('src', nasaImg).css({ 'width': '300px', 'height': 'auto' })
    var description = $('<p>').text(imgDesc)
    $('body').append(nasaDiv)
    nasaDiv.append(divTitle, divDate, divImg, description)
    // var apiKey = 'Kh6At4nhdqEhFXjs1OINKDv99FrMOgT6XVHJjJCt'
    // var date2 = '2015-05-18'
    // var queryURL2 = `https://api.nasa.gov/planetary/apod?date=${date2}&api_key=${apiKey}`;
    // $.ajax({
    //     url: queryURL2,
    //     method: 'GET'
    // }).then(function (response2) {
    //     console.log(response2);
    //     var nasaDate = response2.date
    //     var imgDesc = response2.explanation
    //     var imgTitle = response2.title
    //     var nasaImg = response2.hdurl
    //     var nasaDiv = $('<div>')
    //     var divDate = $('<h3>').text(nasaDate)
    //     var divTitle = $('<h2>').text(imgTitle)
    //     var divImg = $('<img>').attr('src', nasaImg).css({ 'width': '300px', 'height': 'auto' })
    //     var description = $('<p>').text(imgDesc)
    //     $('body').append(nasaDiv)
    //     nasaDiv.append(divTitle, divDate, divImg, description)
    // })
})

