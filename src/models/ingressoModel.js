
const pool = require("../config/database");

const getTickets = async () => {
    const result = await pool.query("SELECT * FROM tickets");
    return result.rows;
};

const getTicketById = async (id) => {
    const result = await pool.query("SELECT * FROM tickets WHERE id = $1", [id]);
    return result.rows[0];
};

const createTicket = async (evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query(
        "INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [evento, local, data_evento, categoria, preco, quantidade_disponivel]
    );
    if (categoria = "Pista" && preco < 100) {
        return { error: "Preço minimo atingido." };
    } else if (categoria = "Pista VIP" && preco < 200) {
        return { error: "Preço minimo atingido." };
    } else if (categoria = "Camarote" && preco < 300) {
        return { error: "Preço minimo atingido." };
    } else if (categoria = "Arquibancada" && preco < 80) {
        return { error: "Preço minimo atingido." };
    }

    return result.rows[0];
};


const updatedTicket = async (id, evento, local, data_evento, categaoria, preco, quantidade_disponivel) => {
    const result = await pool.query
    ("UPDATE tickets SET evento = $1, local = $2, data_evento = $3, categaoria = $4, preco = $5, quantidade_disponivel = $6 WHERE id = $7 RETURNING *", 
        [evento, local, data_evento, categaoria, preco, quantidade_disponivel, id]);
        return result.rows[0];
}

const deleteTicket = async (id) => { 
    const result = await pool.query("DELETE FROM tickets WHERE id = $1 RETURNING *", [id]); 
    if (result.rowCount === 0) {
        return { error: "Ticket não encontrado." }; 
        }
    return { message: "Ticket deletado com sucesso." };
}  


const createVenda = async (id, quantidade, evento) => {
    const ingresso = await pool.query("SELECT * FROM ingressos WHERE id = $1", [id]);
    let quantidade_disponivel = ingresso.rows[0].quantidade;
    
    if (quantidade_disponivel < quantidade) {
        return { error: "Ingressos insuficientes para a venda." };
    }
    quantidade_disponivel -= quantidade;
     const result = await pool.query(
        "UPDATE ingressos SET quantidade_disponivel = $2 WHERE id = $1 RETURNING *",
        [id, quantidade_disponivel]
    );
    return { message: "Compra realizada com sucesso!", quantidade_disponivel, quantidade};
};


module.exports = { getTickets, getTicketById, createTicket, updatedTicket, deleteTicket, createVenda,};
