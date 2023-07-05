import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../../auth/AuthProbaider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ItemWinRow from "./ItemWinRow";

export default function KoyelItemWin() {
  const { currentUser } = useContext(AuthContext);

  const {
    data: koyelItemswin = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["koyelItemswin", currentUser],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/my-wins/${currentUser?._id}/koyel?email=${currentUser?.email}`
      );
      const data = await res.json();
      return data;
    }
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Name</td>
              <td>Job</td>
              <td>company</td>
              <td>location</td>
              <td>Last Login</td>
              <td>Favorite Color</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...koyelItemswin]?.map(product => (
              <ItemWinRow data={product}></ItemWinRow>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <td>Name</td>
              <td>Job</td>
              <td>company</td>
              <td>location</td>
              <td>Last Login</td>
              <td>Favorite Color</td>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
