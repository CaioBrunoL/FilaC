document.addEventListener("DOMContentLoaded", carregarFila);

function carregarFila() {
    fetch("http://127.0.0.1:8000/fila")  // Altere a URL se o backend estiver em outra porta
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados da fila");
            }
            return response.json();
        })
        .then(dados => {
            const lista = document.getElementById("listaUsuarios");
            lista.innerHTML = ""; // Limpa a lista antes de adicionar os itens

            dados.forEach(usuario => {
                const item = document.createElement("li");
                const tipoSenha = usuario.prioridade ? "P" : "A";
                item.textContent = `${usuario.senha} - ${usuario.nome} (${usuario.servico})`;
                lista.appendChild(item);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar a lista de usuários:", error);
        });
}

function chamarUsuario() {
    fetch("http://127.0.0.1:8000/fila/chamar", {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => {
        if (data.cliente) {
            // Salva no localStorage
            localStorage.setItem("clienteChamado", JSON.stringify(data.cliente));
            // Vai para a página de chamada
            window.location.href = "chamada.html";
        } else {
            alert(data.mensagem || "Nenhum cliente na fila.");
        }
    })
    .catch(error => {
        console.error("Erro ao chamar cliente:", error);
    });
}
