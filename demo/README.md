
# README for Employee Management System
### Introduction
The Employee Management System is a Java-based application designed for managing employees & their salaries.
# Requirements
### Database
### PostgreSQL 
The application requires a PostgreSQL database to function correctly. 
### Manual Setup
Database Creation: Before running the application, you must manually create a database named Employee Management System in your PostgreSQL server. This database is where all transaction data will be stored and managed. I couldn't create the DB automatically with an init.sql file, because it seems sql files are included only in IJ Idea Ultimate edition, which I currently don't have.
### Why PostgreSQL?
Persistence and Reliability
Non-Volatile Storage: Using PostgreSQL ensures that transaction data is stored in a non-volatile manner. Storing transaction data in an instance attribute of a service class would mean the data is only temporarily held in memory. This approach is volatile, as the data would be lost when the application is stopped or if it encounters an error.
### Requests payload
Info about each payload can be found in the Postman directory. You can also find the API definition here. I've documented every single request: http://localhost:8080/swagger-ui.html
### Data Integrity and Tracking
Security and scalability: PostgreSQL can handle large volumes of data and concurrent transactions, making it suitable for applications that might scale up in terms of data size and user load. Transactions are usually paged in the database, because they are structured.
## Note 
Please ensure that your PostgreSQL server is running and accessible before launching the application, and follow the database creation instructions as outlined above. The DB name must equal the dataSource url name - "Employee Management System".