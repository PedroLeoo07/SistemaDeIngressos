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

const createVenda = async (req, res) => {
    try {
        const { id, quantidade } = req.body;
        const newVenda = await ingressoModel.createVenda(id, quantidade);
        if (newVenda.error) {
            return res.status(400).json({ message: newVenda.error });
        }
        res.status(201).json(newVenda);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") { 
            return res.status(400).json({ message: "Ingresso já comprado." });
        }
            res.status(500).json({ message: "Erro ao comprar ingresso." });
    }
};

const updateTicket = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const updateTicket = await ingressoModel.updateTicket(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (!updateTicket) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(updateTicket)
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar Ingresso." });
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

module.exports = { getAllTickets, getTicket, createTicket, updateTicket, deleteTicket, getTicketById, createVenda };
