ALTER TABLE `imbus`.`user`
    CHANGE `created_at` `created_at` datetime NOT NULL DEFAULT current_timestamp();

ALTER TABLE `imbus`.`ad`
    CHANGE `created_at` `created_at` datetime NOT NULL DEFAULT current_timestamp();
ALTER TABLE `imbus`.`ad`
    CHANGE `do_the_job_from` `do_the_job_from` datetime NOT NULL;
ALTER TABLE `imbus`.`ad`
    CHANGE `do_the_job_to` `do_the_job_to` datetime NOT NULL;