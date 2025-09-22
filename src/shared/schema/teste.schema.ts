import { z } from "zod";

// export type TestSchemaProps = z.infer<typeof TestSchema>;
export const TestSchema = z.object({
  _id: z.string().nullish(),
  title: z.string(),
});
