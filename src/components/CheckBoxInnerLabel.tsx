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
        className={`relative flex h-12 cursor-pointer items-center justify-center rounded border-2 p-2 shadow-sm transition-all duration-500 ease-in-out ${checked ? "border-palette-secondary shadow-palette-secondary group-hover:border-palette-secondary-dark group-hover:shadow-palette-secondary-dark" : "border-palette-inactive group-hover:border-palette-inactive-dark"}`}
      >
        <input
          type="checkbox"
          {...props}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
        />
        <label
          htmlFor={props.name}
          className="cursor-pointer overflow-hidden text-center text-sm text-ellipsis whitespace-nowrap text-white"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckBoxInnerLabel;
