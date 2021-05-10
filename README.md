# SimpleCalculator

## User instructions

- Make sure java 11, Maven and Angular are installed globally on your pc.

### Windows:
- double click Run.bat.
- You should be presented with a web page in your default browser.
- After a short wait (<10 seconds) you should be presented with the calculator up and running.
- Close the 2 command prompt windows when done.

### Linux/Mac:
- open a new terminal in project folder.
- type: sudo java -jar SimpleCalculator\target\SimpleCalculator-0.0.1-SNAPSHOT.jar
- hit enter.
- open a new terminal in poject folder.
- type: cd Web\SimpleCalculator
- hit enter.
- type: ng serve
- hit enter.
- Open your favourite browser en head to http://localhost:4200
- The calculator should now be up and running.
- Close the 2 terminal windows when done.

## Developer Instructions:

### Run backend:
- install Maven and Java 11 if needed
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