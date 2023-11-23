insert into users(user_name) values ('Priya'),('Irshath'),('Sriram'),('Vaseema'),('kamaraj');
insert into items (item_name,item_count,item_price)values('Pen',10,10);
insert into items (item_name,item_count,item_price)values('DairyMilk',10,10),('LipStick',10,350),('kajalPencil',10,180),('Compact',10,380);
insert into items (item_name,item_count,item_price)values('Iphone15Pro',10,150000),('Primer',10,350),('Concealar',10,50),('Moisture cream',10,250),
('Eyeliner',10,250);
insert into rating(item_id,user_id,ratingvalue) values (1,1,5);
insert into rating(item_id,user_id,ratingvalue) values (1,2,4);
insert into rating(item_id,user_id,ratingvalue)values(1,3,5);
insert into rating(item_id,user_id,ratingvalue)values(1,3,5),(1,4,3);
insert into rating(item_id,user_id,ratingvalue)values(2,3,5),(2,1,5),(2,4,4);
insert into rating(item_id,user_id,ratingvalue)values(3,1,3),(3,2,5),(3,3,1);
insert into rating(item_id,user_id,ratingvalue)values(4,4,3),(4,5,5),(4,3,1),(4,2,2),(4,1,3);