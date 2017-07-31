#!/bin/bash
service redis start
service mongod start

pip install -r requirements.txt

cd newsPipeline
python newsMonitor.py &
python newsFetcher.py &
python newsDeduper.py &

echo "======================================"
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

kill $(jobs -p)
