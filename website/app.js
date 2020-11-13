/* Global Variables */
const apiEndPoint = "api.openweathermap.org";
const apiKey = "081a059f88749d9d3c5a61e73985ef20";
const country = "us";

// Create a new date instance dynamically with JS
function getTodaysDateString() {
  const todaysDate = new Date();
  const todaysDateAsStr =
    todaysDate.getMonth() +
    1 +
    "." +
    todaysDate.getDate() +
    "." +
    todaysDate.getFullYear();
  return todaysDateAsStr;
}

function addEventListeners() {
  document.getElementById("generate").addEventListener("click", async () => {
    const zipValue = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    await getData(zipValue, country, feelings);
    await showData();
  });
}

addEventListeners();

async function getData(zip, country, feellings) {
  const { data } = await axios.get(
    `http://${apiEndPoint}/data/2.5/weather?zip=${zip},${country}&appid=${apiKey}`
  );
  await postToServer({
    temperature: data.main.temp,
    date: getTodaysDateString(),
    userResponse: feellings,
  });
}

async function postToServer(data) {
  return await axios.post("/weather-object", data);
}

async function showData() {
  try {
    const response = await axios.get("/weather-object");
    if (response.error) alert(response.error);
    document.getElementById("date").innerHTML = response.data.date;
    document.getElementById("temp").innerHTML = response.data.temperature;
    document.getElementById("content").innerHTML = response.data.userResponse;
  } catch (ex) {
    alert(ex.message);
  }
}
