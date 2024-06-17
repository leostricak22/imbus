CREATE TABLE comments (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          user_id INT NOT NULL,
                          description TEXT,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          small_fix_id INT NOT NULL,
                          CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id),
                          CONSTRAINT fk_small_fix FOREIGN KEY (small_fix_id) REFERENCES smallfixes(id)
);
