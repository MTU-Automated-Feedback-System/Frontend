import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Description = ({ description, submissions }) => {
  let [categories] = useState({
    Description: description,
    Submissions: submissions,
  });

  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <h1>{description.title}</h1>
            <p>{description.description}</p>

            <ul>
              {description.examples.map((example) => (
                <>
                  <h3 className="text-sm font-medium leading-5">
                    {example.title}
                  </h3>
                  <p>{example.desc}</p>
                </>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel>List of submissions</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Description;
