const formulario = document.getElementById("formulario");
const resultado = document.getElementById("Result");
const info = document.getElementById("extrainfo");
const tipo = document.getElementById("type");
const btnSwtich = document.getElementById("switch");
const Navbar = document.querySelector(".navbar");
const MostPbtn = document.getElementById("cores-usadas");
const box = document.querySelector(".box");



tipo.addEventListener("change",function(){
    const valor = this.value;
    if(valor === "rgb"){
        info.textContent = "Digite o RGB sem virgulas e com os espaços adequados, EX: 255 0 0";
    }
    else if(valor === "pantone"){
        info.textContent = "Digite o valor do numero e dê espaço para a letra, EX: 2597 c";
    }
    else if(valor === "cmyk"){
        info.textContent = "Digite o CMYK sem virgulas e com os espaços adequados, EX: 1 10 19 1";
    }
    else if (valor === "hex"){
        info.textContent = "Digite o HEX sem a (#) apenas os numeros e letras sem espaço, EX: ff0000";
    }
    else if(valor === "ral"){
        info.textContent = "Digite apenas o numero da referência RAL, EX: 7024";
    }
});

tipo.dispatchEvent(new Event("change"));

formulario.addEventListener("submit", function(event){
    event.preventDefault();
    const sumy = document.getElementById("Sumary");
    const APIkey = "EPmskteL0bHS49DySwpx2ULudd9dDSF14p765-o390g";
    const corPrimaria = document.getElementById("type").value;
    const corSecundaria = document.getElementById("typer2").value;
    const codigoCor = document.getElementById("CodigoCor").value;

   const url = `http://localhost:3000/conversao?from=${corPrimaria}&input=${codigoCor}&to=${corSecundaria}&apikey=${APIkey}`;
   
   fetch(url)
   .then(Response => Response.json())
   .then(data =>{
   const rgbBackground = data.more_conversions.rgb;
   sumy.innerHTML = "";
   resultado.innerHTML = `
    <div class="box-after">
     <h1>CONVERSÃO</h1>
     <p>${corPrimaria} - ${codigoCor}</p>
     <div class="exibirCor" style="width: 300px;  align-items: center; justify-content: center; text-align: center;  height: 300px; background-color:rgb(${rgbBackground}); border: solid white; border-radius: 50%;"></div>
     <p>${corSecundaria} - ${data.result}</p>
     <p>SEMELHANÇA: <strong>${data.match_percent}</strong></p>
    </div>  
   `
   })
   .catch(error => {
    resultado.innerHTML = `
    <p>Erro na conversão ${error.message}</p>`;
   });
});