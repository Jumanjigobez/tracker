//Function to get dom elements

elem = (x) => {
  return document.querySelector(x);
};

var loading = elem("#loading_screen");

setTimeout(() => {
  loading.className = "hide";
}, 3000);
//Search functions
var search = elem(".search"),
  ip_address_part = elem(".ip_address"),
  location_part = elem(".location"),
  timezone_part = elem(".timezone"),
  isp_part = elem(".isp");

const getUserIP = () => {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => data.ip)
    .catch((error) => {
      console.error("Error fetching IP:", error);
      return null;
    });
};
//URL Fetch part for the location of current user
var usersIp_url = "";
fetch("https://api.ipify.org?format=json")
  .then((res) => res.json())
  .then((data) => (usersIp_url = data.ip))
  .catch((error) => {
    console.error("Error fetching IP:", error);
  });

var url = `https://ipapi.co/${usersIp_url}/json/`;

var map = "";
var marker = "";
var myIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [40, 50],
  iconAnchor: [22, 94],
});

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    ip_address_part.innerText = `${data.ip}`;

    location_part.innerText = `${data.city}, ${data.country} ${data.postal}`;

    timezone_part.innerText = `UTC ${data.utc_offset}`;

    isp_part.innerText = `${data.org}`;

    //map_part
    if (map) {
      // Remove the existing map
      map.off();
      map.remove();
    }

    map = L.map("map_part").setView(
      [`${data.latitude}`, `${data.longitude}`],
      13
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 90,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    marker = L.marker([`${data.latitude}`, `${data.longitude}`], {
      icon: myIcon,
    }).addTo(map);
  })
  .catch((err) => {
    console.error("Error fetching IP:", err);
  });

//Start Search function

const startSearch = () => {
  let searchTerm = search.value;

  if (searchTerm == "") {
    alert("Please Enter Valid Ip Address");
  } else {
    let url = `https://ipapi.co/${searchTerm}/json/`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        ip_address_part.innerText = `${data.ip}`;

        location_part.innerText = `${data.city}, ${data.country} ${data.postal}`;

        timezone_part.innerText = `UTC ${data.utc_offset}`;

        isp_part.innerText = `${data.org}`;

        //map_part
        if (map) {
          // Remove the existing map
          map.off();
          map.remove();
        }

        map = L.map("map_part").setView(
          [`${data.latitude}`, `${data.longitude}`],
          13
        );

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 90,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        marker = L.marker([`${data.latitude}`, `${data.longitude}`], {
          icon: myIcon,
        }).addTo(map);
      })
      .catch((err) => {
        console.error("Error fetching IP:", err);
      });
  }
};
