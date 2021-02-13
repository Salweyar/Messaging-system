import React, { Component } from "react";
import Authorized from '../Authorized/index';
import { Transition } from "@headlessui/react";
import {SignOut} from '../../Common/lib/firebase';
import MessageList from './messageList';
import fire from '../../Common/lib/firebase';

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
      availableUser: [],
      selectedUser: [],
      check: false,
    };
  }

  onClickProfile = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onClickSignOut = () => {
    SignOut();
  }

  // handle onchange method and set the state as user enter the value in the input
  onChangeText = (event) => {
    this.setState({ message: event.target.value });
  };

  //  // handle onchange method and set the state as user enter the value in the input
  //  onChange = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  // // method that create new message and store into firebase
  onCreateMessage = (event, authUser) => {
    event.preventDefault();

    // const timeStamp = JSON.stringify(new Date(Date.now()));

    // this.state.availableUser.map((user) => {
    //   if (user.isChecked) {
    //     this.props.firebase.msgs().add(
    //       Object.assign({
    //         message: this.state.message,
    //         createAt: timeStamp,
    //         otherUser: user.uid,
    //         userID: authUser.uid,
    //         sender: !this.state.sender,
    //       })
    //     );
    //     this.setState({ message: "" });
    //   }
    //   return user;
    // });

    // this.props.firebase.msgs().add(
    //   Object.assign({
    //     message: this.state.message,
    //     createAt: timeStamp,
    //     otherUser: authUser.uid,
    //     userID: authUser.uid,
    //     sender: !this.state.sender,
    //   })
    // );
    // this.setState({ message: "" });
  };

  // // handle check in check box method and set the state as user check the check box
  // handleAllChecked = (event) => {
  //   let availableUser = this.state.availableUser;
  //   availableUser.forEach((user) => {
  //     user.isChecked = event.target.checked;
  //   });
  //   this.setState({ availableUser: availableUser });
  // };

  // // when the component is load, all the data is stored in the messages (array) state
  // componentDidMount() {
  //   this.onListenForMessages();
  //   this.lis = this.props.firebase.users().onSnapshot((snapshot) => {
  //     let availableUser = [];

  //     snapshot.forEach((doc) => {
  //       let data = doc.data();
  //       availableUser.push({
  //         fullName: data.fullName,
  //         isChecked: false,
  //         uid: doc.id,
  //       });
  //     });

  //     this.setState({
  //       availableUser,
  //       loading: false,
  //     });
  //   });
  // }

  // // Method then use it in componentDidMount
  // onListenForMessages() {
  //   this.setState({ loading: true });
  //   this.listener = this.props.firebase
  //     .msgs()
  //     .orderBy("createAt")
  //     .onSnapshot((snapshot) => {
  //       let messageList = [];
  //       snapshot.forEach((doc) => {
  //         messageList.push({ ...doc.data(), id: doc.id });
  //       });
  //       if (messageList) {
  //         this.setState({ messages: messageList, loading: false });
  //       } else {
  //         this.setState({ messages: null, loading: false });
  //       }
  //     });
  // }

  // //this method help user to delete the message
  // onRemoveMessage = (userID, otherUser, id) => {
  //   this.props.firebase.message(userID, id).delete();
  //   this.props.firebase.message(otherUser, id).delete();
  // };

  // // The method help the auth user to edit the message
  // onEditMessage = (content, message) => {
  //   const { uid, ...messageSnapshot } = content;

  //   this.props.firebase.message(content.id).set({
  //     ...messageSnapshot,
  //     editedAt: JSON.stringify(new Date(Date.now())),
  //     message,
  //   });
  // };

  //  // all the data which is load by componentDidMount method are unmount
  //  componentWillUnmount() {
  //   if (this.listener) {
  //     this.listener();
  //   }

  //   if (this.list) {
  //     this.list();
  //   }

  //   if (this.lis) {
  //     this.lis();
  //   }
  // }

  render() {
    const {
      message,
      messages,
      loading,
      check,
      selectedUser,
      availableUser,
    } = this.state;
    return (
      <>
  

  <Authorized>
   
      {/* <!-- Background color split screen for large screens --> */}
<div className="fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true"></div>
<div className="fixed top-0 right-0 w-1/2 h-full bg-gray-50" aria-hidden="true"></div>
<div className="relative min-h-screen flex flex-col">
  {/* <!-- Navbar --> */}
  <nav className="flex-shrink-0 bg-indigo-600">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        {/* <!-- Logo section --> */}
        <div className="flex items-center px-2 lg:px-0 xl:w-64">
          <div className="flex-shrink-0">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg" alt="Workflow" />
          </div>
        </div>
     
        <div className="flex lg:hidden">
          {/* <!-- Mobile menu button --> */}
          <button onClick={this.onClickProfile} className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            {/* <!-- Icon when menu is closed. -->
            <!--
              Heroicon name: outline/menu-alt-1

              Menu open: "hidden", Menu closed: "block"
            --> */}
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            {/* <!-- Icon when menu is open. -->
            <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            --> */}
            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* <!-- Links section --> */}
        <div className="hidden lg:block lg:w-80">
          <div className="flex items-center justify-end">
            <div className="flex">
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white">Documentation</a>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-indigo-200 hover:text-white">Support</a>
            </div>
            {/* <!-- Profile dropdown --> */}
            <div className="ml-4 relative flex-shrink-0">
              <div>
              <button  onClick={this.onClickProfile} className="bg-indigo-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white" id="user-menu" aria-haspopup="true">
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=HIpa3T1wF9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80" alt="" />
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
            
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                <a onClick={this.onClickSignOut} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</a>
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
        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-800">Dashboard</a>
        <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600">Support</a>
      </div>
      <div className="pt-4 pb-3 border-t border-indigo-800">
        <div className="px-2">
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600">Your Profile</a>
          <a href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600">Settings</a>
          <a onClick={this.onClickSignOut} href="#" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600">Sign out</a>
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
                    <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=HIpa3T1wF9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80" alt="" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900">Debbie Lewis</div>
                    <a href="#" className="group flex items-center space-x-2.5">
                      <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium">debbielewis</span>
                    </a>
                  </div>
                </div>
                {/* <!-- Action buttons --> */}
                <div className="flex flex-col sm:flex-row xl:flex-col">
                  <button type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full">
                    New Project
                  </button>
                  <button type="button" className="mt-3 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full">
                    Invite Team
                  </button>
                </div>
              </div>
              {/* <!-- Meta info --> */}
              <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
                <div className="flex items-center space-x-2">
                  {/* <!-- Heroicon name: solid/badge-check --> */}
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-500 font-medium">Pro Member</span>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <!-- Heroicon name: solid/collection --> */}
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  <span className="text-sm text-gray-500 font-medium">8 Message</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Chat Box --> */}
      <div className="bg-white lg:min-w-0 lg:flex-1">
        <div className="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
          <div className="flex items-center">
            <h1 className="flex-1 text-lg font-medium">Chat box</h1>
            
          </div>
        </div>
        {loading && <div>Loading ...</div>}
        {messages ? (
                    <MessageList
                      // authUser={authUser}
                      messages={messages}
                      availableUser={availableUser}
                      selectedUser={selectedUser}
                      onEditMessage={this.onEditMessage}
                      onRemoveMessage={this.onRemoveMessage}
                    />
                  ) : (
                    <div>There are no messages ...</div>
                  )}

                  {/* The form to create messages */}
                  <div className="">
                    <form
                      // onSubmit={(event) =>
                      //   this.onCreateMessage(event, authUser)
                      // }
                    >

                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input type="text" value={message}
                        onChange={this.onChangeText} name="email" id="email" className=" w-full bg-purple-white shadow-lg rounded border-0 p-3" placeholder="Type a message" />
    
                        <button className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                          <svg 
                             onClick={(event) =>
                              this.onCreateMessage(event)}
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" fill="black" 
                              width="36px" height="36px"><path d="M0 0h24v24H0z" 
                              fill="none"/>
                              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                              </svg>
                          </button>
                    </div>            
                    </form>       
                  </div>
                  <div>                 
</div>
       
      </div>
    </div>
    {/* <!-- Activity feed --> */}
    <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
      <div className="pl-6 lg:w-80">
        <div className="pt-6 pb-2">
          <h2 className="text-sm font-semibold">General Channel</h2>
        </div>
        <div>
          <ul className="divide-y divide-gray-200">
            <li className="py-4">
              <div className="flex space-x-3">
                <img className="h-6 w-6 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=HIpa3T1wF9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80" alt="" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">You</h3>
                    <p className="text-sm text-gray-500">1h</p>
                  </div>
                  <p className="text-sm text-gray-500">Deployed Workcation (2d89f0c8 in master) to production</p>
                </div>
              </div>
            </li>

            {/* <!-- More items... --> */}
          </ul>
          
        </div>
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