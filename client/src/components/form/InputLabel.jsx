/* eslint-disable react/prop-types */
const InputLabel = ({ formik, label, name }) => {
  return (
    <div className="flex items-center capitalize text-sm md:text-md gap-2 h-4 mb-1">
      <label htmlFor={label}>{label}</label>
      {formik.touched[name] && formik.errors[name] && (
        <h6>{formik.errors[name]}</h6>
      )}
    </div>
  );
};

export default InputLabel;
