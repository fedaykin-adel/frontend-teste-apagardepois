import { withMask } from "use-mask-input";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { ChangeEvent } from "react";

interface TextInputProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  placeholder?: string;
  mask?: string | string[];
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readOnly?: boolean;
  className?: string;
}
const TextInput = <T extends FieldValues>({
  readOnly = false,
  className,
  ...props
}: TextInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const mask = props.mask ? withMask(props.mask) : undefined;
  void className
  return (
    <div className="space-y-2">
      <label
        htmlFor={field.name}
        className={
          "select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        }
      >
        {props.label}
      </label>

      <input
        {...field}
        type="text"
        id={props.name}
        ref={(inputElement) => {
          field.ref(inputElement);
          mask?.(inputElement);
        }}
        onChange={(event) => {
          field.onChange(event);
          props.onChange?.(event);
        }}
        placeholder={props?.placeholder}
        className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"}
        readOnly={readOnly}
      />

      {error?.message && (
        <p className="text-xs font-medium text-destructive">
          {String(error?.message)}
        </p>
      )}
    </div>
  );
};

export default TextInput;

