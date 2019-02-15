eml-attachments-csv-combine
============================

A simple script written in Node.js to combine the contents multiple CSV files with matching headers received as email attachments.

I created it to group together a collection of information received in separate from [ninja-forms] submissions all together in one easy-to-use CSV file.

## Use
* Clone this repository
* Run npm install
* Save your messages as .eml files in the messages directory
* node app.js
* Find your newly created CSV in the combined-{DATE}.csv file in project root.
