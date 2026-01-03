import {
    createStep,
    createWorkflow,
    StepResponse,
    transform,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { CONTACT_MODULE } from '../../modules/contact';
import ContactModuleService from 'modules/contact/services/service';
import { CustomerDTO } from '@medusajs/types';
import { Contact } from 'lib/types';
import { Modules } from '@medusajs/utils';
import { createRemoteLinkStep } from '@medusajs/core-flows';

type WorkflowInput = {
    customer: CustomerDTO;
    contacts: Contact[];
};

export const createContactsStep = createStep(
    'create-contacts',
    async (input: WorkflowInput, { container }) => {
        const contactModuleService: ContactModuleService = container.resolve(CONTACT_MODULE);

        const contacts = await contactModuleService.createContacts(input.contacts);

        return new StepResponse(
            contacts,
            contacts.map(contact => contact.id),
        );
    },
    async (ids, { container }) => {
        const contactModuleService: ContactModuleService = container.resolve(CONTACT_MODULE);
        await contactModuleService.deleteContacts(ids);
    },
);

export const createContactsWorkflow = createWorkflow('create-contacts', (input: WorkflowInput) => {
    const contacts = createContactsStep(input);

    const links = transform({ input, contacts }, data => {
        return data.contacts.map(contact => ({
            [Modules.CUSTOMER]: {
                customer_id: data.input.customer.id,
            },
            [CONTACT_MODULE]: {
                contact_id: contact.id,
            },
        }));
    });

    createRemoteLinkStep(links);

    return new WorkflowResponse(contacts);
});
