REM corrupted data, if any is stored in e.g. C:\Bitnami\dreamfactory-2.4.1-2\mysql\data\ (run SELECT @@DATADIR; to see the real dir)
set MYSQL_HOME=C:\Bitnami\dreamfactory-2.4.1-2\mysql
dir %MYSQL_HOME%\data\stem2dev_db

mysqldump -u root -p --no-data stem2dev_db > stem2dev_db.sql

