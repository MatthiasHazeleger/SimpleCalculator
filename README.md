# SimpleCalculator

## User instructions:
- Make sure java 11 and Angular are installed globally on your pc.
- double click Run.bat (Windows only)

## Developer Instructions:

### Run backend:
- install Java 11 if needed
- install Maven if needed
- Add Maven to the system PATH if needed (for Windows users)
- open Command Prompt in the project folder
- type: mvn spring-boot:run

### Run frontend:
- install npm and Angular if needed
- open Command Prompt in the project folder
- type: cd Web/SimpleCalculator
- type: npm i
- type: ng serve

### Access:
Frontend will be hosted on localhost:4200
Backend will be hosted on localhost:8080
Database will be accessable on localhost:8080/h2-console
	username: sa
	password: password
	jdbc-url: jdbc:h2:file:./data