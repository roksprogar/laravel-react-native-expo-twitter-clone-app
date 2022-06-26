CREATE DATABASE twitterclonedb;
CREATE USER 'twittercloneusr'@'localhost' IDENTIFIED BY 'twitterclonepwd';
GRANT ALL ON twitterclonedb.* TO 'twittercloneusr'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;