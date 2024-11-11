const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=8749da4b007b7c2ac320bd38d4542f33&units=metric`
    );
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
