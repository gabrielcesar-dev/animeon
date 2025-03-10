interface CheckBoxInnerLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CheckBoxInnerLabel = ({ label, checked, ...props }: CheckBoxInnerLabelProps) => {
  return (
    <div className="group">
      <div
        className={`relative flex justify-center items-center p-2 border-2 rounded h-12 cursor-pointer group-focus:shadow-sm
                transition-all duration-500 ease-in-out 
                ${checked ? "border-palette-accent" : "border-white"}
                ${checked ? "group-hover:border-palette-accent-hover" : "group-hover:border-gray-300"}
                ${checked ? "group-focus:shadow-palette-accent" : "group-focus:shadow-white"}`}
      >
        <input
          type="checkbox"
          {...props}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <label
          htmlFor={props.name}
          className="text-white text-sm overflow-hidden text-ellipsis leading-none whitespace-nowrap text-center cursor-pointer"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckBoxInnerLabel;
