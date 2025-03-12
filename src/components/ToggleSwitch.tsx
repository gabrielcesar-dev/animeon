interface ToggleSwitchProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  label?: string;
  title: string;
}

const ToggleSwitch = ({
  isChecked,
  onChange,
  label,
  title,
}: ToggleSwitchProps) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`relative inline-block h-6 w-12 cursor-pointer rounded-full border-2 ${isChecked ? "border-palette-primary-dark bg-palette-primary" : "border-palette-inactive-dark bg-palette-inactive"} transition-all duration-500 ease-in-out`}
      >
        <input
          className="absolute z-2 h-full w-full cursor-pointer appearance-none opacity-0"
          type="checkbox"
          checked={isChecked}
          name={title}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`absolute top-1/2 left-[3px] h-4 w-4 -translate-y-1/2 cursor-pointer rounded-full bg-palette-text transition-all duration-500 ease-in-out ${isChecked ? "-translate-x-full" : ""}`}
          style={
            isChecked
              ? {
                  left: "calc(100% - 3px)",
                }
              : {}
          }
        >
          {""}
        </div>
      </div>

      <label
        htmlFor={title}
        className="truncate text-sm text-palette-text sm:text-lg"
      >
        {label ?? ""}
      </label>
    </div>
  );
};

export default ToggleSwitch;
