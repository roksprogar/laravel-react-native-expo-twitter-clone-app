# A React Native (Laravel backend) Twitter clone app built with Expo

The client-react-native folder contains the react native app built with expo.

The server-laravel folder contains the laravel backend.

You can create the mysql database with

```
CREATE DATABASE twitterclonedb;
CREATE USER 'twittercloneusr'@'localhost' IDENTIFIED BY 'twitterclonepwd';
GRANT ALL ON twitterclonedb.* TO 'twittercloneusr'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```
