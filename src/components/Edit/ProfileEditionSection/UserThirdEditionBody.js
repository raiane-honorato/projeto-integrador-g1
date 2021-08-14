import "./userThirdEdition.css";
import Select, { components } from "react-select";
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { useEffect, useState } from "react";
import api from '../../../services/api';

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement((props) => {
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { ...props.innerProps, onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableMultiValueLabel = sortableHandle((props) => (
  <components.MultiValueLabel {...props} />
));

const SortableSelect = SortableContainer(Select);

function UserThirdEditionBody({ formik }) {
  const [selectedCauses, setSelectedCauses] = useState([]);
  const [selectedHabilities, setSelectedHabilities] = useState([]);
  const [habilities, setHabilities] = useState([]);
  const [causes, setCauses] = useState([]);


  useEffect(() => {
    api('/hability')
    .then(res => setHabilities(res.data))
    .catch((erro) => alert('Não foi possível carregar as habilidades!'))
  },[])

  useEffect(() => {
    api('/cause')
    .then(res => setCauses(res.data))
    .catch((erro) => alert('Não foi possível carregar as causas!'))
  },[])
  
 if(selectedHabilities){
  formik.values.habilities = [];
   for (let i in selectedHabilities) {      
      formik.values.habilities.push(selectedHabilities[i])
   }
 }


 if(selectedCauses){
  formik.values.causes = [];
   for (let i in selectedCauses) {      
      formik.values.causes.push(selectedCauses[i])
   }
 }

  const onChangeCause = (selectedOptions) => setSelectedCauses(selectedOptions);
  const onChangeHability = (selectedOptions) => setSelectedHabilities(selectedOptions);

  const onSortEndCause = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selectedCauses, oldIndex, newIndex);
    setSelectedCauses(newValue);

  };

  const onSortEndHability = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selectedHabilities, oldIndex, newIndex);
    setSelectedHabilities(newValue);
    
  };

  return (
    <div className="causesAndHabilities">
      <div className="inputs">
        <label>Causas</label>
        <SortableSelect
         name='habilities'
          useDragHandle
          // react-sortable-hoc props:
          axis="xy"
          onSortEnd={onSortEndCause}
          distance={4}
          // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
          getHelperDimensions={({ node }) => node.getBoundingClientRect()}
          // react-select props:
          isMulti
          options={causes}
          value={selectedCauses}
          onChange={onChangeCause}
          components={{
            MultiValue: SortableMultiValue,
            MultiValueLabel: SortableMultiValueLabel,
          }}
          closeMenuOnSelect={false}
        />
      </div>

      <div className="inputs">
        <label>Habilidades</label>
        <SortableSelect
        name='habilities'
          useDragHandle
          // react-sortable-hoc props:
          axis="xy"
          onSortEnd={onSortEndHability}
          distance={4}
          // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
          getHelperDimensions={({ node }) => node.getBoundingClientRect()}
          // react-select props:
          isMulti
          options={habilities}
          value={selectedHabilities}
          onChange={onChangeHability}
          components={{
            MultiValue: SortableMultiValue,
            MultiValueLabel: SortableMultiValueLabel,
          }}
          closeMenuOnSelect={false}
        />
      </div>
        
    </div>
  );
}

export default UserThirdEditionBody;
