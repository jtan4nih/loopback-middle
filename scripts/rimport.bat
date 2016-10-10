mysql -h us-cdbr-iron-east-04.cleardb.net -u bf679ee3067ed5 -p%1 -e "drop database stem2dev_db"

mysql -h us-cdbr-iron-east-04.cleardb.net -u bf679ee3067ed5 -p%1 -e "create database stem2dev_db"

mysql -h us-cdbr-iron-east-04.cleardb.net -u bf679ee3067ed5 -p%1 -e "set GLOBAL time_zone = '+00:00'"

mysql -h us-cdbr-iron-east-04.cleardb.net -u bf679ee3067ed5 -p%1 -e "SELECT @@global.time_zone, @@session.time_zone"

mysql -h us-cdbr-iron-east-04.cleardb.net -u bf679ee3067ed5 -p%1 stem2dev_db < stem2dev_db.sql