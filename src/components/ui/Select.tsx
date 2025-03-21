interface SelectProps {
    addClass?:string;
    options: { value: number; label: string }[];
    selectedValue?: number;
    placeholder?: string;
    onChange: (value: number) => void;
}

export default function Select({ addClass, options, selectedValue, placeholder, onChange }: SelectProps) {
    return (
        <select
            className={`bg-mainLightGreen text-mainFontBold rounded-xl p-2  ${addClass}`}
            value={selectedValue || ""}
            onChange={(e) => onChange(parseInt(e.target.value))}
            required
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