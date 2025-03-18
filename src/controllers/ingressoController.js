const ingressoModel = require("../models/ingressoModel");

const getAllTickets = async (req, res) => {
    try {
        const tickets = await ingressoModel.getTickets();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar ingressos." });
    }
};

const getTicket = async (req, res) => {
    try {
        const ticket = await ingressoModel.getTicketById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(ticket);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar ingresso." });
    }
};

const createTicket = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;

        if (categoria === "Pista" && preco < 100) {
            return res.status(400).json({ message: "O preço mínimo para Pista é R$100,00." });
        } else if (categoria === "Pista VIP" && preco < 200) {
            return res.status(400).json({ message: "O preço mínimo para Pista VIP é R$200,00." });
        } else if (categoria === "Camarote" && preco < 300) {
            return res.status(400).json({ message: "O preço mínimo para Camarote é R$300,00." });
        } else if (categoria === "Arquibancada" && preco < 80) {
            return res.status(400).json({ message: "O preço mínimo para Arquibancada é R$80,00." });
        }

        const newIngresso = await ingressoModel.createTicket(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return res.status(400).json({ message: "Ingresso já cadastrado." });
        }
        res.status(404).json({ message: "Erro ao criar ingresso." });
    }
};

const realizarVenda = async (req, res) => {
    try {
        const { id, quantidade } = req.body;
        const ingresso = await ingressoModel.getTicketById(id);

        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }

        if (ingresso.quantidade_disponivel < quantidade) {
            return res.status(400).json({ message: "Ingressos insuficientes para a venda." });
        }

        ingresso.quantidade_disponivel -= quantidade;
        const updateIngresso = await ingressoModel.updateTicket(id, ingresso.evento, ingresso.local, ingresso.data_evento, ingresso.categoria, ingresso.preco, ingresso.quantidade_disponivel);

        res.status(200).json({
            mensagem: "Compra realizada com sucesso!",
            evento: updateIngresso.evento,
            categoria: updateIngresso.categoria,
            quantidade_comprada: quantidade,
            quantidade_restante: updateIngresso.quantidade_disponivel
        });
    } catch (error) {
        console.error("Erro ao realizar venda:", error);
        res.status(500).json({ message: "Erro ao realizar venda." });
    }
};


const updateTicket = async (req, res) => {
    try {
        const { evento, local, data_evento, categaoria, preco, quantidade_disponivel } = req.body;
        const updatedTicket = await ingressoModel.updateTicket(req.params.id, evento, local, data_evento, categaoria, preco, quantidade_disponivel);
        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket não encontrado." });
        }
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar ticket." });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const message = await ingressoModel.deleteTicket(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar ticket." });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await ingressoModel.getTicketById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket não encontrado." });
        }
        res.json(ticket);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar ticket." });
    }
};

module.exports = { getAllTickets, getTicket, createTicket, updateTicket, deleteTicket, getTicketById, realizarVenda };
