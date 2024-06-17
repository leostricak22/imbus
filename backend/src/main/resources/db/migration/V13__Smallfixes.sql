CREATE TABLE smallfixes (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            creator INT,
                            description TEXT,
                            CONSTRAINT fk_creator FOREIGN KEY (creator) REFERENCES user(id)
);

CREATE TABLE smallfixes_attachments (
                                        smallfixes_id INT,
                                        attachment MEDIUMBLOB,
                                        CONSTRAINT fk_smallfixes FOREIGN KEY (smallfixes_id) REFERENCES smallfixes(id)
);