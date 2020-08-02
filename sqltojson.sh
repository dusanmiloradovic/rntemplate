sed 's/;$//' db.sql | jq -R -s '. | split("\n") | map(select(length>0))' >db.json


