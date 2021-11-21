import clsx from "clsx";
import { InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import { Table } from "../components/Table";
import { User } from "./api/getUsers";

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/getUsers`);
  const data: User[] = await res.json();

  return {
    props: { users: data },
  };
}

export default function Home({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [pagination, setPagination] = useState<number>(1);
  const [numberResultsPerPage, setNumberResultsPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<{ name: string; type: "asc" | "desc" }>({
    name: "id",
    type: "asc",
  });

  function changeFilter(key: string) {
    if (filter.name !== key) {
      setFilter({ name: key, type: "asc" });
    } else {
      setFilter({ name: key, type: filter.type === "asc" ? "desc" : "asc" });
    }
  }

  const usersFiltered = users.sort((a, b) => {
    if (filter.type === "asc") {
      return Number(a[filter.name] > b[filter.name]);
    } else {
      return Number(a[filter.name] < b[filter.name]);
    }
  });

  const maxPagination = Math.ceil(users.length / numberResultsPerPage);

  return (
    <div className="bg-gray-100">
      <div className="lg:container mx-auto py-5">
        <p>Users retrieve by the API : {users.length} users</p>

        <label>
          Number of results by page :
          <input
            className="ml-3"
            value={numberResultsPerPage}
            onChange={(e) => {
              setNumberResultsPerPage(Number(e.target.value));
            }}
          />
        </label>

        <Table
          datas={usersFiltered.slice(
            (pagination - 1) * numberResultsPerPage,
            pagination * numberResultsPerPage
          )}
          columns={[
            { name: "#", key: "id" },
            { name: "Name", key: "name" },
            { name: "Age", key: "age" },
          ]}
          filter={filter}
          changeFilter={changeFilter}
        />
        <div className="space-x-2">
          <button
            className={clsx(
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
              pagination === 1 ? "opacity-50 cursor-not-allowed" : ""
            )}
            disabled={pagination === 1}
            onClick={() => setPagination(pagination - 1)}
          >
            Précédent
          </button>

          <button
            className={clsx(
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
              pagination === maxPagination
                ? "opacity-50 cursor-not-allowed"
                : ""
            )}
            disabled={pagination === maxPagination}
            onClick={() => setPagination(pagination + 1)}
          >
            Suivant
          </button>
        </div>
        <p className="mt-2">
          Page {pagination} / {maxPagination}
        </p>
      </div>
    </div>
  );
}
