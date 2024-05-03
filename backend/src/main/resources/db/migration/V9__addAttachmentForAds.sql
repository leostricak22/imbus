alter table user add column profile_image MEDIUMBLOB;
create table ad_attachments (ad_id integer not null, attachments MEDIUMBLOB);
alter table ad_attachments add constraint FKhjd7o8qhsh53mm3rw3ebkpic0 foreign key (ad_id) references ad (id);
