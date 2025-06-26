-- Inserimento User

INSERT INTO users (id, username, password,email) VALUES (1, "gigio", "123456","email@generica.com");

-- Inserimento Transaction
 
INSERT INTO transactions (id, user_id, amount, vendor, category, date, type) VALUES (1, 1, 10.2, 'negozio-Generico', 'categoria-generica', '2024-01-01', 'frutta');