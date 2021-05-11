start cmd /k "cd %~dp0\SimpleCalculator & mvnw.cmd clean install & mvnw spring-boot:run"

start cmd /k "cd %~dp0\Web\SimpleCalculator & npm i & http-server dist/SimpleCalculator" 

start "" http://localhost:8080