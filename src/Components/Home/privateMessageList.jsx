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
