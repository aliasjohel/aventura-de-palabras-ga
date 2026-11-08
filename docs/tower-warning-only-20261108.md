# Tower warnings only (v404)

Hide normal ready, verified-progress and confirmed messages in Tower. These
paragraphs are empty and hidden, including when a duel is prepared or a
connection recovers. Keep practice/no-reward, missing-account, interrupted
connection and pending-payment warnings and the reconnect action.

On short landscape screens the floor list could overflow upward across the
header. Contain it in its own scroll area, keep the selected floor visible and
compact the rival card so the fight button remains visible. Warning copy uses
normal letter spacing and wraps within the header instead of inheriting the
decorative title styling. Server validation and payouts are unchanged.

Validation: existing account-readiness browser fixture now checks no normal
notice, connection-warning/retry visibility, recovery clearing, and practice
warning visibility. Geometry checks at 844x390 and 667x375 verify the list stays
below the header, the selected floor stays in view, and the fight button stays
within the viewport. Mobile screenshots inspected. Eight account and Tower
character unit tests passed.
