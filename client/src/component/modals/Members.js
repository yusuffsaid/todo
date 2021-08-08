import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setModal, themaState } from "../../features/themaSlice";
import ModalTemplate from "./ModalTemplate";

const Members = () => {
  const { members } = useSelector(themaState);
  const dispatch = useDispatch();

  return (
    <ModalTemplate>
      <div className="w-full max-h-52 px-2  mt-20  md:w-6/12 overflow-hidden bg-white flex justify-center py-6 m-1 rounded-sm shadow-2xl">
        <table class="table-fixed w-full">
          <thead>
            <tr className="text-left">
              <th class="w-1/3">Adı</th>
              <th class="w-1/3">Sil</th>
            </tr>
          </thead>
          <tbody>
            {members &&
              members.map((member, i) => (
                <tr className="text-left">
                  <td>{member.name}</td>
                  <td>
                    <button className="py-1 px-4 bg-red-300">Sil</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </ModalTemplate>
  );
};

export default Members;
