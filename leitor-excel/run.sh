#!/bin/bash
echo "Cron rodou em $(date)" >> /home/ubuntu/vigi-data/leitor-excel/cron-test.log
echo "Iniciando execução do Docker Compose..." >> ~/vigi-data/leitor-excel/leitor.log

cd ~/vigi-data/database || exit

docker-compose up --build -d >> ~/vigi-data/leitor-excel/leitor.log 2>&1

echo "Containers reiniciados em $(date)" >> ~/vigi-data/leitor-excel/leitor.log
