import { Buffer } from "buffer";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const FeedbackDiscolsure = ({ item }) => {
  return (
    <>
      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 transition duration-200 bg-blue-100 rounded-lg hover:bg-blue-300">
              <span>Source code</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-blue-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500">
              <div className="rounded-md bg-[#2a4555e1] text-sm font-normal text-white overflow-auto">
                <pre className="p-2 text-sm font-normal text-white ">
                  {Buffer.from(item?.source_code, "base64").toString("utf-8")}
                </pre>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

const Feedback = ({ submissions }) => {
  const parseDate = (date) => {
    let d = new Date(date);
    return d.toLocaleString();
  };

  return (
    <>
      {submissions.length > 0 &&
        submissions.map((item, index) =>
          item.submission_type === "feedback" ? (
            <>
              <div key={index} className="p-2 m-1 mt-4 bg-blue-200 rounded-xl">
                <div className="flex flex-row">
                  <div className={"mx-1 mt-2 font-semibold text-blue-900"}>
                    {item.feedback?.type === "case"
                      ? "Case " + (parseInt(item.feedback?.case) + 1)
                      : item.feedback?.type[0].toUpperCase() + item.feedback?.type.slice(1)}
                  </div>
                  <div className="flex-grow"></div>
                  <div className="mx-1 mt-2 text-sm font-semibold text-blue-900">
                    {parseDate(item.date_time)}
                  </div>
                </div>

                <div className="max-h-full p-2 mt-1 text-sm font-medium break-words transition duration-200 bg-orange-200 rounded-md text-amber-800">
                  {item?.feedback?.message}
                </div>
                <FeedbackDiscolsure item={item}></FeedbackDiscolsure>
              </div>
            </>
          ) : (
            ""
          )
        )}
    </>
  );
};

export default Feedback;
