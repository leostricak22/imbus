CREATE TABLE user (
     `id` int(11) NOT NULL,
     `name` varchar(50) NOT NULL,
     `surname` varchar(50) NOT NULL,
     `username` varchar(50) NOT NULL,
     `email` varchar(256) NOT NULL,
     `role` enum('CLIENT','EXPERT') DEFAULT 'CLIENT',
     `password` varchar(256) NOT NULL,
     `active` tinyint(1) NOT NULL DEFAULT 1,
     `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8mb3_general_ci;

ALTER TABLE user
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `email` (`email`),
    ADD UNIQUE KEY `username` (`username`);

ALTER TABLE user
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;