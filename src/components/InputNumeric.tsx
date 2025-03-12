interface InputNumericProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const isNumber = (
  value: string | number | readonly string[] | undefined
): boolean =>
  typeof value === "number" ||
  (typeof value === "string" &&
    !isNaN(parseFloat(value)) &&
    isFinite(parseFloat(value)));

const InputNumeric = ({
  label,
  defaultValue,
  value,
  ...props
}: InputNumericProps) => {
  return (
    <div className="inline-flex items-center gap-2">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className={`h-6 w-18 max-w-1/4 overflow-hidden rounded-md border-2 shadow-sm ${isNumber(value) && value != defaultValue ? "border-palette-primary hover:border-palette-primary-dark focus:shadow-palette-primary-dark" : "border-palette-inactive hover:border-palette-inactive-dark focus:shadow-palette-inactive-dark"} truncate bg-palette-background-modal px-2 py-3 text-sm text-palette-text transition-all duration-500 ease-in-out outline-none`}
        {...props}
        value={value}
      />
      <label
        className="truncate text-sm text-palette-text lg:text-lg"
        htmlFor={props.name}
      >
        {label}
      </label>
    </div>
  );
};

export default InputNumeric;
