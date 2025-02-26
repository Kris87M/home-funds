import { Formik } from "formik";

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
                <Field type="date" name="date" />
                <ErrorMessage name="date" component="div" style={{ color: "red" }} />

                <label>Źródło dochodu:</label>
                <Field type="text" name="source" />
                <ErrorMessage name="email" component="div" style={{ color: "red" }} />

                <label>Kwota:</label>
                <Field type="number" name="amount" />
                <ErrorMessage name="amount" component="div" style={{ color: "red" }} />

                <button type="submit" disabled={isSubmitting}>Dodaj</button>
            </Form>
        )}
        </Formik>);
};

export default IncomeForm;