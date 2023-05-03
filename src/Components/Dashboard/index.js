import React, { useEffect, useState, useMemo, useReducer } from "react";
import { columnsExercise } from "./tableModels";
import Table from "./table";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const rerender = useReducer(() => ({}), {})[1];
  const [data, setData] = useState(false);
  const columns = useMemo(() => columnsExercise, []);

  const getData = async () => {
    try {
      const response = await axios.get(apiUrl + "/exercise/all");
      setData(response.data.exercises);
    } catch (err) {
      console.log("error geting exercises" + err);
      setData(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex h-full w-full px-1">
      {data && <Table columns={columns} data={data} />}
    </div>
  );
};

export default Dashboard;
