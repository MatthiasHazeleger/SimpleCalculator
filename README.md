# SimpleCalculator

## User instructions

- Make sure java 11 is installed correctly on your machine
- Make sure npm is installed globally on your machine

### Windows:
- double click Run.bat.
- You should be presented with a web page in your default browser.
- After a short wait (<10 seconds or so depending on your machine) you should be presented with the calculator up and running.
- Close the 2 command prompt windows when done.

### Linux/Mac:
- open a new terminal in project folder.
- type: cd SimpleCalculator
- hit enter.
- type: mvnw clean install
- hit enter.
- type: mvnw spring-boot:run
- hit enter.
- open a new terminal in poject folder.
- type: cd Web/SimpleCalculator
- hit enter.
- type: npm i
- hit enter. (if you get any prompts type "y" and press enter)
- type: http-server dist/SimpleCalculator
- hit enter.
- Open Chrome browser and head to http://localhost:4200
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
Frontend will be hosted on localhost:8080
Backend will be hosted on localhost:8081
Database will be accessable on localhost:8080/h2-console
	username: sa
	password: password
	jdbc-url: jdbc:h2:file:./data
