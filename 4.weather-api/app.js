const apiKey = "18edcf34c5d0eb6bb60e843bf9d0be31";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

const getWeather = async () => {
  const city = document.getElementById("city").value;
  if (!city) return alert("Enter a city name");

  try {
    const res = await fetch(`${apiUrl}?q=${city}&units=metric&cnt=7&appid=${apiKey}`);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    const labels = data.list.map(d => d.dt_txt.split(" ")[0]);
    const temps = data.list.map(d => d.main.temp);
    drawChart(labels, temps);
  } catch (err) {
    alert(err.message);
  }
};

const drawChart = (labels, temps) => {
  new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels,
      datasets: [{ label: "Temperature (°C)", data: temps, borderColor: "blue" }]
    },
    options: { responsive: true }
  });
};