import { Menu, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";

export default function Dropdown({
  day,
  setDay,
}: {
  day: 1 | 2;
  setDay: Dispatch<SetStateAction<2 | 1>>;
}) {
  return (
    <Menu as="div" className="w-full h-full relative">
      <div className="w-full h-full">
        <Menu.Button className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] w-full flex sm:gap-4 gap-1 justify-center items-center h-full font-medium text-sm sm:text-base lg:text-lg">
          Day {day}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-40 sm:w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  type='button'
                  disabled={process.env.NEXT_PUBLIC_DAY === "2"}
                  onClick={() => setDay(1)}
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  } group flex w-full  items-center rounded-md px-2 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Day 1
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  disabled={process.env.NEXT_PUBLIC_DAY === "1"}
                  onClick={() => setDay(2)}
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  } group flex w-full  items-center rounded-md px-2 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Day 2
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
