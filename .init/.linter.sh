#!/bin/bash
cd /home/kavia/workspace/code-generation/electromonitor-104873-01fc08f2/eb_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

