import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";
import SelectInput from "components/SelectInput/SelectInput";
import { useState } from "react";

const IncomeForm = ({onSubmit}) => {
    const [options, setOptions] = useState(["Opcja 1", "Opcja 2", "Opcja 3"]);
    return ( 
        <Formik
            initialValues={{ date: "", source: "", amount: "" }}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values); // Wywołanie funkcji przekazanej z Parent
                resetForm();
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
                        component={SelectInput}
                        options={options}
                        setOptions={setOptions}
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
        </Formik>
    );
};

export default IncomeForm;