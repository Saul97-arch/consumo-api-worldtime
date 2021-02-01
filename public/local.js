const selectContinent = document.getElementById("continente");
const selectRegion = document.getElementById("regions");

const split = (str, sep) => {
  return str.split(sep);
};

const zeroAEsquerda = (n) => {
  if (n < 10) {
    return "0" + n;
  }
  return n;
};

// Função pega do projeto da faculdade iv2 no github
function quebra(obj) {
  var separa = obj.split("/");

  var tmz = separa[0];
  separa.shift();
  var regiao = separa;
  if (regiao.length > 1) {
    regiao = regiao.join("/");
  } else {
    regiao = regiao[0];
    if (regiao === undefined) {
      regiao = tmz;
    }
  }

  const regi = [tmz, regiao];
  return regi;
}

selectContinent.addEventListener("change", () => {
  const selecVal = selectContinent.value;
  fetch(`https://worldtimeapi.org/api/timezone/${selecVal}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // Em caso de tiver o mesmo numero de elementos, não iria funfar, mas como todos são diferentes
      if (selectRegion.childElementCount !== data.length) {
        while (selectRegion.firstChild) {
          selectRegion.removeChild(selectRegion.lastChild);
        }
      }

      const uniqueValues = [];

      for (let i = 0; i < data.length; i++) {
        let splitedVal = quebra(data[i]);
        //Pegar o segundo valor splitado e jogar no select regions
        // Resolver o problema dos valores repetidos
        // Jogar em array
        if (!uniqueValues.includes(splitedVal[1])) {
          uniqueValues.push(splitedVal[1]);
        }
      }

      for (let i = 0; i < uniqueValues.length; i++) {
        const opt = document.createElement("option");
        opt.setAttribute("value", uniqueValues[i]);
        opt.innerText = uniqueValues[i];
        selectRegion.appendChild(opt);
      }
    });
});

let Time;

function addsec(objeto) {
  let ano = parseInt(objeto.substring(0, 4));
  let mes = objeto.substring(5, 7);
  let dia = objeto.substring(8, 10);

  let h = objeto.substring(11, 13);
  let m = objeto.substring(14, 16);
  let s = objeto.substring(17, 19);

  let Cdata = new Date(ano, mes - 1, dia, h, m, s);

  Time = setInterval(function () {
    let auxi = Cdata.getSeconds();
    Cdata.setSeconds(auxi + 1);
    document.querySelector(".time").innerHTML = "carregando...";
    document.querySelector(".time").innerHTML =
      zeroAEsquerda(Cdata.getDate()) +
      "/" +
      (zeroAEsquerda(Cdata.getMonth() + 1)) +
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

selectRegion.addEventListener("change", () => {
  const valCont = selectContinent.value;
  const valReg = selectRegion.value;
  console.log(valCont, valReg);

  fetch(`https://worldtimeapi.org/api/timezone/${valCont}/${valReg}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".place").innerHTML = "Carregando...";

      document.querySelector(".place").innerHTML = valCont + "/" + valReg;
      document.querySelector(".utc").innerHTML = "GMT: " + data.utc_offset;
      clearInterval(Time); 
      addsec(data.datetime);
    });
});
