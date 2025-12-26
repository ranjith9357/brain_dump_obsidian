
<span style="color:#FF9800; font-size:1em;">FULL JOIN (FULL OUTER JOIN)</span> — Simple Definition

FULL JOIN returns ALL rows from BOTH tables.  
If there is no match, the missing side is NULL.

<span style="color:#FF9800; font-size:1.5em;">Small example</span>
### Table A: `production_quantities`

|serial|
|---|
|SN001|
|SN002|

### Table B: `sticker_validations`

|serial|status|
|---|---|
|SN001|Printed|
|SN003|Printed|

<span style="color:#FF9800; font-size:1.5em;">FULL JOIN query</span>

`SELECT     pq.serial,     sv.status FROM production_quantities pq FULL JOIN sticker_validations sv     ON sv.serial = pq.serial;`

<span style="color:#FF9800; font-size:1.5em;">Result</span>

|serial|status|
|---|---|
|SN001|Printed|
|SN002|NULL|
|NULL|Printed|

<span style="color:#FF9800; font-size:1.5em;">Why?</span>

- `SN001` → exists in <span style="color:#FF9800; font-size:1em;">both tables</span> → merged
    
- `SN002` → exists only in <span style="color:#FF9800; font-size:1em;">production</span> → RIGHT side NULL
    
- `SN003` → exists only in <span style="color:#FF9800; font-size:1em;">sticker_validations</span>  → LEFT side NULL
