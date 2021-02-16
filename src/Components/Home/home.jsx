import React, { Component } from "react";
import Authorized from "../Authorized/index";
import { Transition } from "@headlessui/react";
import { SignOut } from "../../Common/lib/firebase";
import MessageList from "./messageList";
import PrivateMessageList from "./privateMessageList";
import fire from "../../Common/lib/firebase";
import Avatar from "react-avatar";
import Chat from "../../Common/assets/chat_icon.gif";

//Class component reader general chat room when user enter to the messaging system
class Home extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      message: "",
      sender: false,
      messageID: "",
      loading: false,
      messages: [],
      userMessages: [],
      availableUser: [],
      selectedUser: "",
      check: false,
      authUser: {},
      currentUser: {},
      channel: "General",
    };
  }

  onClickProfile = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onClickSignOut = () => {
    SignOut();
  };

  // handle onchange method and set the state as user enter the value in the input
  onChangeText = (event) => {
    this.setState({ message: event.target.value });
  };

  // // method that create new message and store into firebase
  onCreateMessage = (event, authUser) => {
    event.preventDefault();

    const timeStamp = JSON.stringify(new Date(Date.now()));

    if (this.state.message !== "") {
      if (this.state.channel === "General") {
        fire
          .firestore()
          .collection("messages")
          .add(
            Object.assign({
              message: this.state.message,
              createAt: timeStamp,
              userID: authUser.uid,
            })
          );
      } else {
        this.state.availableUser.map((user) => {
          if (
            this.state.selectedUser !== "" &&
            this.state.selectedUser.uid === user.uid
          ) {
            fire
              .firestore()
              .collection("users")
              .doc(`${this.state.selectedUser.uid}`)
              .collection("messages")
              .add(
                Object.assign({
                  message: this.state.message,
                  createAt: timeStamp,
                  otherUser: authUser.uid,
                  userID: user.uid,
                  sender: this.state.sender,
                })
              );
          }
        });
        fire
          .firestore()
          .collection("users")
          .doc(`${this.state.authUser.uid}`)
          .collection("messages")
          .add(
            Object.assign({
              message: this.state.message,
              createAt: timeStamp,
              userID: authUser.uid,
              otherUser: this.state.selectedUser.uid,
              sender: !this.state.sender,
            })
          );
      }
    }
    this.setState({ message: "" });
  };

  // // when the component is load, all the data is stored in the messages (array) state
  componentDidMount() {
    this.onListenForMessages();
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authUser: user });

        fire
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.setState({ currentUser: doc.data() });
            } else {
              this.setState({ currentUser: "" });
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    });

    this.lis = fire
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        let availableUser = [];
        snapshot.forEach((doc) => {
          let data = doc.data();
          availableUser.push({
            fullName: data.fullName,
            status: data.status,
            isChecked: false,
            uid: doc.id,
          });
        });

        this.setState({
          availableUser,
          loading: false,
        });
      });
  }

  // // Method then use it in componentDidMount
  onListenForMessages() {
    this.setState({ loading: true });

    this.listener = fire
      .firestore()
      .collection("messages")
      .orderBy("createAt")
      .onSnapshot((snapshot) => {
        let messageList = [];
        snapshot.forEach((doc) => {
          messageList.push({ ...doc.data(), id: doc.id });
        });
        if (messageList) {
          this.setState({ messages: messageList, loading: false });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  }

  // //this method help user to delete the message
  onRemoveMessage = (id) => {
    fire.firestore().collection("messages").doc(`${id}`).delete();
  };

  onRemoveUserMessage = (userId, otherUser, id) => {
    fire
      .firestore()
      .collection("users")
      .doc(`${userId}`)
      .collection("messages")
      .doc(`${id}`)
      .delete();
    fire
      .firestore()
      .collection("users")
      .doc(`${otherUser}`)
      .collection("messages")
      .doc(`${id}`)
      .delete();
  };

  // // The method help the auth user to edit the message
  onEditMessage = (content, message) => {
    const { uid, ...messageSnapshot } = content;
    fire
      .firestore()
      .collection("messages")
      .doc(`${content.id}`)
      .set({
        ...messageSnapshot,
        editedAt: JSON.stringify(new Date(Date.now())),
        message,
      });
  };

  // all the data which is load by componentDidMount method are unmount
  componentWillUnmount() {
    if (this.listener) {
      this.listener();
    }

    if (this.lis) {
      this.lis();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedUser.uid !== this.state.selectedUser.uid) {
      fire
        .firestore()
        .collection("users")
        .doc(this.state.authUser.uid)
        .collection("messages")
        .orderBy("createAt")
        .where("otherUser", "==", nextState.selectedUser.uid)
        .onSnapshot((snapshot) => {
          let userMessages = [];
          snapshot.forEach((doc) => {
            userMessages.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          if (userMessages) {
            this.setState({
              userMessages: userMessages,
              loading: false,
            });
          } else {
            this.setState({
              userMessages: null,
              loading: false,
            });
          }
        });
    }
  }

  render() {
    const {
      message,
      messages,
      loading,
      selectedUser,
      availableUser,
      authUser,
      currentUser,
      userMessages,
      channel,
    } = this.state;
    return (
      <>
        <Authorized>
          {/* <!-- Background color split screen for large screens --> */}
          <div
            className="fixed top-0 left-0 w-1/2 h-full bg-white"
            aria-hidden="true"
          ></div>
          <div
            className="fixed top-0 right-0 w-1/2 h-full bg-gray-50"
            aria-hidden="true"
          ></div>
          <div className="relative min-h-screen flex flex-col">
            {/* <!-- Navbar --> */}
            <nav className="flex-shrink-0 bg-indigo-600">
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  {/* <!-- Logo section --> */}
                  <div className="flex items-center px-2 lg:px-0 xl:w-64">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                        alt="Workflow"
                      />
                    </div>
                  </div>

                  <div className="flex lg:hidden">
                    {/* <!-- Mobile menu button --> */}
                    <button
                      onClick={this.onClickProfile}
                      className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Open main menu</span>
                      {/* <!-- Icon when menu is closed. -->
            <!--
              Heroicon name: outline/menu-alt-1

              Menu open: "hidden", Menu closed: "block"
            --> */}
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h8m-8 6h16"
                        />
                      </svg>
                      {/* <!-- Icon when menu is open. -->
            <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            --> */}
                      <svg
                        className="hidden h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* <!-- Links section --> */}
                  <div className="hidden lg:block lg:w-80">
                    <div className="flex items-center justify-end">
                      <div className="flex">
                        <span className="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white">
                          {currentUser.fullName}
                        </span>
                      </div>
                      {/* <!-- Profile dropdown --> */}
                      <div className="ml-4 relative flex-shrink-0">
                        <div>
                          <button
                            onClick={this.onClickProfile}
                            className="bg-indigo-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                            id="user-menu"
                            aria-haspopup="true"
                          >
                            <span className="sr-only">Open user menu</span>
                            <Avatar
                              name={`${currentUser.fullName}`}
                              size="45"
                              round
                              color={Avatar.getRandomColor("sitebase", [
                                "red",
                                "blue",
                                "green",
                              ])}
                            />
                          </button>
                        </div>
                        {/* <!--
                Profile dropdown panel, show/hide based on dropdown state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              --> */}
                        <Transition
                          show={this.state.isOpen}
                          enter="transition ease-out duration-100 transform"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="transition ease-in duration-75 transform"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <div
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu"
                          >
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              View Profile
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Settings
                            </a>
                            <a
                              onClick={this.onClickSignOut}
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Logout
                            </a>
                          </div>
                        </Transition>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!--
                  Mobile menu, toggle classes based on menu state.

                  Menu open: "block", Menu closed: "hidden"
                --> */}
              <Transition
                show={this.state.isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="lg:hidden">
                  <div className="px-2 pt-2 pb-3">
                    <span className="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white">
                      {currentUser.fullName}
                    </span>
                  </div>
                  <div className="pt-4 pb-3 border-t border-indigo-800">
                    <div className="px-2">
                      <a
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
                      >
                        Settings
                      </a>
                      <a
                        onClick={this.onClickSignOut}
                        href="#"
                        className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600"
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                </div>
              </Transition>
            </nav>

            {/* <!-- 3 column wrapper --> */}
            <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
              {/* <!-- Left sidebar & main wrapper --> */}
              <div className="flex-1 min-w-0 bg-white xl:flex">
                {/* <!-- Account profile --> */}
                <div className="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
                  <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-8">
                        <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
                          {/* <!-- Profile --> */}
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 h-12 w-12">
                              <Avatar
                                name={`${currentUser.fullName}`}
                                size="45"
                                round
                                color={Avatar.getRandomColor("sitebase", [
                                  "red",
                                  "blue",
                                  "green",
                                ])}
                              />
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">
                                {currentUser.fullName}
                              </div>
                              <a
                                href="#"
                                className="group flex items-center space-x-2.5"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="black"
                                  width="25px"
                                  height="25px"
                                >
                                  <path d="M0 0h24v24H0z" fill="none" />
                                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                <span className="text-sm break-all text-gray-500 group-hover:text-gray-900 font-medium">
                                  {currentUser.email}
                                </span>
                              </a>
                            </div>
                          </div>
                          {/* <!-- Action buttons --> */}
                          <div className="flex flex-col sm:flex-row xl:flex-col">
                            <button
                              type="button"
                              onClick={() =>
                                this.setState({ channel: "General" })
                              }
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full"
                            >
                              General Channel
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                this.setState({ channel: "Private" })
                              }
                              className="mt-3 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full"
                            >
                              Private Channel
                            </button>
                          </div>
                        </div>
                        {/* <!-- Meta info --> */}
                        <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
                          <div className="flex items-center space-x-2">
                            {/* <!-- Heroicon name: solid/badge-check --> */}
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-gray-500 font-medium">
                              Pro Member
                            </span>
                          </div>
                          <p className="rounded-md bg-gray-200 p-4 my-4 ">
                            {currentUser.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Chat Box --> */}
                <div className="bg-white lg:min-w-0 lg:flex-1">
                  <div className="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0  ">
                    <div className="flex items-center">
                      {this.state.channel === "General" ? (
                        <h1 className="flex m-auto text-lg font-medium">
                          Chat box
                        </h1>
                      ) : (
                        this.state.selectedUser !== "" && (
                          <>
                            <h1 className="flex m-auto text-lg font-medium">
                              {this.state.selectedUser.fullName}
                            </h1>
                          </>
                        )
                      )}
                    </div>
                  </div>
                  <div className="max-h-screen overflow-y-scroll ">
                    {loading && <div>Loading ...</div>}
                    {this.state.channel === "General" && messages ? (
                      <MessageList
                        authUser={authUser}
                        messages={messages}
                        availableUser={availableUser}
                        onEditMessage={this.onEditMessage}
                        onRemoveMessage={this.onRemoveMessage}
                      />
                    ) : (
                      <>
                        {selectedUser ? (
                          <>
                            <PrivateMessageList
                              authUser={authUser}
                              userMessages={userMessages}
                              availableUser={availableUser}
                            />
                          </>
                        ) : (
                          <>
                            {" "}
                            <div className="w-3/4 flex mx-auto py-24">
                              <img
                                className="rounded-full rounded-br-none"
                                src={Chat}
                                alt="Chat"
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {/* The form to create messages */}
                  {this.state.channel === "General" ? (
                    <form
                      onSubmit={(event) => {
                        this.onCreateMessage(event, authUser);
                      }}
                    >
                      <div className=" absolute w-full bottom-0 lg:w-3/4 lg:px-4 lg:pr-24 xl:max-w-4xl pb-2 sm:pb-5 xl:px-8 xl:pr-72">
                        <div className="max-w-screen mx-auto">
                          <div className=" flex rounded-md shadow-sm">
                            <input
                              type="text"
                              value={message}
                              onChange={this.onChangeText}
                              name="email"
                              id="email"
                              className=" w-full bg-purple-white shadow-lg rounded border-0 p-3"
                              placeholder="Type a message"
                            />

                            <button
                              type="button"
                              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <svg
                                onClick={(event) =>
                                  this.onCreateMessage(event, authUser)
                                }
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="black"
                                width="36px"
                                height="36px"
                              >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <form
                      onSubmit={(event) => {
                        this.onCreateMessage(event, authUser);
                      }}
                    >
                      <div className=" absolute w-full bottom-0 lg:w-3/4 lg:px-4 lg:pr-24 xl:max-w-4xl pb-2 sm:pb-5 xl:px-8 xl:pr-72">
                        <div className="max-w-screen mx-auto">
                          <div className=" flex rounded-md shadow-sm">
                            <input
                              type="text"
                              value={message}
                              onChange={this.onChangeText}
                              name="email"
                              id="email"
                              className=" w-full bg-purple-white shadow-lg rounded border-0 p-3"
                              placeholder="Type a message"
                            />

                            <button
                              type="button"
                              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <svg
                                // onClick={(event) =>
                                //   this.onCreateMessage(event, authUser)
                                // }
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="black"
                                width="36px"
                                height="36px"
                              >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}

                  <div></div>
                </div>
              </div>

              {/* <!-- Activity feed --> */}
              <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
                <div className="pl-6 lg:w-80">
                  <div className="pt-6 pb-2">
                    {this.state.channel === "General" ? (
                      <h2 className="text-sm text-center font-semibold">
                        General Channel
                      </h2>
                    ) : (
                      <h2 className="text-sm text-center font-semibold">
                        Private Channel
                      </h2>
                    )}
                  </div>

                  <ul className="divide-y divide-gray-200">
                    {this.state.channel === "Private" &&
                      availableUser.map((data, key) => {
                        return (
                          <div
                            className=""
                            key={key}
                            onClick={() => {
                              this.setState({ selectedUser: data });
                            }}
                          >
                            {currentUser.fullName !== data.fullName && (
                              <li className="py-4" key={key}>
                                <div
                                  className="flex space-x-3 hover:shadow-2xl hover:bg-gray-200 py-4 px-4 cursor-pointer"
                                  onClick={() => {
                                    this.setState({ selectedUser: data });
                                  }}
                                >
                                  <Avatar
                                    name={`${data.fullName}`}
                                    size="60"
                                    round
                                    color={Avatar.getRandomColor("sitebase", [
                                      "red",
                                      "blue",
                                      "green",
                                    ])}
                                  />
                                  <div className="flex-1 space-y-1 ">
                                    <div className="flex items-center justify-between ">
                                      <h3 className="text-sm font-medium">
                                        {data.fullName}
                                      </h3>
                                      <p className="text-xs text-gray-500 ">
                                        Pro Member
                                      </p>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                      {data.status}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            )}
                          </div>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Authorized>
      </>
    );
  }
}

export default Home;
