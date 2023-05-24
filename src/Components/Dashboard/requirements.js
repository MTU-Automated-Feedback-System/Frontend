const Requirements = ({
  requirements,
  setRequirements,
  requirementsIndex,
  setRequirementsIndex,
}) => {
  const addRequirement = () => {
    setRequirements([...requirements, { hint: "", name: "", occurences: [] }]);
    setRequirementsIndex(requirements.length);
  };

  const deleteRequirement = (index) => {
    const newRequirements = [...requirements];
    newRequirements.splice(index, 1);

    if (index === requirementsIndex) {
      if (index === requirements.length - 1) {
        setRequirementsIndex(index - 1);
      }
    }

    if (index !== requirementsIndex) {
      if (requirementsIndex === requirements.length - 1) {
        setRequirementsIndex(requirementsIndex - 1);
      }
    }

    setRequirements(newRequirements);
  };

  return (
    <div className="group relative z-0 mb-6 w-full">
      <div className="mb-1 pl-1 text-base font-medium text-gray-800">
        Requirements{" "}
        <span className="text-blue-700 ">&darr; {requirementsIndex + 1} </span>
      </div>

      <div className="mt-2 flex flex-row">
        <button
          className="mb-2 mr-2 flex-shrink-0 rounded-md bg-green-200 px-2 py-1
              font-semibold text-green-700 transition duration-200 hover:bg-green-100"
          onClick={() => addRequirement()}
        >
          +
        </button>
        <div>
          {requirements.map((e, index) => (
            <>
              <button
                className={
                  "mb-2 flex-shrink-0 rounded-l-md px-2 py-1 font-medium text-blue-700 transition duration-200 hover:bg-blue-100" +
                  (index === requirementsIndex
                    ? " bg-blue-100"
                    : " bg-blue-200")
                }
                onClick={() => setRequirementsIndex(index)}
              >
                Requirement {index + 1}
              </button>
              <button
                className={
                  "mb-2 mr-2 flex-shrink-0 rounded-r-md bg-orange-200 px-2 py-1 font-medium text-orange-700 transition duration-200 hover:bg-orange-100 "
                }
                onClick={() => deleteRequirement(index)}
              >
                X
              </button>
            </>
          ))}
        </div>
      </div>

      {requirements.length > 0 && (
        <>
          <div className="group relative z-0 mb-4 mt-3 w-full">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
              placeholder=" "
              value={requirements[requirementsIndex].name}
              onChange={(e) => {
                // set requirement title
                const newRequirements = [...requirements];
                newRequirements[requirementsIndex].name = e.target.value;
                setRequirements(newRequirements);
              }}
            />

            <label
              for="floating_email"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Requirement {requirementsIndex + 1} Name
            </label>
          </div>

          <div className="group relative z-0 mb-4 mt-3 w-full">
            <input
              type="text"
              name="floating_email"
              id="floating_email"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-2.5 text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0  "
              placeholder=" "
              value={requirements[requirementsIndex].hint}
              onChange={(e) => {
                // set requirement hint
                const newRequirements = [...requirements];
                newRequirements[requirementsIndex].hint = e.target.value;
                setRequirements(newRequirements);
              }}
            />

            <label
              for="floating_email"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Requirement {requirementsIndex + 1} hint
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default Requirements;
