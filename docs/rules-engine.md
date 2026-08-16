# Rules engine

Mail Wolf uses deterministic rules for high-confidence classifications. Rules
produce candidates for review; they never delete messages directly. Ambiguous
messages are routed to the gray area and can later be evaluated by an AI
classifier.

## Evaluation pipeline

1. Use Gmail search and labels to narrow the candidate set.
2. Fetch message metadata and only the content required by the rule.
3. Evaluate positive signals and hard exclusions.
4. Resolve conflicts using the precedence rules below.
5. Store the rule version, matched evidence, and proposed decision.
6. Show representative examples before the user approves a batch.

## Precedence

The first matching outcome wins:

1. `protect`
2. `review`
3. `trash_candidate`

A trash rule can therefore never override a protection rule. Conflicting or
incomplete evidence always resolves to `review`.

## Expired verification codes

An email is an expired-code candidate only when it is older than seven days,
has a verification score of at least seven, and has no protected signal.

### Positive signals

| Evidence | Score |
| --- | ---: |
| Contains “verification code”, “one-time code”, “OTP”, or “authentication code” | 4 |
| Contains a short numeric or alphanumeric credential | 3 |
| Contains expiration language such as “expires in 10 minutes” or “valid for” | 2 |
| Comes from an automated or no-reply sender | 1 |

### Hard exclusions

- Password-change confirmation
- Completed account recovery
- Suspicious-activity alert
- Invoice, receipt, booking, or meaningful attachment
- Starred, important, or manually protected message
- Message in a thread the user replied to

For age checks, use Gmail's `internalDate` rather than trusting only the email's
`Date` header. Gmail search can narrow the set by age and terms, but the local
evaluator makes the final decision.

```ts
const isExpiredVerificationCode =
  ageInDays(message.internalDate) > 7 &&
  verificationScore(message) >= 7 &&
  protectedSignals(message).length === 0;
```

## Initial deterministic rules

| Rule | Required evidence | Hard exclusions | Proposal |
| --- | --- | --- | --- |
| Expired promotion | Marketing or unsubscribe signal, expired offer, older than 180 days | Receipt, booking, attachment, reply, star | Trash candidate |
| Routine social activity | Automated profile view, recommendation, or creator notification older than 90 days | Direct message, reply, recovery alert | Trash candidate |
| Delivered order | Delivery completed and older than two years | Active warranty, high-value purchase, tax relevance | Review |
| Financial record | Financial sender and transaction or statement language | Promotion-only message | Protect |
| Security history | Password change, recovery, or suspicious activity | None | Protect |
| Meaningful attachment | Contract, personal photo, ticket, certificate, or signed document | Expired calendar invite, tracking image | Protect |
| User interaction | Starred, important, custom protected label, or user reply | None | Protect |

## Rule result

Every evaluation returns explainable structured data:

```json
{
  "ruleId": "expired-verification-code-v1",
  "decision": "trash_candidate",
  "evidence": [
    "message is 19 days old",
    "verification phrase found",
    "six-digit credential found",
    "credential expires in 10 minutes"
  ],
  "exclusions": [],
  "requiresUserApproval": true
}
```

## AI boundary

The AI classifier receives only messages that remain in `review` after rules are
evaluated. It can recommend a category and provide reasons, but it cannot call
Gmail mutation APIs. Only the policy engine can construct a cleanup batch, and
only after explicit user approval.
