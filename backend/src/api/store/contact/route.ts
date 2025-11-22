import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { sendContactEmailWorkflow } from '../../../workflows/send-contact-email';
import { ContactForm } from '../../../lib/types';

export const POST = async (request: MedusaRequest<ContactForm>, response: MedusaResponse) => {
    const { first_name, last_name, phone, email, message } = request.body;

    // try {
    const { result } = await sendContactEmailWorkflow(request.scope).run({
        input: {
            first_name,
            last_name,
            phone,
            email,
            message,
        },
    });

    return response.json({
        success: true,
        notification: result.notification,
    });
    // } catch (error) {
    //     return response.status(500).json({
    //         type: 'unexpected_state',
    //         message: 'Failed to send contact email.',
    //         code: 'api_error',
    //     });
    // }
};
