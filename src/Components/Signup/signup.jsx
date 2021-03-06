import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SignUp } from "../../Common/lib/firebase";
import { withRouter } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import FlashMessage from "react-flash-message";
import fire from "../../Common/lib/firebase";

class Signup extends Component {
  constructor() {
    super();

    //Define validation rules
    this.validator = new SimpleReactValidator();

    this.state = {
      email: "",
      password: "",
      fullName: "",
      status: "",
      errorMessage: "",
      error: false,
    };
  }

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  onCreateUser = () => {
    const { history } = this.props;
    const timeStamp = JSON.stringify(new Date(Date.now()));
    const data = {
      fullName: this.state.fullName,
      status: this.state.status,
      email: this.state.email,
      createAt: timeStamp,
    };

    if (this.validator.allValid()) {
      SignUp(this.state.email, this.state.password, data);

      history.push("/verify-email");
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`

      this.forceUpdate();
    }
  };

  render() {
    const { error, errorMessage } = this.state;
    return (
      <>
        {error === true && (
          <FlashMessage duration={10000}>
            <div className=" flex m-auto px-20 py-6 mt-8 rounded-md bg-red-50 w-1/2">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {errorMessage}
                </h3>
              </div>
            </div>
          </FlashMessage>
        )}
        <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
          <div className=" max-w-xl  w-full space-y-8 border shadow-lg  px-20 py-16">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900  msm:text-xl">
              Lets get started
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 max-w msm:text-sm">
              Before we start, please allow us get to know you
            </p>

            <div className="mt-8 sm:mx-auto flex m-auto w-full max-w-xs sm:px-12 sm:w-full sm:max-w-md"></div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <form className="space-y-6">
                <div>
                  <div className="mt-1 flex  pb-4 rounded-md  px-16">
                    <span className="msm:hidden shadow-lg inline-flex items-center px-3 py-2 rounded-tl-2xl rounded-l-sm border border-r-2 border-gray-400 bg-gray-250 text-gray-500 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="black"
                        width="36px"
                        height="36px"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" />
                      </svg>
                    </span>

                    <input
                      className="form-input shadow-lg px-4 flex-1 block w-full rounded-br-xl rounded-tr-none border border-2 border-gray-300 bg-gray-250 rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 msm:py-2 msm:rounded-br-none msm:rounded msm:text-sm"
                      placeholder="Full Name"
                      onChange={this.handleChange("fullName")}
                    />
                  </div>
                  {this.validator.message(
                    "Full Name",
                    this.state.fullName,
                    "required|alpha_space",
                    {
                      className: "text-red-600 ml-16 mb-4",
                    }
                  )}

                  <div className="mt-1 flex pb-4 rounded-md  px-16">
                    <span className="msm:hidden shadow-lg inline-flex items-center px-3 py-2 rounded-tl-2xl rounded-l-sm border border-r-2 border-gray-400 bg-gray-250 text-gray-500 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="black"
                        width="36px"
                        height="36px"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                      </svg>
                    </span>

                    <input
                      className="form-input shadow-lg px-4 flex-1 block w-full rounded-br-xl rounded-tr-none border border-2 border-gray-300 bg-gray-250 rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 msm:py-2 msm:rounded-br-none msm:rounded msm:text-sm"
                      placeholder="Enter email"
                      onChange={this.handleChange("email")}
                    />
                  </div>
                  {this.validator.message(
                    "Email",
                    this.state.email,
                    "required|email",
                    {
                      className: "text-red-600 ml-16 mb-4",
                    }
                  )}
                  <div className="text-center mb-4"></div>
                  <div className="mt-1 flex  pb-4 rounded-md  px-16">
                    <span className="msm:hidden shadow-lg inline-flex items-center px-3 py-2 rounded-tl-2xl rounded-l-sm border border-r-2 border-gray-400 bg-gray-250 text-gray-500 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="black"
                        width="36px"
                        height="36px"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M22 19h-6v-4h-2.68c-1.14 2.42-3.6 4-6.32 4-3.86 0-7-3.14-7-7s3.14-7 7-7c2.72 0 5.17 1.58 6.32 4H24v6h-2v4zm-4-2h2v-4h2v-2H11.94l-.23-.67C11.01 8.34 9.11 7 7 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c2.11 0 4.01-1.34 4.71-3.33l.23-.67H18v4zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                      </svg>
                    </span>

                    <input
                      type="password"
                      className="form-input shadow-lg px-4 flex-1 block w-full rounded-br-xl rounded-tr-none border border-2 border-gray-300 bg-gray-250 rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 msm:py-2 msm:rounded-br-none msm:rounded msm:text-sm"
                      placeholder="Password"
                      onChange={this.handleChange("password")}
                    />
                  </div>
                  {this.validator.message(
                    "password",
                    this.state.password,
                    "required",
                    {
                      className: "text-red-600 ml-16 mb-4",
                    }
                  )}

                  <div className="mt-1 flex  rounded-md  px-16 msm:px-4">
                    <span className=" msm:hidden inline-flex items-center px-3 py-2 rounded-tl-3xl  rounded-l-none border border-r-2 border-gray-400 bg-gray-250 text-gray-500 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="25"
                        viewBox="0 0 42.149 41.339"
                      >
                        <path
                          d="M40.934,3H7.215A4.169,4.169,0,0,0,3.021,7.134L3,44.339l8.43-8.268h29.5a4.187,4.187,0,0,0,4.215-4.134V7.134A4.187,4.187,0,0,0,40.934,3ZM36.719,27.8H11.43V23.669H36.719Zm0-6.2H11.43V17.468H36.719Zm0-6.2H11.43V11.268H36.719Z"
                          transform="translate(-3 -3)"
                        />
                      </svg>
                    </span>
                    <span className=" msm:hidden form-input text-center font-bold py-2 flex-1 block w-full rounded-br-none rounded-tr-none border border-r-2 border-gray-400 bg-gray-250 rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                      Status/headline
                    </span>
                    <br />
                  </div>
                  <div className="px-16 msm:px-4">
                    <textarea
                      onChange={this.handleChange("status")}
                      class="w-full shadow-lg rounded-tr-none px-3 py-2 text-gray-700 border border-r-2  rounded-r-md focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5  msm:rounded-br-none msm:rounded"
                      rows="3"
                      placeholder="Type your message..."
                    ></textarea>
                  </div>
                </div>
                <button
                  type="button"
                  className=" group text-gray-600 relative w-full flex justify-center py-2 px-4 bg-indigo-500   text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={this.onCreateUser}
                >
                  <span className="msm:text-xs text-white">Create Now</span>
                </button>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-6 border border-8 border-double border-gray-400 rounded-md ">
                  <Link to="/signin">
                    <button
                      type="submit"
                      className="group text-gray-600 relative w-full flex justify-center py-2 px-4  text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Log in
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Signup);
