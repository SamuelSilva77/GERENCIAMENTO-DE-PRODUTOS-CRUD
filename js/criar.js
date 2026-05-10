// npx @tailwindcss/cli -i ./css/estilo.css -o ./css/output.css --watch

// BARRA LATERAL
let barraLateralPai = document.getElementById("barraLateralPai");
let barraLateralFilho = document.getElementById("barraLateralFilho");

//BODY
let body = document.querySelector("body");

//IMG MENU
let menu = document.getElementById("menu");

function AparecerbarraLateral() {
  body.classList.toggle("overflow-hidden");

  menu.classList.toggle("rotate-x-180");

  barraLateralPai.classList.toggle("opacity-0");
  barraLateralPai.classList.toggle("pointer-events-none");

  barraLateralFilho.classList.toggle("w-70");
}

//API
async function api() {
  try {
    const api = await fetch(
      "https://69e42b0bcfa9394db8d9f6e6.mockapi.io/products",
    );
    const dados = await api.json();

    if (!api.ok) {
      alert("ERRO, tente novamente mais tarde");
    }
  } catch (err) {
    alert("ERRO! tente novamente mais tarde: " + err);
  }
}
api()
//INPUTS
let nome = document.getElementById("nome");
let preco = document.getElementById("preco");
let botaoSalvar = document.getElementById("criar");

nome.addEventListener("keyup", (valor) => {
  if (valor.key == "Enter") {
    preco.focus();
  }
});

preco.addEventListener("keyup", (valor) => {
  if (valor.key == "Enter") {
    botaoSalvar.click();
  }
});

let msg = document.getElementById("msg");
botaoSalvar.addEventListener("click", async () => {
  api();

  if (!nome.value == "" && !preco.value == "") {
    await fetch("https://69e42b0bcfa9394db8d9f6e6.mockapi.io/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nome: nome.value,
        preco: preco.value,
      }),
    });

    msg.classList.remove("bg-red-500");
    msg.classList.add("bg-green-500");
    msg.innerHTML = "Produto criado com Sucesso!";
  } else {
    msg.classList.remove("bg-green-500");
    msg.classList.add("bg-red-500");
    msg.innerHTML = "Preencha Todos os campos!";
  }
  setTimeout(() => {
    msg.innerHTML = "";
  }, 4000);

  nome.value = "";
  preco.value = "";
});

//CRIAR PRODUTO
