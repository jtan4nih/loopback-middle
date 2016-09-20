mysql -u root -p%1 -e "drop database stem2dev_db"

mysql -u root -p%1 -e "create database stem2dev_db"

mysql -u root -p%1 -e "set GLOBAL time_zone = '+00:00'"

mysql -u root -p%1 -e "SELECT @@global.time_zone, @@session.time_zone"

mysql -u root -p%1 stem2dev_db < stem2dev_db.sql