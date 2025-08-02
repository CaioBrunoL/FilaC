from pydantic import BaseModel
from typing import Literal, Optional

class Cliente(BaseModel):
    nome: str
    prioridade: bool
    servico: Literal["Cadastro único", "Passe Livre", "Sala dos Técnicos"]
    senha: Optional[str] = None