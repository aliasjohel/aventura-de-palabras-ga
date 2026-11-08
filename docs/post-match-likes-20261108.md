# Optional likes after online PvP (v408)

The result of a finished online duel offers a thumbs-up for the opponent. Opening
the result only reads the status; sending requires an explicit click. A confirmed
receipt disables the button and changes it to “Me gusta enviado”. Network failures
allow retrying. Own and public profiles show a separate received-like count.
Likes do not modify currency, XP, rank points or prizes. Local play, adventure
and Tower never show the control.

`versus_match_like(match, send=false)` derives both sender and recipient on the
server. It requires an authenticated participant in a finished, two-player match.
The private receipt table has a unique `(match_id, sender_id)` key; concurrent
requests and retries cannot increment the count twice. Receipts deliberately
have no foreign key to ephemeral matches, so room cleanup preserves likes.
User deletion cascades through both sender and recipient references. Direct table
access is revoked and RLS is enabled. Only authenticated callers can execute the
public invoker wrapper for the private definer function with an empty search path.

The UI checks match, account and view generations before applying asynchronous
responses. Leaving, starting another duel or ending the account session clears
the control. Also fix a missing null guard in the costume refresh triggered by
account changes when neither a prepared costume pair nor a room exists.

Validation:

- Isolated PostgreSQL: no write on status reads, participant/finished checks,
  null/anonymous/outsider rejection, concurrent retries, reciprocal votes, profile
  totals, retention after match cleanup, account deletion and permissions.
- Browser with synthetic opponent and external network blocked: optional click,
  repeated results, sent state, three languages, network retry, mobile landscape
  and desktop, stale replies, logout, local/Tower exclusion and both profiles.
- Existing room recovery, rank and localization checks; update a stale test to
  expect the translated room error, and synchronize the static “Tu puesto” copy.
- Hosted migration preserves fingerprints of existing profile, match, player,
  ranked-result and wallet rows. No real likes are sent during verification.
- Required service-worker manifest, cache/range tests and browser incremental
  update verification before publication.
