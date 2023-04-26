import { Buffer } from "buffer";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const FeedbackDiscolsure = ({ item }) => {
  return (
    <>
      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 transition duration-200 hover:bg-blue-300">
              <span>Source code</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-blue-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500">
              <div className="rounded-md bg-[#2a4555e1] text-sm font-normal text-white">
                <pre className="px-2 py-1 text-sm font-normal text-white ">
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
              <div key={index} className="m-1 mt-4 rounded-xl bg-blue-200 p-2">
                <div className="mx-1 mt-2 text-sm font-semibold text-blue-900">
                  {parseDate(item.date_time)}
                </div>
                <div className="mt-1 max-h-full break-words rounded-md bg-orange-200 px-2 py-1 text-sm font-medium text-red-800 transition duration-200">
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
