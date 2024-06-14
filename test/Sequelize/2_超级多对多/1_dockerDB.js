const { Sequelize, DataTypes, Model, attributes, Op } = require('sequelize');

// 初始化 Sequelize 实例
const sequelize = new Sequelize('test', 'root', '123456', {
  host: 'localhost',
  port: 89,
  dialect: 'mysql',
  logging: false,
  //全局禁用时间戳
  define: { timestamps: false }
});

const Player = sequelize.define('Player', { username: DataTypes.STRING });
const Team = sequelize.define('Team', { name: DataTypes.STRING });
const Game = sequelize.define('Game', { name: DataTypes.STRING });

// 我们在 Game 和 Team 游戏和团队之间应用超级多对多关系
const GameTeam = sequelize.define('GameTeam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});
Team.belongsToMany(Game, { through: GameTeam });
Game.belongsToMany(Team, { through: GameTeam });
GameTeam.belongsTo(Game);
GameTeam.belongsTo(Team);
Game.hasMany(GameTeam);
Team.hasMany(GameTeam);

// 我们在 Player 和 GameTeam 游戏和团队之间应用超级多对多关系
const PlayerGameTeam = sequelize.define('PlayerGameTeam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});
Player.belongsToMany(GameTeam, { through: PlayerGameTeam });
GameTeam.belongsToMany(Player, { through: PlayerGameTeam });
PlayerGameTeam.belongsTo(Player);
PlayerGameTeam.belongsTo(GameTeam);
Player.hasMany(PlayerGameTeam);
GameTeam.hasMany(PlayerGameTeam);





// 同步模型到数据库，创建表
(async () => {
  try {
    await sequelize.sync({ alter: true }); // 如果表已存在，则根据模型修改表结构
    console.log('表创建成功');
  } catch (error) {
    console.error('创建表时出错:', error);
  }
})();

module.exports = {
  Player,
  Team,
  Game,
  GameTeam,
  PlayerGameTeam

};

