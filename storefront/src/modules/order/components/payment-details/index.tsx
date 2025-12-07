import { Container, Heading, Text } from "@medusajs/ui";

import { isStripe, paymentInfoMap } from "@lib/constants";
import { convertToLocale } from "@lib/util/money";
import { StoreOrder } from "@medusajs/types";

type Props = {
  order: StoreOrder;
};

const PaymentDetails = ({ order }: Props) => {
  const payment = order.payment_collections?.[0]?.payments?.[0];

  return (
    <div>
      <Heading level="h2" className="text-3xl-regular my-6 flex flex-row">
        Paiement
      </Heading>
      <div>
        {payment && (
          <div className="flex w-full items-start gap-x-1">
            <div className="flex w-1/3 flex-col">
              <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                Méthode de paiement
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id].title}
              </Text>
            </div>
            <div className="flex w-2/3 flex-col">
              <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                Détails de paiement
              </Text>
              <div className="txt-medium flex items-center gap-2 text-ui-fg-subtle">
                <Container className="flex h-7 w-fit items-center bg-ui-button-neutral-hover p-2">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                <Text data-testid="payment-amount">
                  {isStripe(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} payé le ${new Date(
                        payment.created_at ?? "",
                      ).toLocaleString()}`}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
