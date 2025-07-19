import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import goldTree from "../../../assets/images/goldtree.png"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    return (
        <Disclosure as="nav" className="bg-amber-300">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <NavLink to="/">
                                <img
                                    alt="Your Company"
                                    src={goldTree}
                                    className="h-10 w-10 rounded-full"
                                />
                            </NavLink>
                        </div>

                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <NavLink
                                    to="/user/dashboard"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "bg-white text-amber-300 rounded-md px-8 py-2 text-sm font-medium"
                                            : "text-white hover:bg-gray-50 hover:text-amber-300 rounded-md px-8 py-2 text-sm font-medium"
                                    }
                                >
                                    Dashboard
                                </NavLink>


                                <NavLink
                                    to="/about"
                                    className="text-white hover:bg-gray-50 hover:text-amber-300 rounded-md px-8 py-2 text-sm font-medium"
                                >
                                    About
                                </NavLink>
                                <NavLink
                                    to="/gallery"
                                    className="text-white hover:bg-gray-50 hover:text-amber-300 rounded-md px-8 py-2 text-sm font-medium"
                                >
                                    Gallery
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    className="text-white hover:bg-gray-50 hover:text-amber-300 rounded-md px-8 py-2 text-sm font-medium"
                                >
                                    Contact Us
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    <NavLink
                        to="/user/dashboard"
                        className={({ isActive }) =>
                            classNames(
                                isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="text-white hover:bg-gray-50 hover:text-amber-300 rounded-md px-8 py-2 text-sm font-medium"
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/gallery"
                        className="text-white hover:bg-gray-50 hover:text-amber-300 rounded-md px-8 py-2 text-sm font-medium"
                    >
                        Gallery
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="text-white hover:bg-gray-50 hover:text-amber-300 rounded-md px-8 py-2 text-sm font-medium"
                    >
                        Contact Us
                    </NavLink>

                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
