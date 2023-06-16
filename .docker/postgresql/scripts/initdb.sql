CREATE DATABASE IF NOT EXISTS application_db;
CREATE USER application_user with encrypted password 'application_password';
GRANT ALL PRIVILEGES ON DATABASE application_db TO application_user;
