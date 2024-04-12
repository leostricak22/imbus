CREATE TABLE `user3` (
                         `id` int(11) NOT NULL,
                         `name` varchar(50) NOT NULL,
                         `surname` varchar(50) NOT NULL,
                         `username` varchar(50) NOT NULL,
                         `email` varchar(256) NOT NULL,
                         `role` enum('CLIENT','EXPERT') DEFAULT NULL,
                         `password` varchar(256) NOT NULL,
                         `active` tinyint(1) NOT NULL DEFAULT 1,
                         `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;