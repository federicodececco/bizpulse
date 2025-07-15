-- Inserimento User

INSERT INTO users (id, username, password,email) VALUES (1, "gigio", "123456","email@generica.com");

-- Inserimento Transaction
 


INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (2, 1, 1200.00, 'Azienda Srl', 'stipendio', '2025-01-01', 'income');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (3, 1, 55.20, 'Supermercato', 'spesa', '2025-01-05', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (4, 1, 100.00, 'Regalo', 'extra', '2025-01-10', 'income');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (5, 1, 30.50, 'Cinema City', 'intrattenimento', '2025-01-15', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (6, 1, 75.00, 'Ristorante XYZ', 'cibo', '2025-01-20', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (7, 1, 1250.00, 'Azienda Srl', 'stipendio', '2025-02-01', 'income');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (8, 1, 60.00, 'Gas Station', 'trasporti', '2025-02-03', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (9, 1, 200.00, 'Vendita usato', 'vendita', '2025-02-07', 'income');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (10, 1, 45.00, 'Streaming Online', 'abbonamento', '2025-02-15', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (11, 1, 1300.00, 'Azienda Srl', 'stipendio', '2025-03-01', 'income');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (12, 1, 300.00, 'Assicurazione Auto', 'assicurazioni', '2025-03-03', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (13, 1, 80.00, 'Palestra', 'salute', '2025-03-08', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (14, 1, 50.00, 'Regalo ricevuto', 'extra', '2025-03-10', 'income');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (15, 1, 1350.00, 'Azienda Srl', 'stipendio', '2025-04-01', 'income');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (16, 1, 90.00, 'Elettronica Online', 'tecnologia', '2025-04-06', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (17, 1, 25.00, 'Bar', 'cibo', '2025-04-12', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (18, 1, 1400.00, 'Azienda Srl', 'stipendio', '2025-05-01', 'income');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (19, 1, 70.00, 'Taxi', 'trasporti', '2025-05-10', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (20, 1, 60.00, 'Netflix', 'abbonamento', '2025-05-15', 'expense');

INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (21, 1, 1500.00, 'Azienda Srl', 'stipendio', '2025-06-01', 'income');


INSERT INTO goals(id, user_id, goal_name, target_value, current_value, deadline ) VALUES (1, 1, "tetto di spesa", 2000.00, 890.07, "2025-12-31")
INSERT INTO goals(id, user_id, goal_name, target_value, current_value, deadline ) VALUES (2, 1, "risparmi generali", 12000.00, 8350.00, "2025-12-31")