const con = require("../utils/sql");

function tableInit() {
    con.query(`create table if not exists USERS(
        Id int not null auto_increment,
        Name nvarchar(255) not null,
        Password nvarchar(255) not null,
        Email nvarchar(255) not null unique,
        primary key(Id)
        )`)

    con.query(`create table if not exists LANGUAGES  (
        Id int not null auto_increment, 
        LanguageName nvarchar(255) not null, 
        LanguageCode nvarchar(255) not null unique, 
        primary key(Id)
        )`)

    con.query(`create table if not exists SOURCE_WORDS (
        Id int not null auto_increment primary key,
        UserId int not null references USERS(Id), 
        SourceWors nvarchar(255) not null,
        SourceLang int not null references LANGUAGES(Id),
        index(SourceWors),
        unique(SorceWord, SourceLang)
        )`)

    con.query(`create table if not exists TRANSLATE_WORDS (
        Id int auto_increment primary key,
        SourceId int not null ,
        TranslateWord nvarchar(255) not null,
        TranslateLang int not null,
        CreationDate date not null default (curdate()),
        PartOfSpeech nvarchar(255),
        foreign key (SourceId) references SOURCE_WORDS(Id),
        foreign key (TranslateLang) references LANGUAGES(Id),
        foreign key (PartOfSpeech) references PART_OF_SPEECH(Part)
        )`)
        
    con.query(`create table if not exists REPETITION_TYPE (
        Id int not null auto_increment primary key,
        Type nvarchar(255)
        )`)

    con.query(`create table if not exists REPETITION_DATA (
        Id int not null auto_increment primary key,
        TranslateWord int not null,
        Type int not null,
        Lavel int not null,
        Score int,
        RepetitionDate date not null,
        foreign key (TranslateWord) references TRANSLATE_WORDS (Id),
        foreign key (Type) references REPETITION_TYPE (Id)
        )`)
        

    con.query(`create table if not exists PART_OF_SPEECH (
        Part nvarchar(255) primary key
        )`)

    con.query(`create table if not exists GROUP_TYPES (
        Id int auto_increment primary key,
        type nvarchar(255) not null unique
        )`)

    con.query(`create table if not exists GROUPS_OF_WORDS (
        Id int auto_increment primary key,
        GroupType nvarchar(255) not null,
        foreign key (GroupType) references GROUP_TYPES (Type)
        )`)

    con.query(`create table if not exists GROUP_MEMBERS (
        Id int auto_increment primary key,
        GroupId int not null,
        SourceWordId int not null,
        foreign key (GroupId) references GROUPS_OF_WORDS(Id),
        foreign key (SourceWordId) references SOURCE_WORDS(Id),
        unique(GroupId, SourceWordId)
        )`)


}

module.exports = tableInit;