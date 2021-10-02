import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '@/libs/style-utils';

export default function UserMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex items-center bg-gray-100 rounded-full focus:outline-none">
              <span className="sr-only">User options</span>
              {/* <img
                className="inline-block w-10 h-10 rounded-full"
                src={session?.user?.image || ""}
                alt={session?.user?.name || "/icon.png"}
              /> */}
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-sm shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {/* {({ active }) => (
                    <div
                      onClick={handleSignout}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "cursor-pointer block px-4 py-2 text-sm"
                      )}
                    >
                      ログアウト
                    </div>
                  )} */}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
