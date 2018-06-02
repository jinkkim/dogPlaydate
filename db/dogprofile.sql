LOAD DATA LOCAL INFILE 'C:/Users/bbmerci/Bootcamp/project/dogPlaydate/db/MOCK_DATA.csv' INTO TABLE dogprofile.dog_info
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\r\n';

SELECT * FROM dogprofile.dog_info;