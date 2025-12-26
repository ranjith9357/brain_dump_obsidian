
<span style="color:#FF9800; font-size:1em;">INNER JOIN</span> = matched records in both tables

In simple words:
INNER JOIN returns only the rows that exist in BOTH tables and match the join condition.**
## 🔹 Very small example

### Table A (`production_quantities`)

|serial|
|---|
|SN001|
|SN002|

### Table B (`sticker_validations`)

|serial|
|---|
|SN001|

### INNER JOIN query

`SELECT * FROM production_quantities pq INNER JOIN sticker_validations sv ON sv.serial_number = pq.serial_number;`

### Result

|serial|
|---|
|SN001|
## 🔹 One-line definition (remember this)

INNER JOIN = intersection of two tables

Like a Venn diagram:

`Table A ∩ Table B`