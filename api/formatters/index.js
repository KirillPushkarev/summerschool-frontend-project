const formatIssue = issue => {
    return {
        id: issue._id,
        name: issue.name,
        description: issue.description,
        status: issue.status,
        priority: issue.priority,
        assigneeId: issue.assigneeId,
    };
};

const formatUser = user => {
    return {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
    };
};

module.exports = { formatIssue, formatUser };
