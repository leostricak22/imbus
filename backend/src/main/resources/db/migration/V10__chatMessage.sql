CREATE TABLE chat_message (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255),
  receiver_name VARCHAR(255),
  date VARCHAR(255),
  sender_name VARCHAR(255),
  status VARCHAR(255)
);