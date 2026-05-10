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

//EXIBIR CAMPO PARA EDITAR PRODUTOS
let campoPaiEditar = document.getElementById("divEditarPai");
let campoFilhoEditar = document.getElementById("divEditarFilho");

let elemento = ""
function ExibirEditar(id) {

    elemento = id

    body.classList.toggle("overflow-hidden");
    
    campoPaiEditar.classList.toggle("pointer-events-none");
    campoPaiEditar.classList.toggle("opacity-100");
    
    campoFilhoEditar.classList.toggle("-translate-y-full");

}

//API

async function api() {
  try {
    const api = await fetch(
      "https://69e42b0bcfa9394db8d9f6e6.mockapi.io/products",
    );
    return await api.json();
    if (!api.ok) {
      alert("ERRO, tente novamente mais tarde");
    }
  } catch (err) {
    alert("ERRO! tente novamente mais tarde: " + err);
  }
}

//INPUTS
let nome = document.getElementById("nome");
let preco = document.getElementById("preco");
let botaoSalvar = document.getElementById("botaoSalvar");

nome.addEventListener("keyup", (valor) => {
  if (valor.key == "Enter") {
    preco.focus();
  }
});

preco.addEventListener("keyup", (valor) => {
  if (valor.key == "Enter") {
    EditarProduto()
  }
});

//EDITAR PRODUTOS
async function EditarProduto(){
  if (!nome.value == "" && !preco.value == "") {
    
    await fetch("https://69e42b0bcfa9394db8d9f6e6.mockapi.io/products/" + elemento, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        nome: nome.value,
        preco: preco.value,
      }),
    });


    ExibirEditar()
    CarregarProdutos()


  }else{
    msg.classList.toggle("opacity-100")
    setTimeout(() => {
      msg.classList.toggle("opacity-100") 
    }, 4000);
  }


};

//MODELO DE PRODUTOS (HTML)
function modeloProduto(id, nome, preco) {
  return `
        <div class="w-75 h-55 bg-white rounded-md shadow-xl border px-4 py-8 flex flex-col justify-between" id="${id}">
            <div>
                <p class="font-semibold tracking-wide text-2xl"> ${nome} </p>
                <span class="text-lg"> R$ ${preco},00 </span>
            </div>

            <div>
                <button class="px-8 py-1 rounded-md shadow-sm text-white bg-blue-600 duration-200 hover:bg-blue-700 active:translate-y-0.5" onclick="ExibirEditar(${id})">Editar</button>
                <button class="px-8 py-1 rounded-md shadow-sm text-white bg-red-600 duration-200 hover:bg-red-700 active:translate-y-0.5" onclick="DeletarProduto(${id})">Deletar</button>
            </div>
        </div>
        `;
}

//CARREGAR PRODUTOS
let containerProdutos = document.getElementById("ContainerProdutos");

async function CarregarProdutos() {
  const dados = await api();
  containerProdutos.innerHTML = modeloProduto("", "Produto", "50")
  dados.forEach((item) => {
    containerProdutos.innerHTML += modeloProduto(
      item.id,
      item.nome,
      item.preco,
    );
  });
}
CarregarProdutos();

//DELETAR PRODUTO
async function DeletarProduto(id) {
  await api();
  fetch("https://69e42b0bcfa9394db8d9f6e6.mockapi.io/products/" + id, {
    method: "DELETE",
  });
  let element = document.getElementById(id);
  element.remove();
}
