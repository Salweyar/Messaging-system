import React, { Component } from "react";

// This refers to the induvidual messages with have ability to edit delete, reset or save functionility
class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editText: this.props.message.message,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editText: this.props.message.message,
    }));
  };

  onChangeEditText = (event) => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);
    this.setState({ editMode: false });
  };

  render() {
    const { authUser, message, availableUser } = this.props;
    const { editMode, editText } = this.state;

    return (
      <div>
        <span>
          {authUser.uid === message.userID &&
            availableUser.map((user, key) => {
              return user.uid === message.userID ? (
                <li
                  className="relative flex justify-end items-end inline-block mr-4 py-2 "
                  key={key}
                >
                  <div className="box-border w-64 py-2 px-6 bg-yellow-50 border border-yellow-200 shadow-md rounded rounded-3xl rounded-br-none">
                    <p className="font-bold"> {user.fullName}</p>

                    {editMode ? (
                      <textarea
                        className="w-56 border border-yellow-200 rounded py-1 mt-2"
                        type="text"
                        rows="3"
                        value={editText}
                        onChange={this.onChangeEditText}
                      ></textarea>
                    ) : (
                      <span className="break-all"> {message.message}</span>
                    )}
                    <span>{message.editedAt && <span> (Edited) </span>}</span>
                    {authUser.uid === message.userID && (
                      <li className="float-right" key={key}>
                        <span className="flex mt-6">
                          {editMode ? (
                            <span className="flex">
                              <svg
                                onClick={this.onSaveEditText}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="black"
                                width="18px"
                                height="18px"
                              >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path
                                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 
                                         21 7l-1.41-1.41z"
                                />
                              </svg>

                              <svg
                                onClick={this.onToggleEditMode}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="black"
                                width="18px"
                                height="18px"
                              >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path
                                  d="M19 6.41L17.59 5 12 
                                           10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                                />
                              </svg>
                            </span>
                          ) : (
                            <svg
                              className="mr-1"
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={this.onToggleEditMode}
                              viewBox="0 0 24 24"
                              fill="black"
                              width="18px"
                              height="18px"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path
                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 
                                       7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75
                                        3.75 1.83-1.83z"
                              />
                            </svg>
                          )}
                          {!editMode && (
                            <svg
                              onClick={() =>
                                this.props.onRemoveMessage(message.id)
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
                          )}
                        </span>
                      </li>
                    )}
                  </div>
                </li>
              ) : (
                <></>
              );
            })}
        </span>

        <span>
          {authUser.uid !== message.userID &&
            availableUser.map((user, key) => {
              return user.uid === message.userID ? (
                <li className="relative mr-4 py-2 px-4" key={key}>
                  <div className="box-border w-64 py-2 px-6 bg-yellow-50 border border-yellow-200 shadow-md rounded rounded-3xl rounded-tl-none">
                    <p className="font-bold"> {user.fullName}</p>
                    <span className="break-all"> {message.message}</span>
                    <span>{message.editedAt && <span> (Edited) </span>}</span>
                  </div>
                </li>
              ) : (
                <></>
              );
            })}
        </span>
      </div>
    );
  }
}

export default MessageItem;
