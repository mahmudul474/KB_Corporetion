import React, { useState } from "react";
import { Tab } from '@headlessui/react'
export default function Upcommings() {
    const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div>
      <div>
        <h1>Upcoming Auctions</h1>
        <p>
          You are welcome to attend and join in the action at any of our
          upcoming auctions.
        </p>
      </div>
      <div>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="w-full border border-black flex justify-between items-center">
        <Tab  >Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
      </div>
    </div>
  );
}
