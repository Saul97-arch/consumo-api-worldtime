const urlTimeZone = `https://worldtimeapi.org/api/timezone/`;

const data = document.querySelectorAll(".data");
const date = document.querySelectorAll(".date");
const time = document.querySelectorAll(".time");
const gmt = document.querySelectorAll(".gmt");

const getCountries = (url) => {
  // Pego do w3shchools
  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const zeroAEsquerda = (n) => {
    if (n < 10) return "0" + n;
    return n;
  }

  const addsec = (objeto, i) => {
    let ano = parseInt(objeto.substring(0, 4));
    let mes = objeto.substring(5, 7);
    let dia = objeto.substring(8, 10);

    let h = objeto.substring(11, 13);
    let m = objeto.substring(14, 16);
    let s = objeto.substring(17, 19);

    let Cdata = new Date(ano, mes - 1, dia, h, m, s);
    setInterval(function () {
      let auxi = Cdata.getSeconds();
      Cdata.setSeconds(auxi + 1);
      date[i].innerHTML =
        zeroAEsquerda(Cdata.getDate()) +
        "/" +
        zeroAEsquerda((Cdata.getMonth() + 1)) +
        "/" +
        zeroAEsquerda(Cdata.getFullYear()) +
        "<br>" +
        zeroAEsquerda(Cdata.getHours()) +
        ":" +
        zeroAEsquerda(Cdata.getMinutes()) +
        ":" +
        zeroAEsquerda(Cdata.getSeconds()) +
        "s";
    }, 1000);
  };

  axios.get(url).then((response) => {
    // console.log(response);
    Array.from(data).map((element, index) => {
      const randPos = response.data[getRndInteger(0, response.data.length)];
      element.innerHTML = randPos;

      // Renderizando data
      axios
        .get(`https://worldtimeapi.org/api/timezone/${randPos}`)
        .then((res) => {
          // console.log(res.data);
          if (res.data.timezone === Array.from(data)[index].innerHTML) {
            //date[index].innerHTML = res.data.datetime;
            addsec(res.data.datetime, index);
          }
        });
    });
  });
};

getCountries(urlTimeZone);
