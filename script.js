const tempratureField = document.querySelector(".weather1");
const tempratureInF = document.querySelector(".weather_in_F");
const region = document.querySelector(".region");
const cityField = document.querySelector(".weather2 p");
const emojiField = document.querySelector(".weather3 img");
const condition = document.querySelector(".weather3 span");
const dateTime = document.querySelector(".weather2 span");
const country = document.querySelector(".country");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "Yakutsk";
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=6dbc07b6abcd4651b8d181912231701&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const {
      current: {
        temp_c,
        condition: { text, icon },
        temp_f,
      },
      location: { name, localtime, country, region },
    } = data;

    updateDom(
      temp_c + "°C",
      name,
      localtime,
      data.current.condition.text,
      data.current.condition.icon,
      country,
      temp_f + "°F",
      region
    );
  } catch (error) {
    alert(`${target} - This Location Not Found`);
  }
};
fetchData(target);

function updateDom(
  temp,
  city,
  DateTime,
  Condition,
  emoji,
  Country,
  TempInF,
  Region
) {
  tempratureField.innerText = temp;
  cityField.innerText = city;

  const exactDate = DateTime.split(" ")[0];
  const exactTime = DateTime.split(" ")[1];
  const exactDay = new Date(exactDate).getDay();
  dateTime.innerText = `${exactTime} - ${gettingDays(exactDay)} - ${exactDate}`;

  condition.innerText = Condition;

  emojiField.src = emoji;
  country.innerText = Country;
  tempratureInF.innerText = TempInF;
  region.innerText = Region;
}

function searchResult() {}

function gettingDays(num) {
  switch (num) {
    case 0:
      return "Sunday";
      break;

    case 1:
      return "Monday";
      break;

    case 2:
      return "Tuesday";
      break;

    case 3:
      return "Wednasday";
      break;

    case 4:
      return "Thursday";
      break;

    case 5:
      return "Friday";
      break;

    case 6:
      return "Saturdauy";
      break;
  }
}

const search = (e) => {
  e.preventDefault();

  target = searchField.value;

  fetchData(target);
};

form.addEventListener("submit", search);
