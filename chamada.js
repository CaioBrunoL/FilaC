document.addEventListener("DOMContentLoaded", () => {
    const clienteChamado = JSON.parse(localStorage.getItem("clienteChamado"));
    const display = document.getElementById("usuarioChamado");

    if (clienteChamado) {
        display.textContent = `${clienteChamado.senha} - ${clienteChamado.nome} (${clienteChamado.servico})`;
    } else {
        display.textContent = "---";
    }
});
