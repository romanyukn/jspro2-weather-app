/* Global Variables */
const apiEndPoint = "api.openweathermap.org";
const apiKey = "081a059f88749d9d3c5a61e73985ef20";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

function getData() {
  fetch(`http://${apiEndPoint}/data/2.5/weather?zip=94040,us&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

document.getElementById("generate").addEventListener("click", () => {
  getData();
});
