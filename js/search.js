document.getElementById("engine").addEventListener("submit", submitSearch);
document.getElementById("nextPage").addEventListener("click", nextPage);

function submitSearch(e) {
    var text = document.getElementById("text").value;
    if (text.length === 0) {
        alert("Please, fill the form");
    } else {
        searchImage(text);
        document.getElementById("nextPage").style.display = "inline-block";
        document.getElementById("nextRandom").style.display = "none";
    };
    // Prevent form from submitting. The value of the form is passed nonetheless.
    e.preventDefault();
};

function searchImage(text) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.unsplash.com/search/photos?per_page=30&page=" + a + "&query='" + text + "'&client_id=15020f1f31839a088aff745486e7a469cd064761ff165c9d3d9f57de77d10348", true);

    xhr.onload = function () {
        if (this.status == 200) {
            var response = JSON.parse(this.responseText);
            var images = response.results;

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
        };
    };
    xhr.send();
};

// Create new default variable for a next page.
var a = 1;
function nextPage(e) {
    a += 1;
    // Scroll to top.
    window.scrollTo(0, 0);
    // Call function with a new page number.
    return submitSearch(e);
};