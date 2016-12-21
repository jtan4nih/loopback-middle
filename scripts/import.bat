REM corrupted data, if any is stored in e.g. C:\Bitnami\dreamfactory-2.4.1-2\mysql\data\ (run SELECT @@DATADIR; to see the real dir)
set MYSQL_HOME=C:\Bitnami\dreamfactory-2.4.1-2\mysql
dir %MYSQL_HOME%\data\stem2dev_db

mysql -u root -p%1 -e "drop database stem2dev_db"

mysql -u root -p%1 -e "create database stem2dev_db"

mysql -u root -p%1 -e "set GLOBAL time_zone = '+00:00'"

mysql -u root -p%1 -e "SELECT @@global.time_zone, @@session.time_zone"

mysql -u root -p%1 stem2dev_db < stem2dev_db.sql