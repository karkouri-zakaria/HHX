@echo off

start cmd /k "cd Backend && npm install && npm run watch"
start cmd /k "cd Frontend && npm install && npm start"
