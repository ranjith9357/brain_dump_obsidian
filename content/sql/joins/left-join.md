<span style="color:#FF9800; font-size:1em;">LEFT JOIN</span> — Simple Definition

LEFT JOIN returns ALL rows from the LEFT table,  
and only matching rows from the RIGHT table. If there is no match, the RIGHT side is NULL.

<span style="color:#FF9800; font-size:1em;">Very small example (easy to remember)</span>
### LEFT table: `production_quantities`

|serial|
|---|
|SN001|
|SN002|
### RIGHT table: `sticker_validations`

| serial | status  |
| ------ | ------- |
| SN001  | Printed |

<span style="color:#FF9800; font-size:1em;">LEFT JOIN query</span>

`SELECT     pq.serial,     sv.status FROM production_quantities pq LEFT JOIN sticker_validations sv     ON sv.serial = pq.serial;`

<span style="color:#FF9800; font-size:1.5em;">Result</span>

| serial | status  |
| ------ | ------- |
| SN001  | Printed |
| SN002  | NULL    |
<span style="color:#FF9800; font-size:1em;">SN002</span> stays, even though there is no matching row in `sticker_validations`.

<span style="color:#FF9800; font-size:1.5em;">Why LEFT JOIN exists (one line)</span>

 LEFT JOIN is used when one table is mandatory and the other is optional.
## Visual memory trick

`LEFT TABLE (keep all) SN001 ──▶ Printed SN002 ──▶ NULL → Pending`

## 🧠 One-line takeaway

<span style="color:#FF9800; font-size:1em;">LEFT JOIN</span> never removes rows from the left table.