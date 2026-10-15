create table lampu_lalin (
lampu varchar (6));

insert lampu_lalin values 
('merah'),
('kuning'),
('hijau');

select lampu, 
if (lampu ='merah' , 'berhenti',
if (lampu ='kuning', 'berhati-hati', 'maju')) as tate from lampu_lalin ;
 
 
select * from lampu_lalin;
