const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name : {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true,
            },
            age : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false,
            },
            married : {
                type : Sequelize.BOOLEAN,
                allowNull : false,
            },
            comment : {
                type : Sequelize.TEXT,
                allowNull : true,
            },
            created_at : {
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue : Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps : false, // 로우가 생성, 수정될 때마다 시간이 자동으로 입력
            underscored : false, 
            modelName : 'User', // 모델 이름
            tableName : 'users', // 테이블 이름
            paranoid : false, // deletedAt 이라는 컬럼 생성, 로우 삭제 -> 완전 삭제말고 지운 시각이 기록 / 로우 복원하기 위해
            charset : 'utf8', 
            collate : 'utf8_general_ci',
        });
    }
    static associate(db){
        db.User.hasMany(db.Comment, {
            foreignKey : 'commenter',
            sourceKey : 'id'
        });
    }
};