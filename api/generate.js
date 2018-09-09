var faker = require("faker");
var _ = require("lodash");

module.exports = function() {
    return {
        users: _.times(5, id => ({
            id: id + 1,
            name: faker.name.findName(),
            avatar: faker.internet.avatar(),
        })),
        issues: [
            {
                name: "Issue 1",
                description: "My first issue.",
                priority: "Highest",
                status: "In review",
                assigneeId: 1,
                id: 1,
            },
            {
                name: "Issue 2",
                description: "Задача 2",
                priority: "Medium",
                status: "In review",
                assigneeId: 2,
                id: 2,
            },
            {
                name: "Issue 3",
                description: "hello",
                priority: "Low",
                status: "To do",
                assigneeId: 1,
                id: 3,
            },
            {
                name: "Issue 4",
                description: "hey, dude, haha",
                priority: "Highest",
                status: "To do",
                assigneeId: 4,
                id: 4,
            },
            {
                name: "Issue 5",
                description: "lol",
                priority: "Highest",
                status: "To do",
                assigneeId: 3,
                id: 5,
            },
        ],
    };
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
