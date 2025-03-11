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
        className="h-6 w-18 max-w-1/4 overflow-hidden rounded-md border-2 bg-palette-background px-2 py-3 text-sm leading-none text-ellipsis whitespace-nowrap text-white transition-all duration-500 ease-in-out outline-none hover:border-palette-accent focus:border-palette-accent focus:shadow-sm focus:shadow-palette-accent"
        {...props}
        style={{
          borderColor:
            isNumber(value) && value != defaultValue
              ? "var(--color-palette-accent)"
              : "",
        }}
        value={value}
      />
      <label
        className="overflow-hidden text-sm leading-none text-ellipsis whitespace-nowrap text-white lg:text-lg"
        htmlFor={props.name}
      >
        {label}
      </label>
    </div>
  );
};

export default InputNumeric;
