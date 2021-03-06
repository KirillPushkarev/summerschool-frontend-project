import { connect } from "react-redux";
import BoardItem from "../components/BoardItem/BoardItem";

const mapStateToProps = (state, ownProps) => {
    const user = state.users.items.find(_user => _user.id === ownProps.issue.assigneeId);
    return {
        user,
    };
};

export default connect(mapStateToProps)(BoardItem);
