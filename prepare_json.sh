sed 's/;\+$//' db.sql | jq -R 'inputs' | sed 's/$/,/' > db.json
## at the end manually close in []
