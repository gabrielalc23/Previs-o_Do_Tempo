const key = "f2bfb5c7eb5e9644008ce92af261a274";

function printar(dados) {
    const cityPrevElement = document.querySelector(".city_prev");
    const tempElement = document.querySelector(".temp");
    const txtPrevElement = document.querySelector(".txt-prev");
    const waterElement = document.querySelector(".water");
    const imgPrevElement = document.querySelector(".img-prev");

    if (cityPrevElement && tempElement && txtPrevElement && waterElement && imgPrevElement) {
        cityPrevElement.innerHTML = "Tempo em " + dados.name;
        tempElement.innerHTML = Math.floor(dados.main.temp) + "ºC";
        txtPrevElement.innerHTML = dados.weather[0].description;
        waterElement.innerHTML = "Umidade " + dados.main.humidity + "%";
        imgPrevElement.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    } else {
        console.error("Elementos HTML não encontrados. Verifique suas classes.");
    }
}

async function searchCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt&units=metric`);
        if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
        }

        const dados = await response.json();
        printar(dados);
    } catch (error) {
        console.error("Erro na solicitação:", error.message);
    }
}

function btnOnClick() {
    const city = document.querySelector(".city").value.trim(); // Remova espaços em branco extras
    if (city) {
        searchCity(city);
    } else {
        console.error("Por favor, insira o nome da cidade.");
    }
}
