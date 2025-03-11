// CREATE TABLE Schedule_NABH (
//   id NUMBER PRIMARY KEY, 
//   trainingsessionNo VARCHAR2(20) NOT NULL UNIQUE,
//   topicName VARCHAR2(255) NOT NULL,
//   category VARCHAR2(100) NOT NULL,
//   department VARCHAR2(100) NOT NULL,
//   designation VARCHAR2(255) NOT NULL,
//   trainername VARCHAR2(255) NOT NULL,
//   trainingtype VARCHAR2(100) NOT NULL,
//   time DATE NOT NULL,
//   venue VARCHAR2(255) NOT NULL,
//   date DATE NOT NULL
// );

// -- Create a sequence to generate unique ID values
// CREATE SEQUENCE schedule_nabh_seq START WITH 1 INCREMENT BY 1;

// -- Create a trigger to auto-increment ID field before inserting a new record
// CREATE OR REPLACE TRIGGER schedule_nabh_trigger
// BEFORE INSERT ON Schedule_NABH
// FOR EACH ROW
// BEGIN
//   IF :NEW.id IS NULL THEN
//       SELECT schedule_nabh_seq.NEXTVAL INTO :NEW.id FROM dual;
//   END IF;
// END;

{
    "trainingSessionNo": "TS123",
    "topicName": "Cloud Computing",
    "category": "IT",
    "department": "Software",
    "designation": "Software Engineer",
    "trainerName": "John Doe",
    "trainingType": "Technical",
    "fromTrainingTime": "10:00 AM",
    "toTrainingTime": "12:00 PM",
    "venue": "Room 101",
    "trainingDate": "2024-03-07T00:00:00.000Z"
}
