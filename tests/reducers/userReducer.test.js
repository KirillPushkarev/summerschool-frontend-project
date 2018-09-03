import { actionTypes, userReducer } from "../../src/redux/users";

describe("user reducer", () => {
    it("should return the initial state", () => {
        expect(userReducer(undefined, {})).toEqual({
            items: [],
            isFetching: false,
        });
    });

    it("should handle FETCH_USERS_START", () => {
        expect(
            userReducer(
                {
                    items: [],
                    isFetching: false,
                },
                {
                    type: actionTypes.FETCH_USERS_START,
                },
            ),
        ).toEqual({
            items: [],
            isFetching: true,
        });
    });

    it("should handle FETCH_USERS_SUCCESS", () => {
        expect(
            userReducer(
                {
                    items: [],
                    isFetching: true,
                },
                {
                    type: actionTypes.FETCH_USERS_SUCCESS,
                    users: [
                        {
                            id: 1,
                            name: "User 1",
                            avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/jydesign/128.jpg",
                        },
                        {
                            id: 2,
                            name: "User 2",
                            avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/angelcreative/128.jpg",
                        },
                    ],
                },
            ),
        ).toEqual({
            items: [
                {
                    id: 1,
                    name: "User 1",
                    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/jydesign/128.jpg",
                },
                {
                    id: 2,
                    name: "User 2",
                    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/angelcreative/128.jpg",
                },
            ],
            isFetching: false,
        });
    });
});
