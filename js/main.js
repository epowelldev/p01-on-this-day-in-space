function launchLibrary(year, date) {
    console.log(date);
    var launchLibraryURL = 'https://launchlibrary.net/1.3/launch?mode=verbose&';
    var targetDate = date.split('-');
    var startDate = 'startdate=' + year[0] + '-' + targetDate[0] + '-01';    
    var endDate = '&enddate=' + year[0] + '-' + targetDate[0] + '-31';       

    $.ajax(
        {
            url: launchLibraryURL + startDate + endDate,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var launches = response.launches;
            console.log(launches);

            var closestDate = launches[getClosestDate(launches, targetDate[1])];
            console.log(closestDate);

            publishLaunch(closestDate);
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

function publishLaunch(launch) {
    var name = launch.name;
    var date = launch.net;
    var location = launch.location.name;
    var rocket = launch.rocket.name;
    var rocketImg = launch.rocket.imageURL;

    
    
    var launchDiv = $('<div>');
    var divTitle = $('<h1>').text("Launch activity closest to this date");
    var divName = $('<h2>').text(name);
    var divDate = $('<h3>').text(date);
    var divLoc = $('<h3>').text(location);
    var divRocket = $('<h2>').text(rocket);
    var divImg = $('<img>').attr('src', rocketImg).css({ 'width': '300px', 'height': 'auto' });
    var missionDiv = $('<div>');

    $('body').append(launchDiv);
    launchDiv.append(divTitle, divName, divDate, divLoc, missionDiv, divRocket, divImg);

    if(launch.missions !== undefined || launch.missions.length != 0)
    {
        var missionName = launch.missions.name;
        var missionDesc = launch.missions.description;

        var divMissionName = $('<h3>').text(missionName);
        var divMissionDesc = $('<p>').text(missionDesc);

        missionDiv.append(divMissionName, divMissionDesc);
    }
}

var year = []
$('#searchBtn').click(function (event) {
    event.preventDefault()
    year = []
    date = $('#searchDate').val()

    randomYear()
    getNasa()
    launchLibrary(year, date);
})


function randomYear() {

    while (year.length < 4) {
        var randomYr = Math.floor(Math.random() * (moment().format('yyyy') - 1995) + 1995)
        if (!(year.includes(randomYr))) {
            year.push(randomYr)
        }
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
        var nasaImg = response.url
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
            // console.log(response2);
            var nasaDate2 = moment(response2.date).format('dddd, MMMM Do YYYY')
            var imgDesc2 = response2.explanation
            var imgTitle2 = response2.title
            var nasaImg2 = response2.url
            var nasaDiv2 = $('<div>')
            var divDate2 = $('<h3>').text(nasaDate2)
            var divTitle2 = $('<h2>').text(imgTitle2)
            var divImg2 = $('<img>').attr('src', nasaImg2).css({ 'width': '300px', 'height': 'auto' })
            var description2 = $('<p>').text(imgDesc2)
            $('body').append(nasaDiv2)
            nasaDiv.append(divTitle2, divDate2, divImg2, description2)
            var queryURL3 = `https://api.nasa.gov/planetary/apod?date=${year[2]}-${date}&api_key=${apiKey}`;
            $.ajax({
                url: queryURL3,
                method: 'GET'
            }).then(function (response3) {
                // console.log(response3);
                var nasaDate3 = moment(response3.date).format('dddd, MMMM Do YYYY')
                var imgDesc3 = response3.explanation
                var imgTitle3 = response3.title
                var nasaImg3 = response3.url
                var nasaDiv3 = $('<div>')
                var divDate3 = $('<h3>').text(nasaDate3)
                var divTitle3 = $('<h2>').text(imgTitle3)
                var divImg3 = $('<img>').attr('src', nasaImg3).css({ 'width': '300px', 'height': 'auto' })
                var description3 = $('<p>').text(imgDesc3)
                $('body').append(nasaDiv3)
                nasaDiv.append(divTitle3, divDate3, divImg3, description3)
                var queryURL4 = `https://api.nasa.gov/planetary/apod?date=${year[3]}-${date}&api_key=${apiKey}`;
                $.ajax({
                    url: queryURL4,
                    method: 'GET'
                }).then(function (response4) {
                    // console.log(response4);
                    var nasaDate4 = moment(response4.date).format('dddd, MMMM Do YYYY')
                    var imgDesc4 = response4.explanation
                    var imgTitle4 = response4.title
                    var nasaImg4 = response4.url
                    var nasaDiv4 = $('<div>')
                    var divDate4 = $('<h3>').text(nasaDate4)
                    var divTitle4 = $('<h2>').text(imgTitle4)
                    var divImg4 = $('<img>').attr('src', nasaImg4).css({ 'width': '300px', 'height': 'auto' })
                    var description4 = $('<p>').text(imgDesc4)
                    $('body').append(nasaDiv4)
                    nasaDiv.append(divTitle4, divDate4, divImg4, description4)
                })
            })
        })
    })

}