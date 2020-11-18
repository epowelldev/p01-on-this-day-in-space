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

        sliderInterval = setInterval(function() {

            // this line takes the custom css variable `--slider-width` which changes on a media breakpoint
                // stores it as a string, removes the "px" from the string, and parseInt the string to use
                // as a variable in my slider pushing the margin to match the width
            sliderActiveWidth = parseInt((getComputedStyle(document.documentElement,null).getPropertyValue('--slider-width')).substr(0, 4));
            // logging the active width
            console.log(sliderActiveWidth);

            // every time `sliderSpeed` ticks, pushing the 'list' of slides to the left one.
            $slideBox.animate({"margin-left": "-=" + sliderActiveWidth}, sliderSpeed, function() {
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
var nasaDateArr = [nasaDate, nasaDate2, nasaDate3, nasaDate4, nasaDate];
var imgDescArr = [imgDesc, imgDesc2, imgDesc3, imgDesc4, imgDesc];
var imgTitleArr = [imgTitle, imgTitle2, imgTitle3, imgTitle4, imgTitle];
var nasaImgArr = [nasaImg, nasaImg2, nasaImg3, nasaImg4, nasaImg];




