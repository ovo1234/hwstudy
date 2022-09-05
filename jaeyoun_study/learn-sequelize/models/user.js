const Sequelize = require("sequelize");

module.exports = class User
  // User모델은 Sequelize.Model을 확장한 클래스로 선언
  extends (
    Sequelize.Model
  ) {
  // 모델은 크게 static init 메서드와 static associate메서드로 나뉨
  static init(sequelize) {
    // init메서드는 테이블에 대한 설정
    return super.init(
      {
        // super.init 첫 번째 인수 -> 테이블 컬럼에 대한 설정
        // id는 sequelize가 알아서 기본 키로 연결
        name: {
          type: Sequelize.STRING(20), // 시퀄라이즈의 자료형은 mysql과 조금 다름
          // VARCHAR = STRING
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          // INT = INTEGER
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          // TINYINT = BOOLEAN
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          // DATETIME = DATE
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        // super.init 두 번째 인수 -> 테이블 자체에 대한 설정
        sequelize,
        // static init 메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야함 model/indes.js에서 연결하면 됌
        timestamps: false,
        // true면 createdAt과 updatedAt 컬럼을 추가함 -> 각각 로우가 생성될 때와 수정될 때 시간이 자동으로 입력됨
        underscored: false,
        // 시퀄라이즈가 테이블,컬럼명을 캐멀케이스로 만들어서 스네이크 케이스로 바꾸는 옵션
        modelName: "User", // 기본적으로 모델명은 소문자 및 복수형
        tableName: "users",
        paranoid: false,
        // true설정시 deleteAt이라는 컬럼 생김 -> 로우삭제시 완전히 지워지지않고 deleteAt에 지운 시각이 기록된다. 나중에 로우 복구하려면 true로
        charset: "utf8",
        collate: "utf8_general_ci",
        // 이 두개 설정해야 한글로 나옴
      }
    );
  }
  static associations(db) {}
  // associations메서드는 다른 모델과의 관계를 적음
};
