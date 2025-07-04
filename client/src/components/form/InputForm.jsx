/* eslint-disable react/prop-types */
import InputLabel from "./InputLabel";
import DateComponent from "./DateComponent";
import { Input } from "@/components/ui/input";
import SelectComponent from "./SelectComponent";
import { Textarea } from "@/components/ui/textarea";

function InputForm({ formik, formControl, children, disabled = false }) {
  function renderComponentByType(control) {
    const { label, name, type, placeholder, maxLength, options } = control;
    const value = formik.values[name];
    const handleBlur = formik.handleBlur;
    const handleChange = formik.handleChange;

    switch (control.component) {
      case "input":
        return (
          <>
            {label && <InputLabel formik={formik} name={name} label={label} />}

            <Input
              id={label}
              name={name}
              type={type}
              value={value}
              disabled={disabled}
              onBlur={handleBlur}
              maxLength={maxLength}
              onChange={handleChange}
              placeholder={placeholder}
            />
          </>
        );

      case "select":
        return (
          <SelectComponent
            name={name}
            type={type}
            label={label}
            value={value}
            formik={formik}
            disabled={disabled}
            options={options}
            placeholder={placeholder}
            handleChange={handleChange}
          />
        );

      case "textarea":
        return (
          <>
            <InputLabel formik={formik} name={name} label={label} />
            <Textarea
              id={name}
              name={name}
              value={value}
              maxLength={maxLength}
              disabled={disabled}
              onChange={handleChange}
              placeholder={placeholder}
              className="resize-none h-60"
            />
          </>
        );
      case "date":
        return (
          <DateComponent
            name={name}
            label={label}
            value={value}
            formik={formik}
            disabled={disabled}
            placeholder={placeholder}
          />
        );

      default:
        return (
          <>
            <input
              id={label}
              name={name}
              type={type}
              value={value}
              onBlur={handleBlur}
              disabled={disabled}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full"
            />
          </>
        );
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {formControl.map((control) => (
        <div key={control.name}>{renderComponentByType(control)}</div>
      ))}
      <div>{children}</div>
    </form>
  );
}

export default InputForm;
