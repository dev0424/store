import { Button, Prompt, Tooltip, TooltipProvider } from "@medusajs/ui";

import React from "react";
import { declineQuote } from "@lib/data/orders";

type Props = {
  quoteId: string;
  countryCode: string;
};

const DeclineQuoteButton = ({ quoteId, countryCode }: Props) => {
  return (
    <Prompt>
      <Prompt.Trigger>
        <TooltipProvider>
          <Tooltip content="Refuser ce devis. Impossible de l’accepter ensuite.">
            <Button variant="secondary">Refuser</Button>
          </Tooltip>
        </TooltipProvider>
      </Prompt.Trigger>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Refuser le devis</Prompt.Title>
          <Prompt.Description>
            Êtes-vous sûr de vouloir refuser ce devis ? Vous ne pourrez plus
            l’accepter par la suite.
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel>Annuler</Prompt.Cancel>
          <Prompt.Action onClick={() => declineQuote(quoteId, countryCode)}>
            Refuser le devis
          </Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

export default DeclineQuoteButton;
