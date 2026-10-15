create table agama(
id_agama int (11) primary key auto_increment,
nama_agama varchar (10));

insert into agama (nama_agama) values ('Islam'), ('Katholik'), ('Kristen'), ('Budha'), ('Hindu'), ('Konghu Chu');

select * from agama;

ALTER TABLE pns
ADD id_agama INT,
ADD CONSTRAINT fk_agama
FOREIGN KEY (id_agama) REFERENCES agama(id_agama);

delimiter //
create procedure upd_agm (
sp_nip 		char(18),
sp_agama	varchar(50)
)
begin
update pns set 
id_agama=sp_agama
where 
nip=sp_nip;
end//
delimiter ;

call upd_agm('197309172006011002', '1');
call upd_agm('198201312021012006', '2');
call upd_agm('200901202023071003', '3');
call upd_agm('201406142024111002', '4');
call upd_agm('201511142025082002', '5');
call upd_agm('199210192000101003', '6');

select p.nip, p.nama, a.nama_agama
from pns p, agama a 
where p.id_agama = a.id_agama;


