import { SubscriberArgs, type SubscriberConfig } from '@medusajs/medusa';
import { Modules } from '@medusajs/framework/utils';
import { EmailTemplates } from '../modules/email-notifications/templates';

export default async function resetPasswordTokenHandler({
    event: {
        data: { entity_id: email, token, actor_type },
    },
    container,
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);
    const config = container.resolve('configModule');

    let urlPrefix = '';

    if (actor_type === 'customer') {
        urlPrefix = config.admin.storefrontUrl;
    } else {
        const backendUrl =
            config.admin.backendUrl !== '/' ? config.admin.backendUrl : 'http://localhost:9000';
        const adminPath = config.admin.path;
        urlPrefix = `${backendUrl}${adminPath}`;
    }

    try {
        await notificationModuleService.createNotifications({
            to: email,
            channel: 'email',
            template: EmailTemplates.PASSWORD_RESET,
            data: {
                emailOptions: {
                    replyTo: 'info@example.com',
                    subject: 'Password reset',
                },
                reset_url: `${urlPrefix}/reset-password?token=${token}&email=${email}`,
            },
        });
    } catch (error) {
        console.error('Error sending password reset notification:', error);
    }
}

export const config: SubscriberConfig = {
    event: 'auth.password_reset',
};
