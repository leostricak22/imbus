CREATE TABLE offer (
    id INTEGER NOT NULL AUTO_INCREMENT,
    price FLOAT(23),
    selected BIT NOT NULL,
    ad INTEGER,
    expert INTEGER,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

ALTER TABLE offer ADD CONSTRAINT FK_offer_ad
    FOREIGN KEY (ad) REFERENCES ad (id);

ALTER TABLE offer ADD CONSTRAINT FK_offer_expert
    FOREIGN KEY (expert) REFERENCES user (id);