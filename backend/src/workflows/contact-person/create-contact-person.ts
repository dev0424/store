import {
    createStep,
    createWorkflow,
    StepResponse,
    transform,
    WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { CONTACT_PERSON_MODULE } from '../../modules/contact-person';
import ContactPersonModuleService from '../../modules/contact-person/services/service';
import { CustomerDTO } from '@medusajs/types';
import { ContactPerson } from 'lib/types';
import { Modules } from '@medusajs/utils';
import { createRemoteLinkStep } from '@medusajs/core-flows';

type WorkflowInput = {
    customer: CustomerDTO;
    contact_persons: ContactPerson[];
};

export const createContactPersonsStep = createStep(
    'create-contact-persons',
    async (input: WorkflowInput, { container }) => {
        const contactPersonModuleService: ContactPersonModuleService =
            container.resolve(CONTACT_PERSON_MODULE);

        const contactPersons = await contactPersonModuleService.createContactPersons(
            input.contact_persons,
        );

        return new StepResponse(
            contactPersons,
            contactPersons.map(contactPerson => contactPerson.id),
        );
    },
    async (ids, { container }) => {
        const contactPersonModuleService: ContactPersonModuleService =
            container.resolve(CONTACT_PERSON_MODULE);
        await contactPersonModuleService.deleteContactPersons(ids);
    },
);

export const createContactPersonWorkflow = createWorkflow(
    'create-contact-person',
    (input: WorkflowInput) => {
        const contactPersons = createContactPersonsStep(input);

        const links = transform({ input, contactPersons }, data => {
            return data.contactPersons.map(contactPerson => ({
                [Modules.CUSTOMER]: {
                    customer_id: data.input.customer.id,
                },
                [CONTACT_PERSON_MODULE]: {
                    contact_person_id: contactPerson.id,
                },
            }));
        });

        createRemoteLinkStep(links);

        return new WorkflowResponse(contactPersons);
    },
);
