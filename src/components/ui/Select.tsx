interface SelectProps {
    addClass?:string;
    options: { value: string; label: string }[];
    selectedValue?: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export default function Select({ addClass, options, selectedValue, placeholder, onChange }: SelectProps) {
    return (
        <select
            className={`bg-mainLightGreen text-mainFontBold rounded-xl p-2 text-center ${addClass}`}
            value={selectedValue || ""}
            onChange={(e) => onChange(e.target.value)}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}

            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}