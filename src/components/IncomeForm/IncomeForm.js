import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";
import SelectInput from "components/SelectInput/SelectInput";
import { useDispatch } from "react-redux";
import { postIncome } from "connector";

const IncomeForm = () => {
    const dispatch = useDispatch();
    return ( 
        <Formik
            initialValues={{ date: "", source: "", amount: "" }}
            onSubmit={(values) => {
                console.log("Dodano:", values);
                dispatch(postIncome(values));
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