'use client';

import { hideCommonAlert } from '@Src/shared/alert/model/common-alert-slice';
import { RootState } from '@Src/shared/libs/store/model/store-type';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CommonAlert() {
  const dispatch = useDispatch();

  const {
    isShow,
    messageHTML,
    okBtnName,
    okBtnColor,
    okBtnCallback,
    cancelBtnName,
    cancelBtnColor,
    cancelBtnCallback,
  } = useSelector((state: RootState) => state.commonAlert);

  const handleOk = useCallback(() => {
    if (okBtnCallback) {
      okBtnCallback();
    }
    dispatch(hideCommonAlert());
  }, [dispatch, okBtnCallback]);

  const handleClose = useCallback(() => {
    if (cancelBtnCallback) {
      cancelBtnCallback();
    }
    dispatch(hideCommonAlert());
  }, [dispatch, cancelBtnCallback]);

  return (
    <>
      {isShow && (
        // <dialog className="relative" open={isShow} onClose={handleClose}>
        <div
          id="alert-root"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden bg-black/20 fixed top-0 right-0 left-0 z-[1050] flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3
                  className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: messageHTML }}
                />
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className={`text-white ${okBtnColor ? `bg-${okBtnColor}` : 'bg-red-600'} ${okBtnColor ? `hover:bg-${okBtnColor}-dark` : 'hover:bg-red-800'} focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                    onClick={handleOk}
                  >
                    <p className="min-w-[50px]">{okBtnName || 'OK'}</p>
                  </button>
                  <button
                    type="button"
                    className={`py-2.5 px-5 ms-3 text-sm font-medium ${cancelBtnColor ? 'text-white' : 'text-gray-900'} ${cancelBtnColor ? '' : 'hover:text-blue-700'} focus:outline-none ${cancelBtnColor ? `bg-${cancelBtnColor}` : 'bg-white'} ${cancelBtnColor ? `hover:bg-${cancelBtnColor}-dark` : 'hover:bg-gray-100'} rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                    // className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-primary hover:bg-primary-dark rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleClose}
                  >
                    <p className="min-w-[50px]">{cancelBtnName || 'Cancel'}</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        // </dialog>
      )}
    </>
  );
}
