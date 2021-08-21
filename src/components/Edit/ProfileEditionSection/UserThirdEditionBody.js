import "./userThirdEdition.css";
import { useContext, useEffect, useState } from "react";
import api from "../../../services/api";
import Multiselect from "multiselect-react-dropdown";
import { AuthContext } from "../../../context/auth";

function UserThirdEditionBody({ formik }) {
  const { user } = useContext(AuthContext);
  const [habilities, setHabilities] = useState([]);
  const [causes, setCauses] = useState([]);
  const [userCauses, setUserCauses] = useState(user.causes);
  const [userHabilities, setUserHabilities ] = useState(user.habilities);
 

  useEffect(() => {
    api("/hability")
      .then((res) => setHabilities(res.data))
      .catch((erro) => alert("Não foi possível carregar as habilidades!"));
  }, []);

  useEffect(() => {
    api("/cause")
      .then((res) => setCauses(res.data))
      .catch((erro) => alert("Não foi possível carregar as causas!"));
  }, []);

  useEffect(() => {
    setUserCauses(user.causes)
  
},[causes, user.causes])

useEffect(() => {
  setUserHabilities(user.habilities)

},[habilities, user.habilities])

  //chosen cause
  let onChangeCause = (selectedList, selectedItem) => {
    formik.setFieldValue("causes", selectedList);
  };

  //chosen hability
  let onChangHability = (selectedList, selectedItem) => {
    formik.setFieldValue("habilities", selectedList);
  };

  return (
    <div className="causesAndHabilities">
      <div className="inputs">
        <label>Causas</label>
        {causes && userCauses &&(
          <Multiselect
            options={causes}
            displayValue="label"
            selectedValues={userCauses}
            selectionLimit="3"
            placeholder="Selecione até 3 causas"
            onSelect={onChangeCause}
            onRemove={onChangeCause}
            avoidHighlightFirstOption="true"
            style={{
              chips: { background: "var(--secondColor)" },
              multiselectContainer: {
                color: "var(--secondColor)",
                background: "white",
                padding: "0.7rem !important",
                borderRadius: "5px",
                border: "none",
                boxShadow: "1px 1px 4px #9c9c9c",
              },
              inputField: {
                font: "var(--secondFont)",
                fontSize: ".8rem",
                width: "15rem",
              },
            }}
          />
        )}
      </div>

      <div className="inputs">
        <label>Habilidades</label>
        {habilities && userHabilities && (
          <Multiselect
            options={habilities}
            displayValue="label"
            selectedValues={user.habilities}
            selectionLimit="3"
            placeholder="Selecione até 3 causas"
            onSelect={onChangHability}
            onRemove={onChangHability}
            avoidHighlightFirstOption="true"
            style={{
              chips: { background: "var(--secondColor)" },
              multiselectContainer: {
                color: "var(--secondColor)",
                background: "white",
                padding: "0.7rem !important",
                borderRadius: "5px",
                border: "none",
                boxShadow: "1px 1px 4px #9c9c9c",
              },
              inputField: {
                font: "var(--secondFont)",
                fontSize: ".8rem",
                width: "15rem",
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default UserThirdEditionBody;
