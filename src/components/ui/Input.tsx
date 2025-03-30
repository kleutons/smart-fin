interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string,
    addClass?: string
}
export default function Input({
    label,
    type = "text",
    addClass,
    ...props
  }: InputProps) {
    const baseClasses = "bg-mainLightGreen p-2 px-3 rounded-lg";
    const combinedClasses = `${baseClasses} ${addClass}`.trim();
  
    // Adiciona o pattern apenas para números
    const numberProps = type === "number" ? { pattern: "^\\d+(\\.\\d{1,2})?$", step: "0.01" } : {};
  
    return (
      <div className="flex flex-col">
        <label className="ml-3 text-mainFontBold/70">{label}</label>
        <input
          type={type}
          className={combinedClasses}
          {...numberProps}
          {...props} 
        />
      </div>
    );
  }
  