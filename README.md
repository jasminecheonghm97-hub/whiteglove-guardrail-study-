# Premium Messaging Study — setup (v3.1)

Survey instrument for the **White-Glove Guardrail Framework** (internal name; never shown to participants).
8 messages in 3 blocks, randomised: **A** 2×2 matrix (Show × Personal) · **B** amplifiers (Source, Push) · **C** guardrail recovery (AI soften vs human handover).

## 1. Google Sheet (5 min)
1. Open the existing Sheet **Whiteglove Guardrail Study Data** (in your Google Drive; tabs Responses, Participants, FollowUp, Codebook).
2. **Extensions → Apps Script**. Replace the sample code with `Code.gs`. Save.
3. **Deploy → New deployment →** gear **→ Web app**. Execute as **Me**; access **Anyone**.
4. Authorise (Advanced → Go to project → Allow). Copy the URL ending `/exec`. Opening it should show `OK`.

> Changed `Code.gs` later? **Deploy → Manage deployments → Edit → New version**.

## 2. Connect and deploy
1. In `index.html`, set `CONFIG.SHEET_URL` to your `/exec` URL.
2. Optional: set `CONFIG.CONTACT_EMAIL` to your university email (shown on the consent page).
3. Push to GitHub → import in Vercel → name the Vercel project neutrally (e.g. `premium-messaging-study`) → Deploy.

## 3. Test before sharing
| URL | Use |
| --- | --- |
| `…/?debug=1` | Shows each message's factor codes, score, zone and quadrant; rows flagged `test=TRUE` |
| `…/?test=1` | Normal view; rows flagged `test=TRUE` |
| `…/?pid=P01` | Set your own participant ID |
| `…/?src=curaes` | Tags the recruitment source (any short label: `telegram`, `linkedin`, `smu`…); default `direct` |
| `…/` | Live participant link |

Do one full `?test=1` run on your phone; check all three tabs fill. Delete or filter `test=TRUE` rows before analysis.

## Tabs and columns
- **Participants** (2 rows each: `started`, `completed`): `pid, src, age_band, gender, nationality, country_longest, years_sg, group (Singapore/International), premium_buyer, spend_250, premium_brands, ai_use, privacy_concern, device, order, final_pick, realism, attn_pass, final_open`
- **Responses** (8 rows each): `pid, order_index, msg_id, block, cell, sender, f_show, f_personal, f_source, f_push, pred_score, pred_zone, quadrant, r_premium, r_creepy, r_knows, r_intent, emotions, attn (5th message only), author_guess, why, ms_on_screen, group, nationality`
- **FollowUp**: optional emails only, **no pid**, so they cannot be linked to answers.

## Data quality rules (decide before collecting)
- Exclude: `test=TRUE`; no `completed` row; `attn_pass=FALSE`; median `ms_on_screen` under 4 s.
- Report `src=curaes` separately: those visitors have seen the framework pitch.
- New columns (src, gender, privacy_concern, realism, attn, attn_pass) are added to the Sheet automatically on first submission.

## Before collecting
- Get ethics approval (check your module handbook or supervisor).
- Pilot with 3 people; fix anything confusing, then bump `SURVEY_VERSION`.
