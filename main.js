document.getElementById("nextRandom").addEventListener("click", nextRandom);

function loadImages() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.unsplash.com/photos/random?count=18&page=" + s + "&client_id=15020f1f31839a088aff745486e7a469cd064761ff165c9d3d9f57de77d10348", true);

    xhr.onload = function () {
        if (this.status == 200) {
            var images = JSON.parse(this.responseText);

            var output = "";
            for (var i in images) {
                output += '<div class="container">' +
                    '<img src="' + images[i].urls.small + '">' +
                    '<div id="inner">' + images[i].description + '</div>' +
                    '</div>'
            }

            document.getElementById("images").innerHTML = output;
            console.log(images);
        }

    }
    xhr.send();
};

var s = 1;
function nextRandom() {
    s += 1;
    return loadImages();
};
