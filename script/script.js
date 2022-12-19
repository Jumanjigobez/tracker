//Function to get dom elements

elem = (x) =>{
    return document.querySelector(x)
}


var loading = elem("#loading_screen");

setTimeout(()=>{
    loading.className = "hide";
},3000);
//Search functions
var search = elem(".search"),
    ip_address_part = elem(".ip_address"),
    location_part = elem(".location"),
    timezone_part = elem(".timezone"),
    isp_part = elem(".isp");



//URL Fetch part for the location
let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_B4PNbRU4DcIkpFZ3vnP6TNPrayJKL&ip`
var map = "";
var marker = "";
var myIcon = L.icon({
      iconUrl: './images/icon-location.svg',
      iconSize: [40, 50],
      iconAnchor: [22, 94]

    });
fetch(url).then((response) => response.json())
.then((data) =>{

    ip_address_part.innerText = `${data.ip}`;

    location_part.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;

    timezone_part.innerText = `UTC ${data.location.timezone}`;

    isp_part.innerText = `${data.isp}`;

    //map_part

    map = L.map('map_part').setView([`${data.location.lat}`, `${data.location.lng}`], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 90,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    

    marker = L.marker([`${data.location.lat}`, `${data.location.lng}`], {icon: myIcon}).addTo(map);


    console.log(data);


});

//Start Search function

const startSearch = () =>{
    let searchTerm = search.value;

    if(searchTerm==""){
        alert("Please Enter any Ip Address or Domain Name");
    }else{
        let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_B4PNbRU4DcIkpFZ3vnP6TNPrayJKL&ipAddress=${searchTerm}&domain=${searchTerm}`;

        fetch(url).then((res)=> res.json())
        .then((data)=> {
            ip_address_part.innerText = `${data.ip}`;

        location_part.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;

        timezone_part.innerText = `UTC ${data.location.timezone}`;

        isp_part.innerText = `${data.isp}`;

        //map_part

        map.panTo(L.latLng(`${data.location.lat}`, `${data.location.lng}`));

        marker = L.marker([`${data.location.lat}`, `${data.location.lng}`], {icon: myIcon}).addTo(map);

        });
    }
}