import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditButton.css";

function EditButton(props) {

    return (
        <FontAwesomeIcon className={`edit-button ${props.editClass}`} icon={faPen} size="1x" alt="Edit" onClick={(event) => props.setStatePass(true)}/>
    ) 
}

export default EditButton;