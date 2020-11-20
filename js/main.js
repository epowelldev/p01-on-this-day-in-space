var date = $('#searchDate').val()
var dateArray = JSON.parse(localStorage.getItem('dateArray')) || []

var mainContentBlock = document.querySelector("#main-content-area");

// Function containing Launch Library API call
function launchLibrary(year, date) {
    //console.log(date);
    var launchLibraryURL = 'https://launchlibrary.net/1.3/launch?mode=verbose&';
    var targetDate = date.split('-');
    var startDate = 'startdate=' + year[0] + '-' + targetDate + '-01';
    var endDate = '&enddate=' + year[0] + '-' + targetDate + '-31';

    $.ajax(
        {
            url: launchLibraryURL + startDate + endDate,
            method: "GET",
            tryCount: 0,
            retries: 3,
            success: function (response, textStatus, jqXHR) {
                console.log(response);
                console.log(textStatus);
                console.log(jqXHR);

                var launches = response.launches;
                //console.log(launches);

                var closestDate = launches[getClosestDate(launches, targetDate[1])];
                console.log(closestDate);

                publishLaunch(closestDate);
            },
            error: function (jqXHR, exception) {
                //alert("Launch library error: " + jqXHR.status + exception);
                if (jqXHR.status == 404 && tryCount <= retries) {
                    tryCount++;
                    setTimeout(() => { $.ajax(this) }, 1000);
                }
            }
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

    //console.log(closest);

    for (var i = 1; i < launchDates.length; i++) {
        var date = launchDates[i].net.split(' ');

        if (Math.abs(targetDate - parseInt(date[1])) < closest) {
            closest = Math.abs(targetDate - date[1]);
            count = i;
        }
    }

    return count;
}

// Function to publish launch details to the page. 
// Called by launchLibrary and passed a json object closest to the user entered date.
function publishLaunch(launch) {
    var placeHolder = 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png';
    var name = launch.name;
    var date = launch.net;
    var location = launch.location.name;
    var rocket = launch.rocket.name;
    var rocketImg = launch.rocket.imageURL;

    var launchDiv = $('<div>').attr({'id': 'sub-launch', 'class': 'is-flex is-flex-direction-column is-justify-content-center'});
    var divTitle = $('<h1>').text("Launch activity closest to this date");
    var divName = $('<h2>').text(name);
    var divDate = $('<h3>').text(date);
    var divLoc = $('<h3>').text(location);
    var divRocket = $('<h2>').text(rocket);
    //var divImg = $('<img>').attr('src', rocketImg).css({ 'width': '300px', 'height': 'auto' });
    var missionDiv = $('<div>').attr('id', 'mission');

    $('#launch').append(launchDiv);
    launchDiv.append(divTitle, divName, divDate, divLoc, missionDiv, divRocket);

    // Launch Library sometimes returns a placeholder image
<<<<<<< HEAD
    if (rocketImg !== placeHolder) {
        var divImg = $('<img>').attr('src', rocketImg).css({ 'width': '300px', 'height': 'auto' });
=======
    if(rocketImg !== placeHolder) {
        var divImg = $('<img>').attr('src', rocketImg).css({ 'width': '400px', 'height': 'auto' });
>>>>>>> b1799126cbf7ece9b93b5a54c2831d6cc7c7338e
        launchDiv.append(divImg);
    }

    // video urls and mission details aren't always defined in the response
    if (launch.vidURLs[0]) {
        var vidURL = launch.vidURLs[0].replace("watch?v=", "embed/");
        var videoDiv = $('<iframe>').attr('src', vidURL);
        videoDiv.attr('id', 'video');
        videoDiv.css({ 'width': '400px', 'height': 'auto' });
        launchDiv.append(videoDiv);
    }

    if (launch.missions !== undefined || launch.missions.length != 0) {
        var missionName = launch.missions.name;
        var missionDesc = launch.missions.description;

        var divMissionName = $('<h3>').text(missionName);
        var divMissionDesc = $('<p>').text(missionDesc);

        missionDiv.append(divMissionName, divMissionDesc);
    }
}

var year = []
// click function for search button
$('#searchBtn').click(function (event) {
    event.preventDefault()
    // $('#nasa').empty()
    $('#launch').empty()
    year = []
    date = $('#searchDate').val()
    if (date == '') {
        return
    }

    var targetDate = date.split(/[\s.,-/;:\\]+/)    // splitting with regex

    localStorage.setItem('date', date)
    console.log(targetDate[0] + '-' + targetDate[1])
    randomYear(targetDate[0] + '-' + targetDate[1])
    getNasa(targetDate[0] + '-' + targetDate[1])
    launchLibrary(year, targetDate[0]);
    dateInputs()
    dateList()
    mainContentBlock.classList.remove("hidden-content");
})

// create list for previously searched days
dateList()
function dateList() {
    var datesDiv = $('#dateList')
    datesDiv.empty()
    for (var i = 0; i < dateArray.length; i++) {
        var dates = dateArray[i];
        var optionEl = $('<option>').text(dates).attr('id', dates)
        datesDiv.prepend(optionEl)
    }
}

// push previously searched dates into an array
function dateInputs() {
    // if the date does not already exist in the array push it to array
    if (!(dateArray.includes(localStorage.getItem('date')))) {
        dateArray.push(localStorage.getItem('date'))
    }
    // if array is greater than 5 remove the first index
    if (dateArray.length > 5) {
        dateArray.splice(dateArray[0], 1)
    }
    // store array
    localStorage.setItem('dateArray', JSON.stringify(dateArray))

}

// create random year array
function randomYear(date) {

    while (year.length < 4) {
        var minYr = 0
        if (date <= '06-16') {
            minYr = 1996
        }
        else {
            minYr = 1995
        }
        var randomYr = Math.floor(Math.random() * (parseInt(moment().format('yyyy')) + 1 - minYr) + minYr)
        if (!(year.includes(randomYr))) {
            year.push(randomYr)
        }
    }
}
function getNasa(date) {
    var apiKey = 'Kh6At4nhdqEhFXjs1OINKDv99FrMOgT6XVHJjJCt'
    var queryURL = `https://api.nasa.gov/planetary/apod?date=${year[0]}-${date}&api_key=${apiKey} `;

    $.ajax({
        url: queryURL,
        method: 'GET',
        tryCount: 0,
        retries: 3,
        error: function (jqXHR, exception) {
            if (jqXHR.status == 400 && tryCount <= retries) {
                tryCount++;
                setTimeout(() => { $.ajax(this) }, 1000);
            }
            console.log(jqXHR);
        }
    }).then(function (response) {
        // create div for first call
        var nasaDate = moment(response.date).format('dddd, MMMM Do YYYY')
        var imgDesc = response.explanation
        var imgTitle = response.title
        var nasaImg = response.url

        var queryURL2 = `https://api.nasa.gov/planetary/apod?date=${year[1]}-${date}&api_key=${apiKey}`;
        $.ajax({
            url: queryURL2,
            method: 'GET',
            tryCount: 0,
            retries: 3,
            error: function (jqXHR, exception) {
                if (jqXHR.status == 400 && tryCount <= retries) {
                    tryCount++;
                    setTimeout(() => { $.ajax(this) }, 1000);
                }
            }
        }).then(function (response2) {
            // create div for second call
            var nasaDate2 = moment(response2.date).format('dddd, MMMM Do YYYY')
            var imgDesc2 = response2.explanation
            var imgTitle2 = response2.title
            var nasaImg2 = response2.url

            var queryURL3 = `https://api.nasa.gov/planetary/apod?date=${year[2]}-${date}&api_key=${apiKey}`;
            $.ajax({
                url: queryURL3,
                method: 'GET',
                tryCount: 0,
                retries: 3,
                error: function (jqXHR, exception) {
                    if (jqXHR.status == 400 && tryCount <= retries) {
                        tryCount++;
                        setTimeout(() => { $.ajax(this) }, 1000);
                    }
                }
            }).then(function (response3) {
                // create div for third call
                var nasaDate3 = moment(response3.date).format('dddd, MMMM Do YYYY')
                var imgDesc3 = response3.explanation
                var imgTitle3 = response3.title
                var nasaImg3 = response3.url

                var queryURL4 = `https://api.nasa.gov/planetary/apod?date=${year[3]}-${date}&api_key=${apiKey}`;
                $.ajax({
                    url: queryURL4,
                    method: 'GET',
                    tryCount: 0,
                    retries: 3,
                    error: function (jqXHR, exception) {
                        if (jqXHR.status == 400 && tryCount <= retries) {
                            tryCount++;
                            setTimeout(() => { $.ajax(this) }, 1000);
                        }
                    }
                }).then(function (response4) {
                    // create div for last call
                    var nasaDate4 = moment(response4.date).format('dddd, MMMM Do YYYY')
                    var imgDesc4 = response4.explanation
                    var imgTitle4 = response4.title
                    var nasaImg4 = response4.url

                    nasaDateArr = [nasaDate, nasaDate2, nasaDate3, nasaDate4, nasaDate];
                    imgDescArr = [imgDesc, imgDesc2, imgDesc3, imgDesc4, imgDesc];
                    imgTitleArr = [imgTitle, imgTitle2, imgTitle3, imgTitle4, imgTitle];
                    nasaImgArr = [nasaImg, nasaImg2, nasaImg3, nasaImg4, nasaImg];
                    for (let i = 0; i < nasaDateArr.length; i++) {
                        $sliderTitle[i].textContent = imgTitleArr[i];
                        $sliderDate[i].textContent = nasaDateArr[i];
                        $sliderDesc[i].textContent = imgDescArr[i];
                        if (nasaImgArr[i].includes("youtube")) {
                            $sliderPic[i].innerHTML = `<iframe src="${nasaImgArr[i]}">`;
                        }
                        else {
                            $sliderPic[i].innerHTML = `<img src="${nasaImgArr[i]}">`;
                        }
                    }
                })
            })
        })
    })

}



// SLIDER BEGIN
// target elements and create a list to roll through
var $slider = $("#custom-slider");
var $slideBox = $slider.find(".slider-list");
var $slides = $slideBox.find(".slide-card");

// defined outside, called inside activaly on loop from custom css variable
var sliderActiveWidth;

//just some logs...
// console.log($slider);
// console.log($slideBox);
// console.log($slides);

function spaceSlider() {
    // config of the slier
    var currentSlide = 1;
    var sliderSpeed = 1000;
    var slidePause = 5000;

    var sliderInterval;

    // resume starts the slider on load, and also will be used to resume on mouseleave later
    function resumeSlider() {

        sliderInterval = setInterval(function () {

            // this line takes the custom css variable `--slider-width` which changes on a media breakpoint
            // stores it as a string, removes the "px" from the string, and parseInt the string to use
            // as a variable in my slider pushing the margin to match the width
            sliderActiveWidth = parseInt((getComputedStyle(document.documentElement, null).getPropertyValue('--slider-width')).substr(0, 4));
            // logging the active width
            console.log(sliderActiveWidth);

            // every time `sliderSpeed` ticks, pushing the 'list' of slides to the left one.
            $slideBox.animate({ "margin-left": "-=" + sliderActiveWidth }, sliderSpeed, function () {
                currentSlide++;
                // if the current slide is the last item in the list, change the current slide to the first slide
                if (currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideBox.css("margin-left", 0);
                }
            });
        }, slidePause);

    };

    // used to pasues the slider on mouseover
    function pauseSlider() {
        clearInterval(sliderInterval);
    }

    //start the slider
    $(resumeSlider);

    // on mouseover, pause. on mouseleave, resume
    $slider.on("mouseenter", pauseSlider).on("mouseleave", resumeSlider);

}

//calling MrBigFunction
spaceSlider();


var $sliderTitle = $slides.find(".title-row .title-picture");
var $sliderDate = $slides.find(".title-row .title-date");
var $sliderPic = $slides.find(".picture-row");
var $sliderDesc = $slides.find(".discription-row");

console.log($sliderTitle);
console.log($sliderDate);
console.log($sliderPic);
console.log($sliderDesc);


//arrays set up to update the slider 1-4 and 1 (to start over)
var nasaDateArr;
var imgDescArr;
var imgTitleArr;
var nasaImgArr; 
