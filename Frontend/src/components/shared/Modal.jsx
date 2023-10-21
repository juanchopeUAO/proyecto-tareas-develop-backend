/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { createPortal } from 'react-dom';

export function Modal({
  active, toogle, children, notification,
}) {
  return createPortal(
    <div className={`h-screen w-screen fixed top-0 ${!active && 'hidden'}`}>
      <div
        className={`flex h-full justify-center items-center -z-10 ${!notification && 'bg-black bg-opacity-50'}`}
        onClick={toogle}
      >
        <button
          type="button"
          onClick={toogle}
          className="absolute top-5 right-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal'),
  );
}
