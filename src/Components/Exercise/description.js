import { useState } from "react";
import { Tab } from "@headlessui/react";
import ContentLoader, { List } from "react-content-loader";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Description = ({ exercise, submissions }) => {
  let [categories] = useState({
    Exercise: exercise,
    Submissions: submissions,
  });

  return (
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
      <Tab.Panels className="mt-2 space-x-1 rounded-xl bg-blue-800/10 p-1 font-medium">
        <Tab.Panel>
          {exercise && (
            <>
              <div className="text-lg px-2 pt-2">{exercise.description.title}</div>
              
              <div className="px-2 pt-2">{exercise.description.description}</div>

              <ul>
                {exercise.description.examples.map((example) => (
                  <>
                    <div className="text-sm font-medium leading-5">
                      {example.title}
                    </div>
                    <p>{example.desc}</p>
                  </>
                ))}
              </ul>
            </>
          )}
          {!exercise && <List />}
        </Tab.Panel>

        <Tab.Panel>List of submissions</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Description;
