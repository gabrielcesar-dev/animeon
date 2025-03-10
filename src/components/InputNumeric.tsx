interface InputNumericProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const isNumber = (value: string | number | readonly string[] | undefined): boolean => 
  typeof value === 'number' || (typeof value === 'string' && !isNaN(parseFloat(value)) && isFinite(parseFloat(value)));


const InputNumeric = ({ label, defaultValue, value, ...props }: InputNumericProps) => {
  return (
    <div className="inline-flex items-center gap-2 ">
        <input
            type="text" 
            inputMode="numeric" 
            pattern="[0-9]*" 
            className="text-white overflow-hidden text-ellipsis leading-none whitespace-nowrap text-sm bg-palette-background rounded h-6 max-w-1/4 px-2 py-3 border-2 outline-none hover:border-palette-accent 
                       focus:border-palette-accent focus:shadow-sm focus:shadow-palette-accent transition-all duration-500 ease-in-out w-18"
            {...props}
            style={{
                borderColor: isNumber(value) && value != defaultValue ? "var(--color-palette-accent)" : "",
            }}
            value={value}
        />
        <label className="text-white text-sm lg:text-lg overflow-hidden text-ellipsis leading-none whitespace-nowrap" htmlFor={props.name}>{ label }</label>
    </div>
  );
}

export default InputNumeric;