import { useEffect } from "react";
import { useFormik } from "formik";
import { newValidationSchema } from "@/lib/utils";

export const useFormSchema = (
  state,
  control,
  action,
  params,
  resetOnSubmit = true
) => {
  const formik = useFormik({
    initialValues: state,
    validationSchema: newValidationSchema(control),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      let dataToSend;

      if (values.images) {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (Array.isArray(values[key])) {
            values[key].forEach((file) => {
              formData.append(key, file);
            });
          } else {
            formData.append(key, values[key]);
          }
        });
        dataToSend = formData;
      } else {
        dataToSend = values;
      }

      try {
        await action(dataToSend, params);
        if (resetOnSubmit) {
          resetForm();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (Object.keys(state).length) {
      formik.validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return formik;
};
