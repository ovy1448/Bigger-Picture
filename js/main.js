// Access an HTML elements to attach an event handlers and set up a functions that will be called whenever the click event is triggered.
document.getElementById("nextRandom").addEventListener("click", nextRandom);
document.getElementById("home").addEventListener("click", home);
console.error("ERROR: Random function doesn't work, idk why. API must have changed. No mention in changelog whatsoever. Quick overview... Random filter works diffretently. It does retrieve a buch of random photos, but the number should have been 18. For some reason the API sends only 10 (default is 1, so that's weird), when home btn clicked, response should be completely different result, but it return the same photos just in different order, next random page btn doesn't work aswell. So I've changed the link for default photos, not random. With next page working the same way. Sadly. Here: https://github.com/ovy1448/Bigger-Picture you can see in a gif, that it worked properly some two weeks ago.")

// Main function that will be called onload.
function loadImages() {
    // Ensures that the right button for the MAIN next page is displayed by changing the style of HTML elements.
    document.getElementById("nextPage").style.display = "none";
    document.getElementById("nextRandom").style.display = "inline-block";
    // Variable with XMLHttpRequest constructor creates a new XMLHttpRequest object.
    var xhr = new XMLHttpRequest();
    // Initializes a newly-created request with given method, custom url (page number) and async.
    xhr.open("GET", "https://api.unsplash.com/photos?per_page=18&page=" + s + "&client_id=15020f1f31839a088aff745486e7a469cd064761ff165c9d3d9f57de77d10348", true);

    // Function is to be executed when the request completes successfully.
    xhr.onload = function () {
        // Status property returns the status code of the response of the XMLHttpRequest. When status is 200, the response is ready and the block of code is executed.
        if (this.status == 200) {
            // Response data (as a string) is parsed into a JavaScript object.
            var images = JSON.parse(this.responseText);

            // New empty variables for later use.
            var output = "";
            var description = "";
            // Loops through the properties of an objects.
            for (var i in images) {
                // If the property of an object has a description, save the properties of the description in variable as a HTML element.
                if (images[i].description != null) {
                    description = '<div id="inner">' + images[i].description + '</div>';
                };
                // Save the url with the description as HTML element in a variable. 
                output += '<div class="container">' +
                    '<img src="' + images[i].urls.small + '">' +
                    description +
                    '</div>'
            };
            // The innerHTML property sets the HTML content of an element.
            document.getElementById("images").innerHTML = output;
            // Reset the form input.
            document.getElementById("engine").reset();
        };
    };
    // Sends the request to the server.
    xhr.send();

};

// Create new default variable for a next page.
var s = 1;
// Function that will be called on the click of the next page button.
function nextRandom() {
    // Increment the number everytime the next page button is clicked. Number is passed as a number of the page as part of the url.
    s += 1;
    // Scroll to top.
    window.scrollTo(0, 0);
    // Call function with a new page number.
    return loadImages();
};

// Function that will be called on the click of the home button.
function home() {
    // Reload the current document.
    location.reload(true);
};
