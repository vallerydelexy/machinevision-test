import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { useRecoilState } from "recoil";
import { deleteDataAtom, deleteDataIdAtom, deleteDataTypeAtom } from '../recoil/atom/deleteDataAtom';
import {
  notificationAtom,
  notificationTypeAtom,
  notificationMessageAtom,
} from "../recoil/atom/notificationAtom";
import { usersDataAtom } from '../recoil/atom/usersDataAtom';
import axios from 'axios';

export default function DeleteData() {
  const [deleteType, setDeleteType] = useRecoilState(deleteDataTypeAtom)
  const [id, setId] = useRecoilState(deleteDataIdAtom)
  const [open, setOpen] = useRecoilState(deleteDataAtom)
  const [notificationMessage, setNotificationMessage] = useRecoilState(notificationMessageAtom);
  const [notificationType, setNotificationType] = useRecoilState(notificationTypeAtom);
  const [notificationState, setNotificationState] = useRecoilState(notificationAtom);
  const [usersData, setUsersData] = useRecoilState(usersDataAtom);
  const cancelButtonRef = useRef(null)
function doDelete(){
  const axiosConfig = {
      method: 'delete',
      url: `https://dummyapi.io/data/v1/${deleteType}/${id}`,
      headers: {
        "app-id": import.meta.env.VITE_APP_ID,
        'Content-Type': 'application/json'
    }
  }
  console.log(axiosConfig);
   axios(axiosConfig)
   .then(res=>{
    setUsersData(undefined)
    setNotificationType("success")
    setNotificationMessage(res)
    setNotificationState(true)
    setDeleteType(undefined)
    setOpen(false)
   })
   .catch(err=>{
    setNotificationType("error")
    setDeleteType(undefined)
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
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
                <div className="text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Are you sure want to delete this data
                  </Dialog.Title>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                  onClick={() => doDelete()}
                >
                  Yes, delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  No, Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}