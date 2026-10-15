create database latihan2;

create table pns (
nip char (18) primary key,
nama varchar(255) not null
);

call ins_nip1('199312232000102004','Sri Dwi Darmawati');

call upd_nip('197309172006011002','M. Septiawan');
call upd_nip1('200901202023071003','M. Naufal Dzakiy');

insert into pns (nip, nama)
values
('197309172006011002', 'Mohamad Septiawan'),
('198201312021012006', 'Damayanti'),
('200901202023071003', 'Mohamad Naufal Dzakiy'),
('201406142024111002', 'Mohamad Tsaniy Atila Dzaka'),
('201511142025082002', 'Nabila Tsalsa Nuraisyah');

create view vw_data_pns as

SELECT *, 
date_format(
	str_to_date(
		substring(nip, 1, 8),
	'%Y%m%d'),
'%W, %d %M %Y') 
as tanggal_lahir,

date_format(str_to_date(concat(substring(nip, 9, 6), '01'), '%Y%m%d'),'%M %Y') as tanggal_pns,

if (substring(nip,15,1) = '1', 'Pria', 'Wanita') as jenis_kelamin,

substring(nip, 16,18) as nomor_urut

FROM pns;

update pns set nama='M. Septiawan' where nip='197309172006011002';

select*from vw_data_pns;

select jenis_kelamin, count(jenis_kelamin) as jumlah from vw_data_pns group by jenis_kelamin; 			-- memanggil jumlah data berdasarkan jenis kelamin 





delimiter //
create procedure ins_nip (
sp_nip 	char(18),
sp_nama	varchar(50)
)
begin
insert pns values
(sp_nip, sp_nama);
end//
delimiter //

delimiter //
create procedure upd_nip (
sp_nip 	char(18),
sp_nama	varchar(50)
)
begin
update pns set 
nama=sp_nama
where 
nip=sp_nip;
end//
delimiter //



delimiter //
create procedure jml_jk (
sp_jk varchar (20) 
)
begin 
select jenis_kelamin, count(jenis_kelamin) as jumlah from vw_data_pns where jenis_kelamin=sp_jk group by jenis_kelamin;
end//
delimiter //



call jml_jk('Wanita');
call jml_jk('Pria');




