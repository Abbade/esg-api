INSERT INTO public.esg
("name")
VALUES('Environmental');

INSERT INTO public.esg
("name")
VALUES('Social');


INSERT INTO public.esg
("name")
VALUES('Corporate Governance');

INSERT INTO public.subject
(esg_id, "name")
VALUES(1, 'Wast of Water');

INSERT INTO public.subject
(esg_id, "name")
VALUES(1, 'Wast of Light');

INSERT INTO public.subject
(esg_id, "name")
VALUES(1, 'Wast of Paper');

INSERT INTO public.subject
(esg_id, "name")
VALUES(1, 'Garbage Accumulation');

INSERT INTO public.subject
(esg_id, "name")
VALUES(2, 'Harassment');

INSERT INTO public.subject
(esg_id, "name")
VALUES(2, 'Pain');

INSERT INTO public.subject
(esg_id, "name")
VALUES(2, 'Family Emergency');


INSERT INTO public.subject
(esg_id, "name")
VALUES(3, 'Transparency');

INSERT INTO public.subject
(esg_id, "name")
VALUES(3, 'Corruption');

INSERT INTO public.subject
(esg_id, "name")
VALUES(3, 'Data Leak');

INSERT INTO public.responseemail
(subject_id, "name")
VALUES(1, 'To help reduce water costs, our headquarters has a rainwater harvesting system.');

INSERT INTO public.responseemail
(subject_id, "name")
VALUES(2, 'To help reduce light consumption, all head office lamps are LED lamps.');

INSERT INTO public.responseemail
(subject_id, "name")
VALUES(3, 'All company documents are now only virtual documents.');