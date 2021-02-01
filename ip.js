const selectContinent = document.getElementById("continente");
const selectRegion = document.getElementById("regions");

const split = (str, sep) => {
  return str.split(sep);
};

selectContinent.addEventListener("change", () => {
  const selecVal = selectContinent.value;
  fetch(`https://worldtimeapi.org/api/timezone/${selecVal}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (selectRegion.childElementCount !== data.length) {
        while (selectRegion.firstChild) {
          selectRegion.removeChild(selectRegion.lastChild);
        }
      }
      for (let i = 0; i < data.length; i++) {
        let splitedVal = split(data[i], "/");
        //Pegar o segundo valor splitado e jogar no select regions
        const opt = document.createElement("option");
        opt.setAttribute("value", splitedVal[1]);
        opt.innerText = splitedVal[1];

        selectRegion.appendChild(opt);
      }
    });
});
