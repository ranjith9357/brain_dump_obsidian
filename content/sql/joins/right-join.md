<span style="color:#FF9800; font-size:1em;">RIGHT JOIN</span> — Simple Definition

RIGHT JOIN returns ALL rows from the RIGHT table,  
and only matching rows from the LEFT table.  If there is no match, the LEFT side is NULL.

<span style="color:#FF9800; font-size:1.5em;">Small example</span>
### LEFT table: `production_quantities`

|serial|
|---|
|SN001|
|SN002|

### RIGHT table: `sticker_validations`

|serial|status|
|---|---|
|SN001|Printed|
|SN003|Printed|

<span style="color:#FF9800; font-size:1em;">RIGHT JOIN query</span>

`SELECT     pq.serial,     sv.status FROM production_quantities pq RIGHT JOIN sticker_validations sv     ON sv.serial = pq.serial;`

## Result

|serial|status|
|---|---|
|SN001|Printed|
|NULL|Printed|
<span style="color:#FF9800; font-size:1em;">SN003</span> appears (even though it does NOT exist in `production_quantities`)  
➡️ LEFT side becomes `NULL` when there’s no match.

<span style="color:#FF9800; font-size:1.7em;">One-line takeaway</span>

RIGHT JOIN keeps all rows from the right table, even if left data is missing.
