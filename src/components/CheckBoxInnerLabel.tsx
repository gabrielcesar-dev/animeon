interface CheckBoxInnerLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CheckBoxInnerLabel = ({
  label,
  checked,
  ...props
}: CheckBoxInnerLabelProps) => {
  return (
    <div className="group">
      <div
        className={`relative flex h-12 cursor-pointer items-center justify-center rounded border-2 p-2 transition-all duration-500 ease-in-out group-focus:shadow-sm ${checked ? "border-palette-accent" : "border-white"} ${checked ? "group-hover:border-palette-accent-hover" : "group-hover:border-gray-300"} ${checked ? "group-focus:shadow-palette-accent" : "group-focus:shadow-white"}`}
      >
        <input
          type="checkbox"
          {...props}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
        />
        <label
          htmlFor={props.name}
          className="cursor-pointer overflow-hidden text-center text-sm leading-none text-ellipsis whitespace-nowrap text-white"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckBoxInnerLabel;
