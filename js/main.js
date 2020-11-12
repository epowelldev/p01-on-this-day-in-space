function launchLibrary()
{
    var launchLibraryURL = 'https://launchlibrary.net/1.3/launch?';
    var startDate = 'startdate=' + '2000-04-01';    // placeholder test value
    var endDate = '&enddate=' + '2000-04-31';       // placeholder test value
    var targetDate = 15;                            // placeholder test value

    $.ajax(
    {
        url: launchLibraryURL + startDate + endDate,
        method: "GET"
    }).then(function(response)
    {
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
function getClosestDate(launchDates, targetDate)
{
    if(!Array.isArray(launchDates))
    {
        return 0;
    }

    var count = 0;
    var date = launchDates[0].net.split(' '); 
    var closest = Math.abs(targetDate - parseInt(date[1]));

    console.log(closest);

    for(var i = 1; i < launchDates.length; i++)
    {
        var date = launchDates[i].net.split(' ');

        if(Math.abs(targetDate - parseInt(date[1])) < closest)
        {
            closest = Math.abs(targetDate - date[1]);
            count = i;
        } 
    }
    
    return count;
}

launchLibrary();

var apiKey = 'Kh6At4nhdqEhFXjs1OINKDv99FrMOgT6XVHJjJCt'
var date = ''
var queryURL = 'https://api.nasa.gov/planetary/apod?date=' + date + '&api_key=' + apiKey;
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

