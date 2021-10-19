(function () {
    var locatorSection = document.getElementById("locator-input-section")

    function init() {
        var locatorButton = document.getElementById("locator-button");
        locatorButton.addEventListener("click", locatorButtonPressed)
    }

    function locatorButtonPressed() {
        locatorSection.classList.add("loading")

        navigator.geolocation.getCurrentPosition(function (position) {
                getUserAddressBy(position.coords.latitude, position.coords.longitude)
            },
            function (error) {
                locatorSection.classList.remove("loading")
                alert("The Locator was denied :( Please add your address manually")
            })
    }

    function getUserAddressBy(lat, long) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var address = JSON.parse(this.responseText)
                var input = document.getElementById("autocomplete");
                input.value=address.results[0].formatted_address
                locatorSection.classList.remove("loading")
            }
        };
        xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyBRzU6Dcl8VKMmTVAXWZ50VztX6zetQmag", true);
        xhttp.send();
    }

    function setAddressToInputField(address) {
        var input = document.getElementById("autocomplete");
        input.value = address
        locatorSection.classList.remove("loading")
    }

    init()

})();