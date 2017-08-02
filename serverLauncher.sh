#!/bin/bash

cd backend_server
python service.py &
cd ../OneNews-Server/server
npm start &
cd ../../client
npm run dev &

echo "======================================"
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

kill $(jobs -p)
