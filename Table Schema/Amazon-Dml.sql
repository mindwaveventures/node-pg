insert into users(user_name) values ('Priya'),('Irshath'),('Sriram'),('Vishnu'),('Ram');
insert into items (item_name,item_count,item_price)values('Pen',10,10);
insert into items (item_name,item_count,item_price)values('DairyMilk',10,10),('LipStick',10,350),('Ponds',10,50),('Compact',10,380);
insert into items (item_name,item_count,item_price)values('Iphone15Pro',10,150000),('CashewNut50g',10,350),('Pepsi',10,50),('Saree',10,250),
('Shawl',10,250);
insert into rating(item_id,user_id,ratingvalue) values (1,1,5);
insert into rating(item_id,user_id,ratingvalue) values (1,2,4);
insert into rating(item_id,user_id,ratingvalue)values(1,3,5);
insert into rating(item_id,user_id,ratingvalue)values(1,3,5),(1,4,3);
insert into rating(item_id,user_id,ratingvalue)values(2,3,5),(2,1,5),(2,4,4);
insert into rating(item_id,user_id,ratingvalue)values(3,1,3),(3,2,5),(3,3,1);
insert into rating(item_id,user_id,ratingvalue)values(4,4,3),(4,5,5),(4,3,1),(4,2,2),(4,1,3);
INSERT INTO rating (item_id, user_id, ratingvalue)
VALUES
  (5, 1, 4),
  (6, 2, 3),
  (7, 3, 5),
  (8, 4, 2),
  (9, 5, 4),
  (10, 1, 1);
 INSERT INTO rating (item_id, user_id, ratingvalue)
VALUES
  (5, 2, 2),
  (5, 3, 4),
  (5, 4, 1),
  (5, 5, 3);
INSERT INTO rating (item_id, user_id, ratingvalue)
VALUES
  (7, 1, 5),
  (7, 2, 4),
  (7, 3, 3);
 INSERT INTO rating (item_id, user_id, ratingvalue)
VALUES
  (6, 2, 5),
  (6, 3, 5),
  (6, 4, 5),
  (6, 5, 5),
  (6,1,5);
 
INSERT INTO rating (item_id, user_id, ratingvalue)
VALUES
  (8, 1, 4),
  (8, 2, 2),
  (8, 3, 5),
  (10, 3, 3),
  (10, 4, 4),
  (10, 5, 1);
delete from rating where rating_id in (19,39);
delete from rating where rating_id between 19 and 39;
alter table rating drop constraint rating_ratingvalue_check;
--ALTER TABLE course_college
--ADD CONSTRAINT course_college_clg_id_fkey
--FOREIGN KEY (clg_id) REFERENCES colleges(college_id) ON DELETE CASCADE;
update items set item_count = item_count +1 where item_id =5;
delete from purchases where purchase_id =19;

update items set item_count = 9 where item_id =4;
select * from purchases order by date_of_order desc;
SELECT purchases.*,items.item_name FROM purchases JOIN items ON purchases.item_id = items.item_id WHERE purchases.user_id = 3
ORDER BY date_of_order desc;

update cart set user_id =1;
update cart set item_id =1 where cart_items_id =1;
update cart set item_name ='Almonds' where cart_items_id =1;
update cart set item_name ='Candy' where cart_items_id in (2,3);
update cart set item_id =2 where cart_items_id in (2,3);
update purchases set user_id =1 where purchase_id between 1 and 4;
update purchases set user_id =2 where purchase_id between 11 and 20;

update purchases set item_id =2 where purchase_id between 1 and 4;
update purchases set item_id =5 where purchase_id between 11 and 14;
update purchases set item_id =4 where purchase_id between 15 and 20;
