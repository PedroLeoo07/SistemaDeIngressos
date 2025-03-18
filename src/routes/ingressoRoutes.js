const express = require("express");
const ingressoController = require("../controllers/ingressoController");

const router = express.Router();

router.get("/tickets", ingressoController.getAllTickets);
router.get("/tickets/:id", ingressoController.getTicketById);
router.post("/tickets", ingressoController.createTicket);
router.put("/tickets:id", ingressoController.updateTicket);
router.delete("/:id", ingressoController.deleteTicket);

module.exports = router;