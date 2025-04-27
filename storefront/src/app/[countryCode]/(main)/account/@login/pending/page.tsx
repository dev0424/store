import { Metadata } from "next"

import AccountReviewMessage from "@modules/account/components/account-review-message"

export const metadata: Metadata = {
  title: "Account review",
  description: "Your account registration is currently under review.",
}

export default function Pending() {
  return (
    <div>
      <AccountReviewMessage />
    </div>
  )
}
