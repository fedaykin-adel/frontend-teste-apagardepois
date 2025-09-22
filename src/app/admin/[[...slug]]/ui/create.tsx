// "use client";
// // import { useToast } from "@/hooks/use-toast";
// // import { useTransition } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm } from "react-hook-form";

// // import { useSession } from "@/contexts/SessionContext";
// // import { useMutation, useQueryClient } from "@tanstack/react-query";

// // import { Button } from "@/components/ui/button";
// // import { Separator } from "@radix-ui/react-separator";

// // import { useRouter } from "next/navigation";

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// // import { z } from "zod";
// // import { Module } from "../modules/test.module";
// import { DynamicFields, useLoadSelects, useModule } from "thulhaiim";
// // import { ZodTypeAny } from "zod";
// import { useForm } from "react-hook-form";
// const Update = () => {
//   const Module = useModule();
//   //   const { token } = useSession();
//   //   const queryClient = useQueryClient();
//   //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   //   const [isPending, startTransition] = useTransition();

//   const selectData = useLoadSelects("token", Module.form ?? [], Module);

//   //   const { toast } = useToast();
//   //   const router = useRouter();
//   const {
//     // handleSubmit,
//     control,
//     watch,
//     // setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(Module.schema),
//     defaultValues: Module.defaultValue(),
//   });
//   //   useTransform(Module.effects, watch, setValue);

//   //   const mudationUpdateAdmin = useMutation({
//   //     mutationFn: async (json: FormSchema) =>
//   //       await Module.create!({ json, token }),
//   //     onSuccess: async (response) => {
//   //       const data = (await response) || [];
//   //       if ("message" in data && data.message) {
//   //         toast({
//   //           duration: 3000,
//   //           variant: "destructive",
//   //           description: data.message.content,
//   //         });
//   //       }

//   //       if ("isSuccess" in data) {
//   //         toast({
//   //           title: "Sucesso!",
//   //           duration: 3000,
//   //           variant: "success",
//   //           description: "Dados foram atualziado com sucesso!",
//   //         });
//   //         queryClient.invalidateQueries({ queryKey: [Module.name] });
//   //         queryClient.invalidateQueries({ queryKey: [Module.queryKey] });
//   //         router.back();
//   //       }
//   //     },
//   //   });
//   //   // if (!data) {
//   //   //   return notFound();
//   //   // }
//   //   const onSubmit = (json: FormSchema) =>
//   //     startTransition(async () => {
//   //       await mudationUpdateAdmin.mutateAsync(json);
//   //     });

//   return (
//     <>
//       <form className="space-y-4">
//         {Module.form?.map((field, idx) => {
//           return (
//             <DynamicFields
//               key={idx}
//               field={field}
//               control={control}
//               errors={errors}
//               watch={watch}
//               selectData={selectData}
//               useWatch={watch}
//             />
//           );
//         })}
//         {/* <div onClick={submit}>salvar</div> */}
//         {/* <Button type="submit" className="mt-4 w-full">
//           Salvar {Module.label}
//         </Button> */}
//       </form>
//     </>
//   );
// };

// export default Update;
