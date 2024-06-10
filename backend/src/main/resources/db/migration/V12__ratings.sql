CREATE TABLE rating (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        userrating INT,
                        userrated INT,
                        rating INT,
                        description VARCHAR(255) DEFAULT '',
                        FOREIGN KEY (userrating) REFERENCES user(id),
                        FOREIGN KEY (userrated) REFERENCES user(id)
);