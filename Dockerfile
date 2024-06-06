FROM maven:3.8.5-openjdk-17

WORKDIR /backend
COPY /backend .

EXPOSE 8080

CMD ["mvn", "clean", "install", "spring-boot:run"]