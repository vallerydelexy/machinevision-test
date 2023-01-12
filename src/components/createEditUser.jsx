import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";

import {
  notificationAtom,
  notificationTypeAtom,
  notificationMessageAtom,
} from "../recoil/atom/notificationAtom";
import {
  showFormAtom,
  formDataAtom,
  userIDAtom,
} from "../recoil/atom/createEditUserAtom";
import { usersDataAtom } from "../recoil/atom/usersDataAtom";
import axios from "axios";

export default function createEditUser() {
  const [open, setOpen] = useRecoilState(showFormAtom);
  const [userId, setUserId] = useRecoilState(userIDAtom);
  let [formData, setFormData] = useRecoilState(formDataAtom);
  const [notificationMessage, setNotificationMessage] = useRecoilState(notificationMessageAtom);
  const [notificationType, setNotificationType] = useRecoilState(notificationTypeAtom);
  const [notificationState, setNotificationState] = useRecoilState(notificationAtom);
  const cancelButtonRef = useRef(null);
  const [currentFormData, setCurrentFormData] = useState({});
  const [usersData, setUsersData] = useRecoilState(usersDataAtom);
  

  function formDataChange(event) {
    currentFormData[event.target.name] = event.target.value
  }
  function submitForm(){
    const axiosConfig = {
        method: userId?'put':'post',
        url: `https://dummyapi.io/data/v1/user/${userId??'create'}`,
        data: currentFormData,
        headers: {
          "app-id": import.meta.env.VITE_APP_ID,
          'Content-Type': 'application/json'
      }
    }
    
     axios(axiosConfig)
     .then(res=>{
      setUsersData(undefined)
      setNotificationType("success")
      setNotificationMessage(res.data)
      setNotificationState(true)
      setOpen(false)
     })
     .catch(err=>{
      setNotificationType("error")
      setNotificationMessage(err.response.data)
      setNotificationState(true)
    })
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 py-3"
                  >
                    {userId ? `Edit user ${userId}` : "Create new user"}
                  </Dialog.Title>
                  <div className="mt-2 text-sm text-gray-500">
                  
                    <form onChange={(event)=>formDataChange(event)} onSubmit={()=>{submitForm()}}>
                      <div className="flex flex-col gap-2">
                        <select
                          id="title"
                          name="title"
                          className="mt-1 block bg-gray-100 w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          defaultValue={formData?.user?.title ?? "Title"}
                          onChange={(event)=>formDataChange(event)}
                        >
                          <option disabled>Title</option>
                          <option>mr</option>
                          <option>mrs</option>
                          <option>miss</option>
                        </select>

                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          
                          className="pl-3 mt-1 pr-10 py-2 bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-sm border-gray-300 rounded-md"
                          placeholder="firstName"
                          defaultValue={formData?.user?.firstName ?? undefined}
                        />

                        <input
                          type="text"
                          name="lastName"
                          id="lastName"

                          className="pl-3 mt-1 pr-10 py-2 bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-sm border-gray-300 rounded-md"
                          placeholder="lastName"
                          defaultValue={formData?.user?.lastName ?? undefined}
                        />

                        <input
                          type="email"
                          name="email"
                          id="email"

                          className="pl-3 mt-1 pr-10 py-2 bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-sm border-gray-300 rounded-md"
                          placeholder="email"
                          defaultValue={formData?.user?.email ?? undefined}
                          required
                        />

                        <div>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            {formData?.user?.picture ? (
                              <img src={formData?.user?.picture ?? undefined} />
                            ) : (
                              <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 sm:text-sm">
                                Picture
                              </span>
                            )}

<input
                          type="picture"
                          name="picture"
                          id="picture"

                          className="pl-3 mt-1 pr-10 py-2 bg-gray-100 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm text-sm border-gray-300 rounded-md"
                          placeholder="picture url"
                          defaultValue={formData?.user?.picture}
                          required
                        />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={()=>{submitForm()}}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
