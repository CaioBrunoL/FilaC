from fastapi import APIRouter
from models import Cliente
from database.fila import fila_normal, fila_prioritaria


router = APIRouter()

contador_normal = {"valor": 0}
contador_prioritario = {"valor": 0}

def gerar_senha(tipo: str, contador: dict):
    contador["valor"] += 1
    return f"{tipo}{contador['valor']:03}"

@router.post("/fila")
def adicionar_cliente(cliente: Cliente):
    if cliente.prioridade is True:
        senha = gerar_senha("P", contador_prioritario)
        cliente.senha = senha
        fila_prioritaria.append(cliente)
        return {"mensagem": "Cliente prioritário adicionado", "senha": senha}
    else:
        senha = gerar_senha("A", contador_normal)
        cliente.senha = senha
        fila_normal.append(cliente)
        return {"mensagem": "Cliente adicionado", "senha": senha}

@router.get("/fila")
def listar_filas():
    return fila_prioritaria+fila_normal

@router.post("/fila/chamar")
def chamar_proximo_cliente():
    if fila_prioritaria:
        proximo = fila_prioritaria.pop(0)
        return {"mensagem": "Chamando cliente prioritário", "cliente": proximo}
    
    elif fila_normal:
        proximo = fila_normal.pop(0)
        return {"mensagem": "Chamando cliente", "cliente": proximo}
    
    else:
        return {"mensagem": "Nenhum cliente na fila"}
