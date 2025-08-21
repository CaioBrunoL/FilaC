import sqlite3
def conectar():
    conn = sqlite3.connect('pacientes.db')
    return conn

def criar_tabela():
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("""
                   CREATE TABLE IF NOT EXISTS pacientes
                   (
                       id
                       INTEGER
                       PRIMARY
                       KEY
                       AUTOINCREMENT,
                       nome
                       TEXT
                       NOT
                       NULL,
                       servico
                       TEXT
                       NOT
                       NULL,
                       prioridade
                       TEXT
                       NOT
                       NULL
                   )
                   """)

    conn.commit()
    conn.close()