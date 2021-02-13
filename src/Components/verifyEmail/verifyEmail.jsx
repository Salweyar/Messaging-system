import React, { Component } from "react";
import { Link } from "react-router-dom";

class VerifyEmail extends Component {
  constructor() {
    super();    
  }


  render() {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-xl  w-full space-y-8 border shadow-lg px-20 py-16">
            <div>
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 msm:text-xl">
                Thank you for signing up. Please verify your email to signIn.
              </h2>
            </div>

            <p className="text-center">Please check your email for a confirmation link.</p>
            

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Click the button to signin!
                  </span>
                </div>
              </div>

              <div className="mt-6 border border-8 border-double border-gray-400 rounded-md ">
                <Link to="/signin">
                  <button
                    type="submit"
                    className="group text-gray-600 relative w-full flex justify-center py-2 px-4  text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Go back to signIn
                  </button>
                </Link>
              </div>
            </div>
          </div>
	        </div>
      </>
    );
  }
}

export default VerifyEmail;