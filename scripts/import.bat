mysql -u root -p -e "drop database stem2dev_db"

mysql -u root -p -e "create database stem2dev_db"

mysql -u root -p -e "set GLOBAL time_zone = '+00:00'"

mysql -u root -p -e "SELECT @@global.time_zone, @@session.time_zone"

mysql -u root -p stem2dev_db < stem2dev_db.sql