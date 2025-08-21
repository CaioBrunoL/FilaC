from fastapi import APIRouter
from pydantic import BaseModel
from database.criacao import conectar

router = APIRouter()

# Modelo para o corpo da requisição
class Paciente(BaseModel):
    nome: str
    servico: str
    prioridade: int  # 1 = Prioridade, 2 = Normal

@router.post("/pacientes")
def cadastrar_paciente(paciente: Paciente):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO pacientes (nome, servico, prioridade) VALUES (?, ?, ?)",
        (paciente.nome, paciente.servico, paciente.prioridade)
    )
    conn.commit()
    conn.close()
    return {"mensagem": "Paciente cadastrado com sucesso!"}

@router.get("/pacientes")
def listar_pacientes():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT id, nome, servico, prioridade FROM pacientes")
    pacientes_raw = cursor.fetchall()
    conn.close()
    pacientes = []
    for p in pacientes_raw:
        pacientes.append({
            "id": p[0],
            "nome": p[1],
            "servico": p[2],
            "prioridade": p[3]
        })
    return pacientes

@router.delete("/pacientes/{id}")
def chamar_paciente(id: int):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM pacientes WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return {"mensagem": "Paciente chamado e removido da fila."}

@router.post("/pacientes/chamar")
def chamar_proximo_paciente():
    conn = conectar()
    cursor = conn.cursor()

    # Ordena por prioridade (1 = prioridade, 2 = normal) e depois pelo ID
    cursor.execute("SELECT * FROM pacientes ORDER BY prioridade ASC, id ASC LIMIT 1")
    paciente = cursor.fetchone()

    if paciente:
        paciente_dict = {
            "id": paciente[0],
            "nome": paciente[1],
            "servico": paciente[2],
            "prioridade": paciente[3],
        }

        cursor.execute("DELETE FROM pacientes WHERE id = ?", (paciente[0],))
        conn.commit()
        conn.close()

        return {"cliente": paciente_dict}
    else:
        conn.close()
        return {"mensagem": "Nenhum paciente na fila."}
