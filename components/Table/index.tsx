export function Table<T>({
  columns,
  datas,
  filter,
  changeFilter,
}: {
  columns: { name: string; key: string }[];
  datas: T[];
  filter: { name: string; type: "asc" | "desc" };
  changeFilter: (key: string) => void;
}) {
  return (
    <table className="table-auto my-5">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="px-4 py-2"
              onClick={(e) => {
                changeFilter(column.key);
              }}
            >
              {column.name}{" "}
              {filter.name === column.key &&
                (filter.type === "asc" ? "▲" : "▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datas.map((data) => (
          <tr>
            {columns.map((column) => (
              <td className="border px-4 py-2">{data[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
