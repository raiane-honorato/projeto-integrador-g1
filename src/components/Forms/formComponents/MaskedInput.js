import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

function MaskedInput({ value, mask, name, id, onChange }) {
  function handleChange(event) {
    onChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: onlyNumbers(event.target.value),
      },
    });
  }

  return (
    <InputMask
      mask={mask}
      value={value}
      name={name}
      id={id}
      onChange={handleChange}
      required
    />
  );
}

export default MaskedInput;
