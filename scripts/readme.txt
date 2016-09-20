Setup
-----

You need to setup the executable of MySQL commands e.g.

set PATH=%PATH%;C:\tools\mysql\current\bin;C:\Nodist\bin

Database
--------

To create a database, log into MySQL and create a database called stem2dev_db.sql e.g.

>mysql -u root -p
Enter password: *****
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 55
Server version: 5.5.5-10.1.13-MariaDB mariadb.org binary distribution

Copyright (c) 2000, 2016, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> create database stem2dev_db;
Query OK, 1 row affected (0.08 sec)

mysql>

mysql> quit
Bye

To import MySQL database:

mysql -u root -p stem2dev_db < stem2dev_db.sql

To export MySQL database:

mysqldump -u root -p stem2dev_db > stem2dev_db.sql

Tips:

To see the last 5 executed SQL statements:

select * from mysql.general_log where argument not like '%mysql.general%' order by event_time desc limit 5;

To grant all access from any clients (DO NOT apply this on PRODUCTION!!!):

GRANT ALL ON *.* to admin@'%' IDENTIFIED BY '<replaced with the real password>'; FLUSH PRIVILEGES;

