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
  
      return (
        <div>
          {/* {editMode ? (
            <Input
              type="text"
              style={{
                width: "200px",
                float: "right",
              }}
              value={editText}
              onChange={this.onChangeEditText}
            />
          ) : ( */}
          <span>
            {
              authUser.uid === message.otherUser &&
                availableUser.map((user, key) => {
                  return (
                    user.uid === message.userID && (
                      <li className="self" key={key}>
                        <div className="msg">
                          <p> {user.fullName}</p>
                          <span> {message.message}</span>
                          <span>
                            {message.editedAt && <span> (Edited) </span>}
                          </span>
                        </div>
                      </li>
                    )
                  );
                })
              // : availableUser.map((user, key) => {
              //     return (
              //       user.uid == message.userID && (
              //         <li className="other" key={key}>
              //           <div className="msg">
              //             <p> {user.fullName}</p>
              //             <span> {message.message}</span>
              //             <span>
              //               {message.editedAt && <span> (Edited) </span>}
              //             </span>
              //           </div>
              //         </li>
              //       )
              //     );
              //   })}
            }
          </span>
          {/* )} */}
          {/* {authUser.uid === message.userID && (
            <li className="right">
              <span>
                {editMode ? (
                  <span>
                    <button onClick={this.onSaveEditText}>Save</button>
                    <button onClick={this.onToggleEditMode}>Reset</button>
                  </span>
                ) : (
                  <button onClick={this.onToggleEditMode}>Edit</button>
                )}
                {!editMode && (
                  <button
                    type="button"
                    onClick={() =>
                      onRemoveMessage(
                        message.userID,
                        message.otherUser,
                        message.id
                      )
                    }
                  >
                    Delete
                  </button>
                )}
              </span>
            </li>
          )} */}
        </div>
      );
    }
  }

  export default MessageItem;