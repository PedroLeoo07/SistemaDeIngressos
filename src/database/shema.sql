CREATE TABLE tickets (
   id SERIAL PRIMARY KEY,
   evento VARCHAR(255),
   local VARCHAR(255),
   data_evento DATE,
   categaoria VARCHAR(50),
   preco DECIMAL(10,2),
   quantidade_disponivel INTEGER 
);

INSERT INTO tickets (evento, local, data_evento, categaoria, preco, quantidade_disponivel) VALUES
    ('Show Morada', 'Quadrangular Valinhos', '04/10/2025', 'Vip', 300, 1245),
    ('Show Oficina G3', 'Quadrangular Valinhos', '07/10/2025', 'Camarote', 500, 45),
    ('Show Fernandinho', 'Quadrangular Valinhos', '10/10/2025', 'Pista', 100, 7000),
    ('Show Banda som e Louvor', 'Quadrangular Valinhos', '12/10/2025', 'Camarote', 500, 1400),
    ('Show Projeto Sola', 'Quadrangular Valinhos', '19/10/2025', 'Arquibancada', 80, 7000);

    

CREATE TABLE venda (
    id SERIAL PRIMARY KEY,
    quantidade INTEGER
);

INSERT INTO venda (quantidade) VALUES
    (1200),
    (1000),
    (500),
    (200);