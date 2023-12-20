---
'@honeycomb-finance/pools': patch
---

- Withdraw & Claim has bug with decimals in stakeAmount due to which it was sending incorrect amount to contract.
- There were `undefined` related issue if user does action to fast for "claim" or "withdraw & claim"
