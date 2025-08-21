document.addEventListener("DOMContentLoaded", () => {
    const clienteChamado = JSON.parse(localStorage.getItem("clienteChamado"));
    const display = document.getElementById("infoPaciente");

    if (clienteChamado) {
        const prioridade = parseInt(clienteChamado.prioridade);
        let prioridadeTexto = "";

        if (prioridade === 1) {
            prioridadeTexto = "Prioridade";
        } else if (prioridade === 2) {
            prioridadeTexto = "Normal";
        }

        display.innerHTML = `
            <p><strong>Nome:</strong> ${clienteChamado.nome}</p>
            <p><strong>Serviço:</strong> ${clienteChamado.servico}</p>
            <p><strong>Prioridade:</strong> ${prioridadeTexto}</p>
        `;
    } else {
        display.textContent = "Nenhum paciente foi chamado ainda.";
    }
});
