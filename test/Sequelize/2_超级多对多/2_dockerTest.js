const {
    Player,
    Team,
    Game,
    GameTeam,
    PlayerGameTeam
} = require('./1_dockerDB');


(async () => {

    await Player.bulkCreate([
        { username: 's0me0ne' },
        { username: 'empty' },
        { username: 'greenhead' },
        { username: 'not_spock' },
        { username: 'bowl_of_petunias' }
    ]);
    await Game.bulkCreate([
        { name: 'The Big Clash' },
        { name: 'Winter Showdown' },
        { name: 'Summer Beatdown' }
    ]);
    await Team.bulkCreate([
        { name: 'The Martians' },
        { name: 'The Earthlings' },
        { name: 'The Plutonians' }
    ]);

    // 让我们开始定义哪些球队参加了哪些比赛.
    // 这可以通过几种方式来完成,例如在每个游戏上调用`.setTeams`.
    // 但是,为简便起见,我们将直接使用 `create` 调用,
    // 直接引用我们想要的 ID. 我们知道 ID 是从 1 开始的.
    await GameTeam.bulkCreate([
        { GameId: 1, TeamId: 1 },   // 该 GameTeam 将获得 id 1
        { GameId: 1, TeamId: 2 },   // 该 GameTeam 将获得 id 2
        { GameId: 2, TeamId: 1 },   // 该 GameTeam 将获得 id 3
        { GameId: 2, TeamId: 3 },   // 该 GameTeam 将获得 id 4
        { GameId: 3, TeamId: 2 },   // 该 GameTeam 将获得 id 5
        { GameId: 3, TeamId: 3 }    // 该 GameTeam 将获得 id 6
    ]);

    // 现在让我们指定玩家.
    // 为简便起见,我们仅在第二场比赛(Winter Showdown)中这样做.
    // 比方说,s0me0ne 和 greenhead 效力于 Martians,
    // 而 not_spock 和 bowl_of_petunias 效力于 Plutonians:
    await PlayerGameTeam.bulkCreate([
        // 在 'Winter Showdown' (即 GameTeamIds 3 和 4)中:
        { PlayerId: 1, GameTeamId: 3 },   // s0me0ne played for The Martians
        { PlayerId: 3, GameTeamId: 3 },   // greenhead played for The Martians
        { PlayerId: 4, GameTeamId: 4 },   // not_spock played for The Plutonians
        { PlayerId: 5, GameTeamId: 4 }    // bowl_of_petunias played for The Plutonians
    ]);

    // 现在我们可以进行查询！
    const game = await Game.findOne({
        where: {
            name: "Winter Showdown"
        },
        include: {
            model: GameTeam,
            include: [
                {
                    model: Player,
                    through: { attributes: [] } // 隐藏结果中不需要的 `PlayerGameTeam` 嵌套对象
                },
                Team
            ]
        }
    });

    console.log(`Found game: "${game.name}"`);
    for (let i = 0; i < game.GameTeams.length; i++) {
        const team = game.GameTeams[i].Team;
        const players = game.GameTeams[i].Players;
        console.log(`- Team "${team.name}" played game "${game.name}" with the following players:`);
        console.log(players.map(p => `--- ${p.username}`).join('\n'));
    }


})()