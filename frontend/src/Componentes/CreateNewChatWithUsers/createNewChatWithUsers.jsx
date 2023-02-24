import React, { useState } from "react";
import { useSkuadLackContext } from "../../contexts/skuadLack-context";
import fetchSupreme from "../../utils/apiWrapper";
import styles from "./createNewChatWithUsers.css";
import { MultiSelectUnstyled } from "@mui/base/SelectUnstyled";

//Vamos a cambiar esto por un modal donde sale un checkbox y eliges la opción que quieras para crear un chat!!


const CreateNewChatWithUsers = () => {
  const [usersOrg, setUsersOrg] = useState([""]);

  const {
    chats,
    myOrganizaciones,
    idOrganizacionActual,
    myUserName,
    idUser,
    organizacionActual,
    userOfOrganizacionActual,
  } = useSkuadLackContext();

  fetchSupreme(
    `/organizacionUsers/${idOrganizacionActual}`,
    "GET",
    undefined,
    true,
    undefined
  ).then((res) => {
    setUsersOrg(res);
  });

  return (
    <div>
      <button class="MuiSelectUnstyled-root" type="button">
        Open
      </button>
      <div class="MuiSelectUnstyled-popper">
        <ul class="MuiSelectUnstyled-listbox">
            {usersOrg.map((e)=>{

                <li key={e._id} class="MuiOptionUnstyled-root">{e.userName}</li>

            })}
        </ul>
      </div>
    </div>
  );
};

export default CreateNewChatWithUsers;
