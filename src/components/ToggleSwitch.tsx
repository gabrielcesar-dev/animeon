import theme from "../constants/theme";

interface ToggleSwitchProps {
    isChecked: boolean;
    onChange: (isChecked: boolean) => void;
    label?: string;
    title: string;
}

const ToggleSwitch = ({ isChecked, onChange, label, title }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center gap-2">
        <div 
            className="relative rounded-full border-2 w-12 h-6 cursor-pointer bg-palette-background inline-block"
            style={{
                backgroundColor: isChecked ? theme.colors.accentColor : theme.colors.backgroundColor,
                borderColor: isChecked ? theme.colors.accentColor : "#fff",
            }}
        >
            <input 
                className="absolute appearance-none w-full h-full opacity-0 cursor-pointer z-2" 
                type="checkbox" 
                checked={isChecked} 
                name={title} 
                onChange={(e) => onChange(e.target.checked)}
            />
            <div 
                className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white w-4 h-4 cursor-pointer left-[3px] transition-all duration-500 ease-in-out"
                style={isChecked ? {
                    left: "calc(100% - 3px)",
                    transform: "translateX(-100%)",
                }:{}}
            >
                {""}
            </div>
        </div>

        <label htmlFor={title} className="text-white text-sm sm:text-lg overflow-hidden text-ellipsis leading-none whitespace-nowrap">{ label ?? ""}</label>
    </div>
  );
}

export default ToggleSwitch