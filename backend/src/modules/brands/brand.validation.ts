import { z } from 'zod';

export const brandIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export type BrandIdParams = z.infer<typeof brandIdParamSchema>;
