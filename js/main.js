document.getElementById("nextRandom").addEventListener("click", nextRandom);
document.getElementById("home").addEventListener("click", home);

function loadImages() {
    document.getElementById("nextPage").style.display = "none";
    document.getElementById("nextRandom").style.display = "inline-block";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.unsplash.com/photos/random?count=30&page=" + s + "&client_id=15020f1f31839a088aff745486e7a469cd064761ff165c9d3d9f57de77d10348", true);

    xhr.onload = function () {
        if (this.status == 200) {
            var images = JSON.parse(this.responseText);

            var output = "";
            var description = "";
            for (var i in images) {
                if (images[i].user.name != null) {
                    description = '<div id="inner">' + images[i].user.name + '</div>';
                } else {
                    description = ""; ;
                }
                output += '<div class="container">' +
                    '<a target="_blank" href="'+images[i].user.links.html+'"><img src="' + images[i].urls.small + '">' +
                    description +
                    '</div>'
            };
            document.getElementById("images").innerHTML = output;
            document.getElementById("engine").reset();
        };
    };
    xhr.send();

};

// Create new default variable for a next page.
var s = 0;
function nextRandom() {
    // Increment the number everytime the next page button is clicked. Number is passed as a number of the page as part of the url.
    s += 1;
    // Scroll to top.
    window.scrollTo(0, 0);
    // Call function with a new page number.
    return loadImages();
};

function home() {
    loadImages()
};
