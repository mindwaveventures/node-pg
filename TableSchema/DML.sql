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




