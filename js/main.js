// Access an HTML elements to attach an event handlers and set up a functions that will be called whenever the click event is triggered.
document.getElementById("nextRandom").addEventListener("click", nextRandom);
document.getElementById("home").addEventListener("click", home);

// Main function that will be called onload.
function loadImages() {
    // Ensures that the right button for the MAIN next page is displayed by changing the style of HTML elements.
    document.getElementById("nextPage").style.display = "none";
    document.getElementById("nextRandom").style.display = "inline-block";
    // Variable with XMLHttpRequest constructor creates a new XMLHttpRequest object.
    var xhr = new XMLHttpRequest();
    // Initializes a newly-created request with given method, custom url (page number) and async.
    xhr.open("GET", "https://api.unsplash.com/photos/random?count=18&page=" + s + "&client_id=15020f1f31839a088aff745486e7a469cd064761ff165c9d3d9f57de77d10348", true);

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
                if (images[i].user.name != null) {
                    description = '<div id="inner">' + images[i].user.name + '</div>';
                } else {
                    description = ""; ;
                }
                // Save the url with the description as HTML element in a variable. 
                output += '<div class="container">' +
                    '<a target="_blank" href="'+images[i].user.links.html+'"><img src="' + images[i].urls.small + '">' +
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
var s = 0;
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
    loadImages()
};
