import { Select, Input } from "antd";

const { Option } = Select; // Wyodrębniamy `Option` do użycia w Select

const SelectInput = ({ field, form, options }) => {
    const handleChange = (value) => {
        form.setFieldValue(field.name, value); // Ustawienie wartości w Formik
    }

    return (
        <Select
            showSearch
            allowClear
            style={{ width: "100%" }}
            placeholder="Wybierz lub wpisz własną wartość"
            onChange={handleChange}
            onBlur={() => form.setFieldTouched(field.name, true)}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <div style={{ display: "flex", padding: 8 }}>
                        <Input
                            placeholder="Wpisz własną wartość"
                            onPressEnter={(e) => {
                                form.setFieldValue(field.name, e.target.value);
                                e.stopPropagation();
                            }}
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