import { useState } from "react";
import { Tab } from "@headlessui/react";
import ContentLoader, { List } from "react-content-loader";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Description = ({ exercise, submissions , updateCurrentSubmission}) => {
  let [categories] = useState({
    Exercise: exercise,
    Submissions: submissions,
  });

  const parseDate = (date) => {
    let d = new Date(date);
    return d.toLocaleString();
  }

  return (
    <Tab.Group>
      <Tab.List className="flex h-10 space-x-1 rounded-xl bg-blue-900/20 p-1 ">
        {Object.keys(categories).map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-1.5 text-sm font-medium leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-blue-500"
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2 h-full space-x-1 overflow-y-auto rounded-xl bg-blue-800/10 p-1 font-medium">
        <Tab.Panel>
          {exercise && (
            <>
              <div className="px-2 pt-2 text-lg">
                {exercise.description.title}
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: exercise.description.description,
                }}
                className="px-2 pt-2"
              />

              <ul className="pt-3">
                {exercise.description.examples.map((item, index) => (
                  <li key={index}>
                    {Object.entries(item).map(([key, value]) => (
                      <>
                        <div className="pl-3 pt-3 text-sm font-bold leading-5">
                          {key}:
                        </div>
                        <div className="m-2 rounded-xl bg-blue-400/20 p-2">
                          <div
                            dangerouslySetInnerHTML={{ __html: value }}
                            className="overflow-auto px-2 font-mono"
                          />
                        </div>
                      </>
                    ))}
                  </li>
                ))}
              </ul>
            </>
          )}
          {!exercise && <List />}
        </Tab.Panel>

        <Tab.Panel>
          {submissions.length > 0 &&
            submissions.map((item, index) =>

              item.submission_type === "run" ? (
                <>
                  <div
                    key={index}
                    className="m-1 mt-3 rounded-xl bg-blue-400/20 hover:bg-blue-400/40 cursor-pointer"
                    onClick={() => {updateCurrentSubmission(index)}}
                  >
                    <div className="flex flex-row">
                      <div
                        className={
                          "py-3 px-2 font-semibold " +
                          (item.cases == 0
                            ? "text-green-700"
                            : "text-red-700")
                        }
                      >
                        {item.cases == 0
                          ? "Success"
                          : item.compiled_status === "error"
                          ? "Error"
                          : " " +
                            (item.test_cases.length - item.cases) +
                            " / " +
                            item.test_cases.length +
                            " cases"}
                      </div>
                      <div className="flex-grow"></div>
                      <div className="py-3 pr-2 font-semibold">{parseDate(item.date_time)}</div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )
            )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Description;
