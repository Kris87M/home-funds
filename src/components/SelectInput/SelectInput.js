import { Select, Input } from "antd";
import { useState } from "react";

const { Option } = Select; // Wyodrębniamy `Option` do użycia w Select

const SelectInput = ({ field, form, options, setOptions }) => {
  const [inputValue, setInputValue] = useState("");

  const handlePressEnter = (e) => {
    const newValue = e.target.value.trim(); // metoda .trim usuwa zbędne spacje na początku i końcu wartości 
    if (newValue && !options.includes(newValue)) {
        setOptions([...options, newValue]); // Dodanie nowej wartości do listy
    }
    form.setFieldValue(field.name, newValue); // Ustawienie wartości w Formik
    setInputValue(""); // Wyczyszczenie inputa
    e.stopPropagation(); // zapobiega zamknięciu okna po wciśnięciu entera
  };

  return (
    <Select
      showSearch
      allowClear
      style={{ width: "100%" }}
      placeholder="Wybierz lub wpisz własną wartość"
      onChange={(value) => form.setFieldValue(field.name, value)}
      onBlur={() => form.setFieldTouched(field.name, true)}
      dropdownRender={(menu) => (
        <>
          {menu}
          <div style={{ display: "flex", padding: 8 }}>
            <Input
              placeholder="Wpisz własną wartość"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handlePressEnter}
            />
          </div>
        </>
      )}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  )
};

export default SelectInput;