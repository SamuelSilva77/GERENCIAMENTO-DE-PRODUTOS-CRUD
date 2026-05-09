// npx @tailwindcss/cli -i ./css/estilo.css -o ./css/output.css --watch    


// BARRA LATERAL
let barraLateralPai = document.getElementById("barraLateralPai")
let barraLateralFilho = document.getElementById("barraLateralFilho")

//BODY
let body = document.querySelector("body")

//IMG MENU
let menu = document.getElementById("menu")

function AparecerbarraLateral(){
    body.classList.toggle("overflow-hidden")

    menu.classList.toggle("rotate-x-180")

    barraLateralPai.classList.toggle("opacity-0")
    barraLateralPai.classList.toggle("pointer-events-none")

    barraLateralFilho.classList.toggle("w-70")
}


//EXIBIR CAMPO PARA EDITAR PRODUTOS
let campoPaiEditar = document.getElementById("divEditarPai")
let campoFilhoEditar = document.getElementById("divEditarFilho")

function ExibirEditar(){
    body.classList.toggle("overflow-hidden")

    campoPaiEditar.classList.toggle("pointer-events-none")
    campoPaiEditar.classList.toggle("opacity-100")

    campoFilhoEditar.classList.toggle("-translate-y-full")
}

//API

async function api(){
    try{
        const api = await fetch("https://69e42b0bcfa9394db8d9f6e6.mockapi.io/products")
        const dados = await api.json()

        if(!api.ok){
            alert("ERRO, tente novamente mais tarde")
        }

    }catch(err){
        alert("ERRO! tente novamente mais tarde: " + err)
    }
}



//INPUTS
let nome = document.getElementById("nome")
let preco = document.getElementById("preco")
let botaoSalvar = document.getElementById("botaoSalvar")

nome.addEventListener("keyup", (valor) => {
    if(valor.key == "Enter"){
        preco.focus()
    }
})

preco.addEventListener("keyup", (valor) => {
    if(valor.key == "Enter"){
        botaoSalvar.click()
    }
})

botaoSalvar.addEventListener("click", () => {
  alert()

  nome.value = ""
  preco.value = ""
})