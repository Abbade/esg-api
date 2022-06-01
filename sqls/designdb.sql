CREATE TABLE userSystem (
  id SERIAL  NOT NULL ,
  email VARCHAR    ,
  passwordSystem VARCHAR    ,
  name VARCHAR    ,
  active BOOL      ,
  emailId VARCHAR,
PRIMARY KEY(id));




CREATE TABLE esg (
  id SERIAL  NOT NULL ,
  name VARCHAR      ,
PRIMARY KEY(id));




CREATE TABLE subject (
  id SERIAL  NOT NULL ,
  esg_id INTEGER   NOT NULL ,
  name VARCHAR      ,
PRIMARY KEY(id)  ,
  FOREIGN KEY(esg_id)
    REFERENCES esg(id));


CREATE INDEX subject_FKIndex1 ON subject (esg_id);


CREATE INDEX IFK_Rel_02 ON subject (esg_id);


CREATE TABLE feedback (
  id SERIAL  NOT NULL ,
  subject_id INTEGER   NOT NULL ,
  esg_id INTEGER   NOT NULL ,
  description VARCHAR      ,
  email VARCHAR,
PRIMARY KEY(id)    ,
  FOREIGN KEY(esg_id)
    REFERENCES esg(id),
  FOREIGN KEY(subject_id)
    REFERENCES subject(id));


CREATE INDEX feedback_FKIndex1 ON feedback (esg_id);
CREATE INDEX feedback_FKIndex2 ON feedback (subject_id);


CREATE INDEX IFK_Rel_01 ON feedback (esg_id);
CREATE INDEX IFK_Rel_03 ON feedback (subject_id);


CREATE TABLE ResponseEmail (
  id SERIAL  NOT NULL ,
  subject_id INTEGER  unique NOT NULL ,
  name VARCHAR      ,
PRIMARY KEY(id)  ,
  FOREIGN KEY(subject_id)
    REFERENCES subject(id));


CREATE INDEX ResponseEmail_FKIndex1 ON ResponseEmail (subject_id);


CREATE INDEX IFK_Rel_04 ON ResponseEmail (subject_id);

ALTER TABLE public.usersystem ADD emailid varchar NULL;




