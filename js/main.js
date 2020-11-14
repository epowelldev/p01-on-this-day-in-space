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

var year = []
$('#searchBtn').click(function (event) {
    event.preventDefault()
    year = []
    date = $('#searchDate').val()

    randomYear()
    getNasa()

})


function randomYear() {

    for (let i = 0; i < 2; i++) {
        var randomYr = Math.floor(Math.random() * (moment().format('yyyy') - 1995) + 1995)
        year.push(randomYr)
    }
    console.log(year)
}
function getNasa() {
    var apiKey = 'Kh6At4nhdqEhFXjs1OINKDv99FrMOgT6XVHJjJCt'
    var date = $('#searchDate').val()
    var queryURL = `https://api.nasa.gov/planetary/apod?date=${year[0]}-${date}&api_key=${apiKey} `;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        // console.log(response);
        var nasaDate = moment(response.date).format('dddd, MMMM Do YYYY')
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
        var queryURL2 = `https://api.nasa.gov/planetary/apod?date=${year[1]}-${date}&api_key=${apiKey}`;
        $.ajax({
            url: queryURL2,
            method: 'GET'
        }).then(function (response2) {
            console.log(response2);
            var nasaDate2 = moment(response2.date).format('dddd, MMMM Do YYYY')
            var imgDesc2 = response2.explanation
            var imgTitle2 = response2.title
            var nasaImg2 = response2.hdurl
            var nasaDiv2 = $('<div>')
            var divDate2 = $('<h3>').text(nasaDate2)
            var divTitle2 = $('<h2>').text(imgTitle2)
            var divImg2 = $('<img>').attr('src', nasaImg2).css({ 'width': '300px', 'height': 'auto' })
            var description2 = $('<p>').text(imgDesc2)
            $('body').append(nasaDiv2)
            nasaDiv.append(divTitle2, divDate2, divImg2, description2)
        })
    })

}