import { fieldsRegister, TextFields } from "thulhaiim";
import TextInput from "./component/textIntput";

fieldsRegister.register<TextFields>("text", ({ control, field }) => {
  return (
    <TextInput
      control={control}
      name={field.name || ""}
      label={field.label}
      placeholder={field.placeholder}
      disabled={field.disabled}
      mask={field.mask}
      readOnly={field.readOnly}
      className={field.className}
    />
  );
});
// import { FieldsRegister } from "@/app/NaibControl/fieldRegistryInstance";
// import TextInput from "./forms/TextInput";
// import SelectDinamic from "./forms/SelectDinamic";

// FieldsRegister.register<>("text", ({ control, field }) => (<TextInput
//     control={control}
//     name={field.name || ""}
//     label={field.label}
//     placeholder={field.placeholder}
//     disabled={field.disabled}
//     mask={field.mask}
//     readOnly={field.readOnly}
//     className={field.className}
// />));

// FieldsRegister.register("select",({ control, field, errors, selectData }) => (<SelectDinamic
//     control={control}
//     errors={errors}
//     data={selectData?.[field.name] ?? field.select?.data ?? []}
//     label={field.label}
//     placeholder={field.placeholder || ""}
//     selectLabel={field.select?.label || ""}
//     name={field.name}
//     className={field.className}
//     disabled={field.disabled}
//   />));
// //   FieldsRegister.register("select",({ control, field, errors, selectData })=>( )

// //   case "text":
// //       return (

// //       );
//     case "select":
//       return (
//         <SelectDinamic
//           control={control}
//           errors={errors}
//           data={selectData?.[field.name] ?? field.select?.data ?? []}
//           label={field.label}
//           placeholder={field.placeholder || ""}
//           selectLabel={field.select?.label || ""}
//           name={field.name}
//           className={field.className}
//           disabled={field.disabled}
//         />
//       );
//     case "multiSelect":
//       return (
//         <MultiSelect
//           control={control}
//           name={field.name}
//           data={selectData?.[field.name] ?? field.select?.data ?? []}
//           label={field.label}
//           disabled={field.disabled}
//           isMulti={true}
//         />
//       );
//     case "image":
//       return (
//         <ImageUploadInput
//           layout="horizontal"
//           control={control}
//           name={field.name}
//           label={field.label}
//           path={field.path || ""}
//         />
//       );
//     case "checkbox":
//       return (
//         <Checkbox
//           control={control}
//           name={field.name}
//           label={field.label || ""}
//           description={field.description}
//         />
//       );
//     case "switch":
//       return (
//         <SwitchCustom
//           control={control}
//           name={field.name}
//           label={field.label || ""}
//           disabled={isDisabled}
//           description={field.description}
//           size={field.size}
//           color={field.color}
//         />
//       );
//     case "textArea":
//       return (
//         <TextAreaInput
//           control={control}
//           name={field.name}
//           label={field.label}
//           placeholder={field.placeholder}
//         />
//       );
//     case "dynamicArray":
//       return (
//         <DynamicFieldArray
//           control={control}
//           name={field.name}
//           fieldsSchema={field.fields ?? []}
//           errors={errors}
//         />
//       );
//     case "date":
//       return (
//         <DatePickerForm
//           label={field.label}
//           control={control}
//           name={field.name}
//           className={field.className}
//         />
//       );
//     // case "hour":
//     //   return (
//     //     <InputHour label={field.label} control={control} name={field.name} />
//     //   );
//     case "textEditor":
//       return (
//         <Controller
//           control={control}
//           name={field.name}
//           // errors={field.errors}
//           render={({ field: { onChange, value }, formState: { errors } }) => (
//             <>
//               <TiptapEditor
//                 value={value}
//                 onChange={onChange}
//                 label="Conteudo da materia"
//               />
//               {errors?.content && (
//                 <p className="text-xs font-medium text-destructive">
//                   {String(errors?.content.message)}
//                 </p>
//               )}
//             </>
//           )}
//         />
//       );
