const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
 // 1. config/config.json에서 데이터베이스 설정을 불러옴
const db = {};

const sequelize = new Sequelize( // 2. new Sequelize를 통해 MySQL 연결 객체 생성
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize; // 3. 연결 객체 나중에 재사용 위해서 db.sequelize에 넣어둠

module.exports = db;