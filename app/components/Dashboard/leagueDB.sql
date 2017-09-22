CREATE DATABASE LeagueDB;

use LeagueDB;

drop table matches

CREATE TABLE matches (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
champPlayed CHAR(50),
champID CHAR(50),
summonerName CHAR(50),
accountId CHAR(50),
gameId CHAR(50),
role char(35),
runes varchar(1000),
masteries varchar(1000),
items varchar(1000),
team varchar(50),
opponentSummoner varchar(50),
opponentAccountId varchar(50),
opponentChampion varchar(50)
)

CREATE TABLE champById (
champName CHAR(50),
champID CHAR(50)
)

insert into matches
values (
NULL,
'Aatrox', 
'266', 
'Lord Subie', 
'36549557', 
'2576101265',
true,
'MID'
)

select * from matches where champPlayed like '%Veigar%' and opponentChampion like '%Syndra%'