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
            {
                name: "Issue 6",
                description: "My first issue.",
                priority: "Highest",
                status: "In review",
                assigneeId: 1,
                id: 6,
            },
            {
                name: "Issue 7",
                description: "Задача 2",
                priority: "Medium",
                status: "In review",
                assigneeId: 2,
                id: 7,
            },
            {
                name: "Issue 8",
                description: "hello",
                priority: "Low",
                status: "To do",
                assigneeId: 1,
                id: 8,
            },
            {
                name: "Issue 9",
                description: "hey, dude, haha",
                priority: "Highest",
                status: "To do",
                assigneeId: 4,
                id: 9,
            },
            {
                name: "Issue 10",
                description: "lol",
                priority: "Highest",
                status: "To do",
                assigneeId: 3,
                id: 10,
            },
            {
                name: "Issue 11",
                description: "My first issue.",
                priority: "Highest",
                status: "In review",
                assigneeId: 1,
                id: 11,
            },
            {
                name: "Issue 12",
                description: "Задача 2",
                priority: "Medium",
                status: "In review",
                assigneeId: 2,
                id: 12,
            },
            {
                name: "Issue 13",
                description: "hello",
                priority: "Low",
                status: "To do",
                assigneeId: 1,
                id: 13,
            },
            {
                name: "Issue 14",
                description: "hey, dude, haha",
                priority: "Highest",
                status: "To do",
                assigneeId: 4,
                id: 14,
            },
            {
                name: "Issue 15",
                description: "lol",
                priority: "Highest",
                status: "To do",
                assigneeId: 3,
                id: 15,
            },
        ],
    };
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
