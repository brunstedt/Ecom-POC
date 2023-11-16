import { Fragment } from 'react'
import { twJoin} from 'tailwind-merge'
import IconButton from '@/components/iconButton/IconButton'
import { Dialog, Transition } from '@headlessui/react'

export type DrawerProps = {
  children: React.ReactNode
  isOpen: boolean
  title?: string
  onClose: () => void
  hideCloseButton?: boolean
  backDrop?: boolean
}

export default function Drawer(props: DrawerProps) {

    return (
        <Transition.Root show={props.isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-20"
                onClose={props.onClose}
            >
                {props.backDrop ? (
                    <Transition.Child
                        enter="transition duration-300 ease-out"
                        enterFrom="transform opacity-0"
                        enterTo="transform opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform opacity-100"
                        leaveTo="transform opacity-0"
                        as={Fragment}
                    >
                        <div
                            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
                        />
                    </Transition.Child>
                ) : null}

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen md:max-w-xl">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div
                                            className={twJoin(
                                                'border-base-90 flex w-full items-center border-b px-4 py-2 md:px-6 md:py-4 font-display',
                                                props.title ? 'justify-between' : 'justify-end',
                                            )}
                                        >
                                            {props.title ? (
                                                <Dialog.Title>
                                                    <span className="font-medium md:text-xl">
                                                        {props.title}
                                                    </span>
                                                </Dialog.Title>
                                            ) : null}
                                            {!props.hideCloseButton ? (
                                                <div className="flex items-center">
                                                    <IconButton
                                                        icon="x-mark"
                                                        onClick={props.onClose}
                                                        aria-label="Close"
                                                        size="small"
                                                        testId="drawer-close-button"
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                        <div
                                            className="relative flex grow flex-col overflow-y-auto"
                                        >
                                            {props.children}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
