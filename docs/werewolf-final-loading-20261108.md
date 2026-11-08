# Werewolf defeat cinematic loading

The end-of-match wrapper decoded the five hidden werewolf return sprites while
their image elements still used lazy loading. A cold mobile browser remained
after the lightning announcement with the cinematic hidden: four of the five
images had no natural width and their decode promises never settled.

Set these images to eager loading before preparation. Bound this optional
preparation to four seconds and allow failures to continue to the cinematic and
the normal result screen.

Validation: reproduced the hidden cinematic before the fix in headless Edge at
844 x 390 with a fresh browser context. After the fix, all five images loaded,
the werewolf cinematic became active and the defeat result completed without
page errors. Unit cases cover normal preparation, unavailable resources,
decode rejection and a decode promise that never settles.

Expanded verification covered defeat cinematics for all eleven characters,
including transition to the normal result screen. Optional artwork preparation
now has the same four-second bound for every character, including earned outfit
assets and preview preparation. The focused unit suite passed 74 cases.

The coin celebration could previously start during the lightning announcement,
pause while the cinematic was active, and reappear afterwards. It now waits for
the combat result screen before becoming visible, including the preparation gap
between announcement and cinematic. A synthetic browser receipt produced one
card and zero visible reward frames before the result screen. Payment code is
unchanged: settlement credits the wallet only when it inserts the unique
user/character/floor receipt; subsequent settlement reads the existing receipt.

Browser regressions:

```
node tools/tower-rewards-qa/check-defeat-final-loading.cjs
node tools/tower-rewards-qa/check-final-reward-timing.cjs
```
