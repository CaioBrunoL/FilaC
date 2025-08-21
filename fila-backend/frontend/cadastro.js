document.getElementById("cadastroForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const servico = document.querySelector("select[name='servico']").value;
    const prioridade = parseInt(document.querySelector("select[name='prioridade']").value);

    const payload = {
        nome,
        servico,
        prioridade
    };

    try {
        const response = await fetch("http://localhost:8000/pacientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.json();
            alert("✅ Usuário cadastrado com sucesso!");
            document.getElementById("cadastroForm").reset();
        } else {
            const err = await response.text();
            alert("❌ Erro ao cadastrar: " + err);
        }
    } catch (error) {
        alert("❌ Erro de conexão com o servidor.");
        console.error(error);
    }
});
