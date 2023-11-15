'use client'

import { Tab } from '@headlessui/react'

type TabsProps = {
    tabs: {
        title: string
        content: React.ReactNode
        id: string
    }[]
}

export default function Tabs(props: TabsProps) {

    return (
        <Tab.Group>
            <Tab.List>
                {props.tabs.map((tab) => (
                    <Tab key={`${tab.id}-content`} className="ui-selected:text-white text-black  ui-selected:bg-pink-500 tracking-wide px-3 py-2">
                        {tab.title}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
                {props.tabs.map((tab) => (
                    <Tab.Panel key={`${tab.id}-content`}>{tab.content}</Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}