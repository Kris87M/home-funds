import { Formik, Form, Field, ErrorMessage } from "formik";
import { Select, Input, Button } from "antd";

const IncomeForm = () => {
    const { Option } = Select; // Wyodrębniamy `Option` do użycia w Select

    const CustomSelect = ({ field, form, options }) => {
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

    return ( 
        <Formik
            initialValues={{ date: "", source: "", amount: "" }}
            onSubmit={(values) => {
                console.log("Dodano:", values);
            }}
        >

        {({ isSubmitting }) => (
            <Form>
                <label>Data:</label>
                <Field name="date">
                    {({ field }) => <Input {...field} type="date" placeholder="Data" />}
                </Field>
                <ErrorMessage name="date" component="div" style={{ color: "red" }} />

                <label>Źródło dochodu:</label>
                <Field
                    name="source"
                    component={CustomSelect}
                    options={["Opcja 1", "Opcja 2", "Opcja 3"]}
                />
                <ErrorMessage name="source" component="div" style={{ color: "red" }} />

                <label>Kwota:</label>
                <Field name="amount">
                    {({ field }) => <Input {...field} type="number" placeholder="Kwota" />}
                </Field>
                <ErrorMessage name="amount" component="div" style={{ color: "red" }} />

                <Button type="primary" htmlType="submit" disabled={isSubmitting}>Dodaj</Button>
            </Form>
        )}
        </Formik>);
};

export default IncomeForm;