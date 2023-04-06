-- SELECT 'CREATE DATABASE eventboard'
--     WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'eventboard');
CREATE DATABASE eventboard;
CREATE ROLE admin LOGIN PASSWORD 'admin';
GRANT ALL PRIVILEGES ON SCHEMA public TO admin WITH GRANT OPTION;\gexec