-- Roles
INSERT INTO roles (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO roles (id, name) VALUES (2, 'ROLE_OWNER');
INSERT INTO roles (id, name) VALUES (3, 'ROLE_ADMIN');

-- Sample Vehicles (optional)
INSERT INTO vehicles (id, owner_email, city, type, model, rate_per_km, available) VALUES
  (1, 'owner1@example.com', 'Chennai', 'Car', 'Toyota Innova', 100, true),
  (2, 'owner2@example.com', 'Bangalore', 'Bus', 'Volvo 9700', 150, true),
  (3, 'owner1@example.com', 'Chennai', 'Van', 'Mahindra Xylo', 80, true);

-- Sample Users (optional, depending on user schema)
-- INSERT INTO users (id, email, password, ...) VALUES (...);
