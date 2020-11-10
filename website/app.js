/* Global Variables */
const apiEndPoint = "api.openweathermap.org";
const apiKey = "081a059f88749d9d3c5a61e73985ef20";
const country = "us";

/**
 * Gets today's date and parses it as US String: MM/DD/YYYY
 * @return {string} - The date to be showned.
 */
const getTodaysDataAsString = () => {
  const now = new Date();
  return now.getMonth() + "." + now.getDate() + "." + now.getFullYear();
}

async function getData(zip, country, feellings) {
  const { data } = await axios.get(
    `http://${apiEndPoint}/data/2.5/weather?zip=${zip},${country}&appid=${apiKey}`
  );
  await postToServer({
    temperature: data.main.temp,
    date: getTodaysDataAsString(),
    userResponse: feellings,
  });
}

async function postToServer(data) {
  // TODO: manage server errors ?
  return await axios.post("/data-object", data);
}

async function showData() {
  // TODO: manage server errors ?
  const { data } = await axios.get("/data-object");
  document.getElementById("date").innerHTML = data.date;
  document.getElementById("temp").innerHTML = data.temperature;
  document.getElementById("content").innerHTML = data.userResponse;
}

/**
 * Adds all evebt listeners for this app
 */
const addEventListeners = () => {
  onGenerateEvent();
}

/**
 * Adds an event listener for the form click event.
 */
const onGenerateEvent = () => {
  document.getElementById("generate").addEventListener("click", async () => {
    const zipValue = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    await getData(zipValue, country, feelings);
    await showData();
  });  
}

/**
 * Initializes the app
 */
const init = () => {

  addEventListeners();

}

init()