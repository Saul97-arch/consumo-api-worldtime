const zeroAEsquerda = (n) => {
  if (n < 10) {
    return "0" + n;
  }
  return n;
};

function addsec(objeto) {
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
    document.querySelector(".time").innerHTML = "carregando...";
    document.querySelector(".time").innerHTML =
      zeroAEsquerda(Cdata.getDate()) +
      "/" +
      zeroAEsquerda(Cdata.getMonth() + 1) +
      "/" +
      Cdata.getFullYear() +
      "<br>" +
      zeroAEsquerda(Cdata.getHours()) +
      ":" +
      zeroAEsquerda(Cdata.getMinutes()) +
      ":" +
      zeroAEsquerda(Cdata.getSeconds()) +
      "s";
  }, 1000);
}

fetch("https://worldtimeapi.org/api/ip")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    document.querySelector(".place").innerHTML = data.timezone;
    document.querySelector(".ip").innerHTML = data.client_ip;
    document.querySelector(".utc").innerHTML = "GMT: " + data.utc_offset;
    addsec(data.datetime);
  });
