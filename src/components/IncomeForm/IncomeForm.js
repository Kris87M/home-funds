import { Formik, Form, Field, ErrorMessage } from "formik";
import { Select, Input, Button } from "antd";

const IncomeForm = () => {
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
                <Field name="source">
                    {({ field }) => <Input {...field} type="text" placeholder="Źródło dochodu" />}
                </Field>
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