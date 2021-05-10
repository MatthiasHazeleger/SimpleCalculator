start cmd /k "cd %~dp0\SimpleCalculator & mvn install & java -jar %~dp0\SimpleCalculator\target\SimpleCalculator-0.0.1-SNAPSHOT.jar"

start cmd /k "cd %~dp0\Web\SimpleCalculator & ng serve" 

start "" http://localhost:4200