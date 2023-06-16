CREATE DATABASE IF NOT EXISTS app_db;
CREATE USER 'app_user'@'%' IDENTIFIED WITH mysql_native_password BY 'app_password';
GRANT ALL ON app_db.* TO 'app_user'@'%';
