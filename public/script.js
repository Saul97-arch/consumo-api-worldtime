const urlTimeZone = `https://worldtimeapi.org/api/timezone/`;

const time_zone = document.querySelectorAll(".timezone");
const date = document.querySelectorAll(".date");
const time = document.querySelectorAll(".time");
const gmt = document.querySelectorAll(".gmt");

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const saveLocal = (data) => {
  localStorage.setItem("pos_country", JSON.stringify(data));
};

const savePlaces = (res) => {
  const arrPlaces = [];

  for (let i = 0; i < 12; i++) {
    arrPlaces.push(res.data[getRndInteger(0, 386)]);
  }

  saveLocal(arrPlaces);
};

const breakInFowardSlash = (arr) => {
  const arrBreaked = [];
  for (let i = 0; i < arr.length; i++) {
    arrBreaked.push(arr[i].split("/"));
  }

  return arrBreaked;
};

// nomes das zonas para poder usar como parâmetro na próxima requisição e renderizar
const pos_country = JSON.parse(localStorage.getItem("pos_country")) || [];

const renderTimeZone = (elements, arrPlaces) => {
  elements.forEach((element, index) => {
    element.innerHTML = arrPlaces[index];
  });
};

// Para time zones // REQUISIÇÃO
fetch(urlTimeZone)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    savePlaces(res);
  });

// As informações foram passadas para o local storage, agora tem acessibilidade global, então chamo fora da req
renderTimeZone(time_zone, pos_country);

const breaked = breakInFowardSlash(pos_country);

// `http://worldtimeapi.org/api/timezone/${area}/${location}`;
// data, hora
// Adiando ou atraso em relação à Greenwich

// Função fornecida pela faculdade IV2 para renderizar a data e horário certinho
// REQUISIÇÃO
const renderDate = (items) => {
  for (let i = 0; i < 12; i++) {
    fetch(
      `https://worldtimeapi.org/api/timezone/${breaked[i][0]}/${breaked[i][1]}`
    )
      .then((res) => res.json())
      .then((res1) => {
        // console.log(res1);
        items[i].innerHTML = res1.datetime.substr(0, 10);
      });
  }
};

const zeroToRight = (n) => {
  if (n.length === 7) {
    return n + "0";
  }

  return n;
};

const zeroAEsquerda = (n) => {
  if (n < 10) {
    return "0" + n;
  }
  return n;
};

// REQUISIÇÃO
const renderHour = (items) => {
  for (let i = 0; i < 12; i++) {
    fetch(
      `https://worldtimeapi.org/api/timezone/${breaked[i][0]}/${breaked[i][1]}`
    )
      .then((res) => res.json())
      .then((res) => {
        /* items[i].innerHTML = res.datetime.substr(11, 8); */
        addsec(res.datetime, i);
      });
  }
};

const renderGMT = (items) => {
  for (let i = 0; i < 12; i++) {
    fetch(
      `https://worldtimeapi.org/api/timezone/${breaked[i][0]}/${breaked[i][1]}`
    )
      .then((res) => res.json())
      .then((res) => {
        items[i].innerHTML = "GMT : " + zeroToRight(res.datetime.substr(-6));
      });
  }
};

renderDate(date);
renderHour(time);
renderGMT(gmt);

//Pegar todos os dados das divs date e time, tratar, e atualizar fora da requisição

const dateSplit = () => {
  const arr = [];
  date.forEach((element) => arr.push(element.innerHTML.split("-")));
  return arr;
};

const timeSplit = () => {
  const arr = [];
  time.forEach((element) => arr.push(element.innerHTML.split(":")));
  return arr;
};

// let splited = dateSplit();

function addsec(objeto, i) {
  var ano = parseInt(objeto.substring(0, 4));
  var mes = objeto.substring(5, 7);
  var dia = objeto.substring(8, 10);

  var h = objeto.substring(11, 13);
  var m = objeto.substring(14, 16);
  var s = objeto.substring(17, 19);

  var Cdata = new Date(ano, mes - 1, dia, h, m, s);

  setInterval(function () {
    var auxi = Cdata.getSeconds();
    Cdata.setSeconds(auxi + 1);
    document.querySelectorAll(".time")[i].innerHTML =
     zeroAEsquerda(Cdata.getHours()) +
      ":" +
     zeroAEsquerda(Cdata.getMinutes()) +
      ":" +
     zeroAEsquerda(Cdata.getSeconds()) +
      "s";
  }, 1000);
}
