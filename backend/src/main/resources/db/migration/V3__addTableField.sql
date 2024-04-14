CREATE TABLE field (
   id INT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(50),
   user_id INT,
   FOREIGN KEY (user_id) REFERENCES user(id)
);