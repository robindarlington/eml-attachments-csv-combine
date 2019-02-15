eml-attachments-csv-combine
============================

A simple script written in Node.js to combine the contents multiple CSV files with matching headers received as email attachments.

I created it to group together a collection of information received in separate from [ninja-forms] submissions all together in one easy-to-use CSV file.

## Instructions
* git clone https://github.com/robindarlington/eml-attachments-csv-combine.git
* npm install
* mkdir messages
* Save your emails as .eml files in the messages directory. You can do this from an email client such as Thunderbird for example.
* node app.js
* And voila: find your newly created CSV in the combined-{DATE}.csv file in project root.
