drop schema if exists todo;
Create schema todo;
USE todo;
drop table if exists `user` ;
drop table if exists `userList` ;
drop table if exists `item` ;
drop table if exists `list` ;
drop table if exists `tag` ;
drop table if exists `tagItem` ;

create table `user` (
`userName` varchar(60) , 
`userHashedPassword` varchar(255), 
`email` varchar(255),
Primary key(`userName`)
);

  

   
create table `userList` (
  `listID` INT(11) NOT NULL AUTO_INCREMENT, 
  `userName`  varchar(60) NOT NULL, 
  primary key ( `ListID`, `userName` ),
  FOREIGN KEY (`userName`) REFERENCES `user` (`userName`)
  );
  
    create table `list` (
  `listID` INT(11) NOT NULL , 
  `itemID` INT(11) NOT NULL AUTO_INCREMENT,
  `IsDeleted` enum('T','F') NOT NULL DEFAULT 'F',
  `reminder` datetime default null,
   primary key ( `itemID` , `ListID`),
   FOREIGN KEY (`listID`) REFERENCES `userList` (`listID`)
);

   create table `item` (
  `itemID` INT(11) NOT NULL, 
  `text` varchar(255), 
  `IsDone` enum('T','F') NOT NULL DEFAULT 'F',
  `IsDeleted` enum('T','F') NOT NULL DEFAULT 'F',
  `isTaged`  enum('T','F') NOT NULL DEFAULT 'F',
   primary key ( `itemID` ), 
   FOREIGN KEY (`itemID`) REFERENCES `list` (`itemID`));

create table `tag` (
`tagID` INT(11)  NOT NULL AUTO_INCREMENT,
`tagText` varchar (70),
primary key(`tagID`)
);

create table `tagItem` (
`tagID` INT(11) NOT NULL, 
`itemID` INT(11) NOT NULL,
primary key (`tagID`,`itemID`),
FOREIGN KEY (`itemID`) REFERENCES `item` (`itemID`),
FOREIGN KEY (`tagID`) REFERENCES `tag` (`tagID`)
);   



  
  
  
  
  