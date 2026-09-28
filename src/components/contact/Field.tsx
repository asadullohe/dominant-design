import type { ReactNode } from "react";

export const inputClass =
  "w-full min-h-12 rounded-ctl border border-stroke bg-page px-3.5 py-3 text-base leading-[22px] outline-none transition-colors focus:border-text aria-invalid:border-error";

/** Props every form control must spread so its label and error message are wired to it. */
export interface ControlProps {
  id: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: (control: ControlProps) => ReactNode;
}

export function Field({ id, label, error, className = "", children }: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={`grid content-start gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[13px] leading-[18px] font-semibold text-text2">
        {label}
      </label>
      {children(error ? { id, "aria-invalid": true, "aria-describedby": errorId } : { id })}
      {error && (
        <p id={errorId} className="text-[13px] leading-[18px] text-error">
          {error}
        </p>
      )}
    </div>
  );
}
