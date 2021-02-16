import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SignIn } from "../../Common/lib/firebase";
import { withRouter } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import FlashMessage from "react-flash-message";

class Signin extends Component {
  constructor() {
    super();

    //Define validation rules
    this.validator = new SimpleReactValidator();

    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      error: false,
    };
  }

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  onClickSignIn = async () => {
    const { history } = this.props;
    if (this.validator.allValid()) {
      const result = SignIn(this.state.email, this.state.password)
        .then((user) => {
          history.push("/");
        })
        .catch((err) => {
          setTimeout(
            () => this.setState({ error: true, errorMessage: err.message }),
            100
          );
          this.setState({ error: false, errorMessage: "" });
        });
      return result;
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
        <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-xl  w-full space-y-8 border shadow-lg px-20 py-16">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 msm:text-xl">
                Log in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="flex rounded-md  px-16">
                <span className="msm:hidden shadow-lg inline-flex items-center px-3 py-2 rounded-tl-2xl rounded-l-sm border border-r-2 border-gray-400 bg-gray-250 text-gray-500 text-sm">
                  <svg
                    className="h-8 "
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 1000 1000"
                    enableBackground="new 0 0 1000 1000"
                    space="preserve"
                  >
                    <g>
                      <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                        <path d="M4403.9,5003.7c-820.1-119.2-1631.4-436.2-2253.7-878.2c-354.8-250.1-918.9-814.2-1169-1169c-366.4-514.7-665.9-1203.9-814.2-1875.7c-55.2-253-64-378-66.9-959.6c0-593.2,8.7-703.7,66.9-985.8C542-2612.3,1775-4008.2,3432.6-4560.7c599.1-197.7,805.5-229.7,1552.9-229.7c729.9-2.9,884.1,17.5,1454,191.9c1724.4,523.4,3006.9,1933.8,3390.7,3733.9c61.1,279.2,69.8,395.5,69.8,971.3c0,712.5-20.4,875.3-194.8,1439.5c-523.4,1718.6-1933.8,3004-3719.3,3390.7c-247.2,52.3-410,66.9-898.6,72.7C4758.6,5012.5,4453.3,5009.6,4403.9,5003.7z M5857.9,4352.3c412.9-87.2,674.7-180.3,1076-378c828.8-410,1523.8-1105,1933.8-1933.8c337.3-677.6,444.9-1151.6,447.8-1919.3c2.9-759-113.4-1265-439.1-1928l-162.8-325.7L8574-2001.7c-293.7,276.3-948,625.2-1686.6,901.5l-366.4,139.6l-203.6-171.6c-264.6-221-474-346.1-741.5-442c-186.1-66.9-255.9-75.6-575.8-75.6s-389.7,8.7-575.8,75.6c-267.5,96-476.9,221-741.5,442l-203.6,171.6l-366.4-139.6c-738.6-276.3-1392.9-625.2-1689.6-904.4l-139.6-130.9l-159.9,328.6c-642.7,1320.3-599.1,2812,125,4074.1c354.8,625.2,965.5,1235.9,1590.7,1590.7c471.1,270.4,1078.9,476.9,1613.9,549.6C4784.8,4451.2,5517.6,4422.1,5857.9,4352.3z" />
                        <path d="M4592.9,3258.9c-287.9-61.1-628.1-241.4-863.7-459.5C2993.5,2119,2859.7,1077.9,3368.6,39.8c503.1-1026.5,1398.8-1494.7,2175.2-1140C6151.6-823.9,6669.2-126,6867,685.3c81.4,328.6,84.3,805.5,11.6,1090.5C6596.5,2840.2,5613.6,3479.9,4592.9,3258.9z" />
                      </g>
                    </g>
                  </svg>
                </span>

                <input
                  onChange={this.handleChange("email")}
                  className="form-input shadow-lg px-4 flex-1 block w-full rounded-br-xl rounded-tr-none border border-2 border-gray-300 bg-gray-250 rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 msm:py-2 msm:rounded-br-none msm:rounded msm:text-sm"
                  placeholder="Enter Email"
                />
              </div>
              {this.validator.message(
                "Email",
                this.state.email,
                "required|email",
                {
                  className: "text-red-600  mt-2 ml-16",
                }
              )}

              <div className="flex rounded-md  px-16">
                <span className="msm:hidden  shadow-lg inline-flex items-center px-3 py-2 rounded-tl-2xl rounded-l-sm border border-r-2 border-gray-400 bg-gray-250 text-gray-500 text-sm">
                  <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M22 19h-6v-4h-2.68c-1.14 2.42-3.6 4-6.32 4-3.86 0-7-3.14-7-7s3.14-7 7-7c2.72 0 5.17 1.58 6.32 4H24v6h-2v4zm-4-2h2v-4h2v-2H11.94l-.23-.67C11.01 8.34 9.11 7 7 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c2.11 0 4.01-1.34 4.71-3.33l.23-.67H18v4zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                  </svg>
                </span>

                <input
                  type="password"
                  onChange={this.handleChange("password")}
                  className="form-input shadow-lg px-4 flex-1 block w-full rounded-br-xl rounded-tr-none border border-2 border-gray-300 bg-gray-250 rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 msm:py-2 msm:rounded-br-none msm:rounded msm:text-sm"
                  placeholder="Password"
                />
              </div>
              {this.validator.message(
                "Password",
                this.state.password,
                "required",
                {
                  className: "text-red-600  mt-2 ml-16",
                }
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-900 msm:text-xs"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500 msm:text-xs"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={this.onClickSignIn}
                  className="group relative w-full flex justify-center py-2 px-4 border  text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-white group-hover:text-blue-1000"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Log in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6 border border-8 border-double border-gray-400 rounded-md ">
                <Link to="/signup">
                  <button
                    type="submit"
                    className="group text-gray-600 relative w-full flex justify-center py-2 px-4  text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create account
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

export default withRouter(Signin);
