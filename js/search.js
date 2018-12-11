// Access an HTML elements to attach an event handlers and set up a functions that will be called whenever the click event is triggered.
document.getElementById("engine").addEventListener("submit", submitSearch);
document.getElementById("nextPage").addEventListener("click", nextPage);

// Function that will be called whenever the search submit button is triggered.
function submitSearch(e) {
    // Variable that stores a string, with the value of the text field.
    var text = document.getElementById("text").value;
    // If the text field is empty, return alert.
    if (text.length === 0) {
        alert("Please, fill the form");
    // Else call a function with the value of the text field as a parameter.
    } else {
        searchImage(text);
        // Ensures that the right button for the SEARCH next page is displayed by changing the style of HTML elements.
        document.getElementById("nextPage").style.display = "inline-block";
        document.getElementById("nextRandom").style.display = "none";
    };
    // Prevent form from submitting. The value of the form is passed nonetheless.
    e.preventDefault();
};

// Main function that will be called by other function, if all conditions are met.
function searchImage(text) {
    // Variable with XMLHttpRequest constructor creates a new XMLHttpRequest object.
    var xhr = new XMLHttpRequest();
    // Initializes a newly-created request with given method, custom url (page number and search value) and async.
    xhr.open("GET", "https://api.unsplash.com/search/photos?per_page=18&page=" + a + "&query='" + text + "'&client_id=15020f1f31839a088aff745486e7a469cd064761ff165c9d3d9f57de77d10348", true);

    // Function is to be executed when the request completes successfully.
    xhr.onload = function () {
        // Status property returns the status code of the response of the XMLHttpRequest. When status is 200, the response is ready and the block of code is executed.
        if (this.status == 200) {
            // Response data (as a string) is parsed into a JavaScript object.
            var response = JSON.parse(this.responseText);
            // Accessing nested objects.
            var images = response.results;

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
        };
    };
    // Sends the request to the server.
    xhr.send();
};

// Create new default variable for a next page.
var a = 0;
// Function that will be called on the click of the next page button.
function nextPage(e) {
    // Increment the number everytime the next page button is clicked. Number is passed as a number of the page as part of the url.
    a += 1;
    // Scroll to top.
    window.scrollTo(0, 0);
    // Call function with a new page number.
    return submitSearch(e);
};