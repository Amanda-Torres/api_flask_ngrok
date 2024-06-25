document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://6ad7-34-86-128-22.ngrok-free.app"; // Defina aqui a URL da sua API

  function limparLista() {
    document.getElementById("resultado-lista").innerHTML = "";
  }

  async function chamarRota(rota) {
    try {
      const response = await fetch(`${apiUrl}${rota}`, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return console.error(`Erro ao chamar a rota [${rota}]`, error);
    }
  }
  
  // Botão "Listar de alunos"
  document
    .getElementById("btn-listar-alunos")
    .addEventListener("click", function () {
      limparLista();
      chamarRota("/listar_alunos").then((alunos) => {
        const resultadoLista = document.getElementById("resultado-lista");
        const h3 = document.createElement("h3");
        h3.textContent = 'Lista de alunos:';
        resultadoLista.appendChild(h3);
        alunos.forEach(aluno => {
          const li = document.createElement("li");
          li.textContent = aluno;
          resultadoLista.appendChild(li)
        });
      });
    });

  // Botão "Listar mensagens do aluno"
  document
    .getElementById("btn-listar-mensagens-aluno")
    .addEventListener("click", function () {
      limparLista();
      const aluno = prompt("Qual aluno quer verificar as mensagens?");
      chamarRota(`/mensagens_do_aluno/${aluno}`).then((mensagens) => {
        const resultadoLista = document.getElementById("resultado-lista");
        const h3 = document.createElement("h3");
        h3.textContent = `Mensagens do aluno ${aluno}:`;
        resultadoLista.appendChild(h3);
        mensagens.forEach(mensagem => {
          const li = document.createElement("li");
          li.textContent = mensagem;
          resultadoLista.appendChild(li)
        });
      })
    });

  // Botão "Encontrar alunos por palavra"
  document
    .getElementById("btn-encontrar-alunos-por-palavra")
    .addEventListener("click", function () {
      limparLista();
      const palavra = prompt("Qual palavra você quer pesquisar no chat?");
      chamarRota(`/find_response/${palavra}`).then((alunos) => {
        const resultadoLista = document.getElementById("resultado-lista");
        const h3 = document.createElement("h3");
        h3.textContent = `Alunos que citaram a palavra: ${palavra}`;
        resultadoLista.appendChild(h3);
        alunos.forEach(aluno => {
          const li = document.createElement("li");
          li.textContent = aluno;
          resultadoLista.appendChild(li)
        });
      })
  });

  // Botão "Rei do Chat"
  document
    .getElementById("btn-rei-do-chat")
    .addEventListener("click", function () {
      limparLista();
      chamarRota(`/rei_do_chat`).then((data) => {
        const resultadoLista = document.getElementById("resultado-lista");
        const h3 = document.createElement("h3");
        h3.textContent = `Rei do Chat: ${data.most_active_participant} (${data.message_count} mensagens)`;
        resultadoLista.appendChild(h3);
      })
  });
});
