import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useNavigate } from "react-router-dom";
import baseURL from "./BaseURL";
import axios from 'axios'
import Cookies from "js-cookie";

function Hero() {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const [URL, setURL] = useState()
  const navigate = useNavigate();
  const token = Cookies.get('token')
  console.log('res::::::', token)

  const [time, setTime] = useState(5)
     
  useEffect(() => {
    // setTimeout(()=> { 
    //   alert("After 5 seconds!");
    //  }, 5000);
   }, [])

  const submitData = () => {
 
  //    const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  // };
  // const params = new URLSearchParams();
  // params.append('url', URL);
  //   fetch(`${baseURL}/monitor/scrape`, {
  //     method:"POST",
  //     headers:{
  //         "Content-Type":"application/json",
  //         'Authorization': `Bearer ${token}`, // notice the Bearer before your token
  //     },
  //     body:JSON.stringify({
  //       url: URL
        
  //     })
  // })
  // .then(res => res.json())
  //   .then(response => {
  //         console.log('res::of monitor::', response)
  //         // if (response.data.status === "Registration done successfully") {
  //         //   navigate("/signin", { replace: true });
  //         //   console.log('registered')
  //         // } else  {
  //         //   console.log('Not registered')
  //         // }
  //       });

  const data = { 
    url: URL
   };

  axios.post(`${baseURL}/monitor/scrape`, data, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
        console.log('res::MONITOR::', response)
        if (response.data.status === "Registration done successfully") {
          navigate("/signin", { replace: true });
          console.log('registered')
        } else  {
          console.log('Not registered')
        }
      });
  }
  return (
    <div className=" px-6 py-16 mx-auto  text-center">
      <div className="max-w-7xl mx-auto">
        <h1 className="max-w-7xl text-5xl font-bold text-gray-800 dark:text-white md:text-4xl">
          We monitor website changes ...so you don't have to!
        </h1>


        <div className="lg:flex w-full mx-auto my-10 bg-white rounded-lg ">
          <div class="bg-white rounded-lg shadow max-w-full mx-5 sm:w-full sm:mx-auto sm:overflow-hidden">
            <div class="px-4 py-8 sm:px-10">
              <div class="relative mt-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm leading-5">
                  <span class="px-2 text-gray-500 bg-white">
                    Search criteria
                  </span>
                </div>
              </div>
              <div class="mt-6">
                <div class="w-full space-y-6">
                  <div class="w-full">
                    <div class=" relative ">
                      <input
                        type="text"
                        placeholder="Enter website: www.google.com"
                        className="w-full h-10 px-4 py-2 m-1 text-gray-700 focus:outline-none placeholder-gray-400 border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40"
                      onChange={(e) => setURL(e.target.value)}
                      />
                    </div>
                  </div>

                  {/*  */}

                  <div className="w-full mx-auto mt-6 bg-transparent rounded-md ">
                    <span className="flex justify-start">
                      Send notification to
                    </span>
                    <form className="flex">
                      <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full h-10 px-4 py-2 m-1 text-gray-700 focus:outline-none placeholder-gray-400 border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40"
                      />
                      <div>
                        <button
                          className={
                            "font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                          }
                          type="button"
                          ref={btnDropdownRef}
                          onClick={() => {
                            dropdownPopoverShow
                              ? closeDropdownPopover()
                              : openDropdownPopover();
                          }}
                        >
                          Frequency
                        </button>
                      </div>

                      <div
                        ref={popoverDropdownRef}
                        className={
                          (dropdownPopoverShow ? "block " : "hidden ") +
                          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                        }
                        style={{ minWidth: "12rem" }}
                      onClick={() => {
                        console.log('555555555')
                      }}
                      >
                        <a
                          href="#"
                          class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                          onClick={() => {
                            setTime(5000)
                          }}
                        >
                          5 Seconds
                        </a>

                        <a
                          href="#"
                          class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                          onClick={() => {
                            setTime(5 * 5000)
                          }}
                        >
                          5 Minutes
                        </a>
                      </div>
                    </form>
                  </div>

                  {/*  */}
                  <div>
                    <span class="block w-full rounded-md shadow-sm">
                      <button
                        type="button"
                        class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                     onClick={submitData}
                     >
                        Start Monitering
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10">
              <p class="text-xs leading-5 text-gray-500">
                This data are display for information and can change
              </p>
            </div>
          </div>

          {/*  */}
          {/* <div className="w-full mx-auto mt-6 bg-transparent border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40">
            <form className="flex flex-col md:flex-row">
              <input
                type="email"
                placeholder="Enter a website: www.google.com"
                className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none"
              />
            </form>
          </div> */}
          {/* result card */}
          <div class="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mt-2">
            <a
              href="#"
              class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
            >
              Accessibility tools for designers and developers
            </a>
            <p class="mt-2 text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
              expedita dicta totam aspernatur doloremque. Excepturi iste iusto
              eos enim reprehenderit nisi, accusamus delectus nihil quis facere
              in modi ratione libero!
            </p>
          </div>

          {/* blow form */}
          {/* <div className="w-full mx-auto mt-6 bg-transparent rounded-md ">
              <span className="flex justify-start">Send notification to</span>
              <form className="flex">
              <input
                type="email"
                placeholder="Enter a website: www.google.com"
                className="w-full h-10 px-4 py-2 m-1 text-gray-700 focus:outline-none placeholder-gray-400 border rounded-md dark:border-gray-700 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-300 focus-within:ring-opacity-40"
              />
              <div>
                <button
                  className={
                    "font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                  }
                  type="button"
                  ref={btnDropdownRef}
                  onClick={() => {
                    dropdownPopoverShow
                      ? closeDropdownPopover()
                      : openDropdownPopover();
                  }}
                >
                  Frequency
                </button>
              </div>

              <div
                ref={popoverDropdownRef}
                className={
                  (dropdownPopoverShow ? "block " : "hidden ") +
                  "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                }
                style={{ minWidth: "12rem" }}
              >
                <a
                  href="#"
                  class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Weekly
                </a>

                <a
                  href="#"
                  class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Hourly
                </a>
              </div>
            </form>
          </div> */}
          {/*  */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
