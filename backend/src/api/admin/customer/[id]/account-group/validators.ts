import { z } from 'zod';

export const UpdateAccountGroupRequest = z.object({
    id: z.string(),
    is_centralized_billing: z.boolean().optional().nullable(),
    corporate_status: z.enum(['subsidiary', 'independent']).optional().nullable(),
    is_purchasing_group_member: z.boolean().optional().nullable(),
    purchasing_group_name: z.string().optional().nullable(),
    membership_number: z.string().optional().nullable(),
    is_agency_or_branch: z.boolean().optional().nullable(),
    parent_group_name: z.string().optional().nullable(),
    is_platform_client: z.boolean().optional().nullable(),
    platform_name: z.string().optional().nullable(),
    created_at: z.string().optional().nullable(),
    updated_at: z.string().optional().nullable(),
    deleted_at: z.string().optional().nullable(),
});
