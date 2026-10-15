create table marital_status (
nama varchar (15),
jk varchar(6),
status varchar (7)
);

insert into marital_status (nama, jk, status)
values
('Irfan', 'Pria', 'Sendiri'),
('Riyan', 'Pria', 'Kawin'),
('Rio', 'Pria', 'Cerai'),
('Nida', 'Wanita', 'Sendiri'),
('Ghefira','Wanita','Kawin'),
('Salsabila', 'Wanita','Cerai') 
;

select * from marital_status;

insert into marital_status (nama, jk, status)
values
('Illyas', 'Pria', 'Cerai');

CREATE VIEW vw_data_pernikahan AS 

SELECT Nama, jk, Status,vw_data_pernikahan,
IF(jk = 'Pria' AND Status = 'Sendiri', 'Bujangan', 
IF(jk = 'Pria' AND Status = 'Kawin', 'Menikah',
IF(jk = 'Pria' AND Status = 'Cerai', 'Duda',
IF(jk = 'Wanita' AND Status = 'Sendiri', 'Perawan',
IF(jk = 'Wanita' AND Status = 'Kawin', 'Menikah', 
'Janda'
))))) 
AS Keterangan,

	IF(jk = 'Pria',
		IF(Status = 'Sendiri', 'Bujangan', IF(Status = 'Kawin', 'Menikah', 'Duda')),
	IF(Status = 'Sendiri', 'Perawan', IF(Status = 'Kawin', 'Menikah', 'Janda'))
	) AS KeteranganIF2,
    
	CASE jk
		WHEN 'Pria' THEN
		CASE Status
			WHEN 'Sendiri' THEN 'Bujangan'
			WHEN 'Kawin' THEN 'Menikah'
			ELSE 'Duda'
		END
		WHEN 'Wanita' THEN
		CASE Status
			WHEN 'Sendiri' THEN 'Perawan'
			WHEN 'Kawin' THEN 'Menikah'
			ELSE 'Janda'
		END
	END AS Keterangan_case,
    
    IF(jk = 'Pria',
    CASE Status
		WHEN 'Sendiri' THEN 'Bujangan'
			WHEN 'Kawin' THEN 'Menikah'
			ELSE 'Duda' 
            END,
		
        CASE Status
        WHEN 'Sendiri' THEN 'Perawan'
			WHEN 'Kawin' THEN 'Menikah'
			ELSE 'Janda' 
            END
            )
            AS Keterangan_MIX,
            
	CASE jk
		WHEN 'Pria' THEN
		IF (Status= 'Sendiri', 'Bujangan', IF(Status = 'Kawin', 'Menikah', 'Duda'))
		WHEN 'Wanita' THEN
			IF(Status = 'Sendiri', 'Perawan', IF(Status = 'Kawin', 'Menikah', 'Janda'))
	END AS Keterangan_MIX2 
            
    
FROM marital_status;

select * from vw_data_pernikahan;




