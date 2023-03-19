import { Link } from "react-router-dom";

export const columnsExercise = [
  {
    accessorFn: (row) => row.description.title,
    header: "Title",
    footer: (info) => info.column.id,
    cell: props => (
      <Link to={`/exercise/${props.row.original.exercise_id}`}>{props.getValue()}</Link>
    ),
  },
  {
    accessorKey: "creation_date",
    header: "Date",
    footer: (info) => info.column.id,
  },
];
