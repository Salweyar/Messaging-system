import React, { Component } from "react";

// This refers to the induvidual messages with have ability to edit delete, reset or save functionility
class PrivateMessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userMessages, availableUser } = this.props;

    return (
      <div>
        <ul className="">
          {userMessages.map((message, key) => (
            <span key={key}>
              {/* condition state if authUser sender is true then populate their name and messages below or populate the other user messages */}
              {message.sender
                ? availableUser.map((user, key) => {
                    return (
                      <div key={key}>
                        {user.uid === message.userID && (
                          <li className="relative flex justify-end items-end inline-block mr-4 py-2">
                            <div className="box-border w-64 py-2 px-6 bg-yellow-50 border border-yellow-200 shadow-md rounded rounded-3xl rounded-br-none">
                              <strong className="">{user.fullName}</strong>
                              <div className="break-all mt-2">
                                {" "}
                                {message.message}
                              </div>

                              <span className="flex float-right mt-2">
                                <svg
                                  onClick={() =>
                                    this.props.onRemoveUserMessage(
                                      message.userID,
                                      message.otherUser,
                                      message.id
                                    )
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="black"
                                  width="18px"
                                  height="18px"
                                >
                                  <path d="M0 0h24v24H0z" fill="none" />
                                  <path
                                    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 
                                      2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                                  />
                                </svg>
                              </span>
                            </div>
                          </li>
                        )}
                      </div>
                    );
                  })
                : availableUser.map((user, key) => {
                    return (
                      <div key={key}>
                        {user.uid === message.otherUser && (
                          <li className="relative inline-block mr-4 py-2">
                            <div className="box-border w-64 py-2 px-6 bg-yellow-50 border border-yellow-200 shadow-md rounded rounded-3xl rounded-tl-none">
                              <strong>{user.fullName}</strong>
                              <div className="break-all">{message.message}</div>
                            </div>
                          </li>
                        )}
                      </div>
                    );
                  })}
            </span>
          ))}
        </ul>
      </div>
    );
  }
}

export default PrivateMessageList;
