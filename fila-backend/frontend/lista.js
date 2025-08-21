document.addEventListener("DOMContentLoaded", carregarFila);

function carregarFila() {
    fetch("http://127.0.0.1:8000/pacientes")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados da fila");
            }
            return response.json();
        })
        .then(dados => {
            const lista = document.getElementById("listaUsuarios");
            lista.innerHTML = "";

            dados.forEach(usuario => {
                const item = document.createElement("li");

                const prioridade = parseInt(usuario.prioridade);
                let prioridadeTexto = "";

                if (prioridade === 1) {
                    prioridadeTexto = "Prioridade";
                } else if (prioridade === 2) {
                    prioridadeTexto = "Normal";
                } else {
                    prioridadeTexto = "Desconhecida";
                }

                item.textContent = `${usuario.nome} - ${usuario.servico} (${prioridadeTexto})`;
                lista.appendChild(item);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar a lista de usuários:", error);
        });
}

function chamarUsuario() {
    fetch("http://127.0.0.1:8000/pacientes/chamar", {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => {
        if (data.cliente) {
            localStorage.setItem("clienteChamado", JSON.stringify(data.cliente));
            window.location.href = "chamada.html";
        } else {
            alert(data.mensagem || "Nenhum cliente na fila.");
        }
    })
    .catch(error => {
        console.error("Erro ao chamar cliente:", error);
    });
}
