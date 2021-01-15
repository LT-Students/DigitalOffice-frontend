## Для сборки фронтенда нужно:
1. Установить Node.js https://nodejs.org/en/
2. Выполнить команду 
```
npm install
```
3. Запустить проект с помощью команды 
```
ng serve
```

## Для создания сертификата
1. Создать сертификат с помощью инструмента generate-trusted-ssl-certificate. Для этого выполним следующие команды:
  ```
  git clone https://github.com/RubenVermeulen/generate-trusted-ssl-certificate.git
  cd generate-trusted-ssl-certificate
  bash generate.sh
  ```
  Должны будут появиться файлы server.crt и server.key

2. Далее необходимо установить сертификат, для этого нужно дважды нажать на созданный файл server.crt
3. Нажать на “Установить сертификат…”
4. Выбрать “Локальный компьютер”
5. Выбрать “Поместить все сертификаты в следующее хранилище”
6. Выбрать “Доверенные корневые центры сертификации”
7. Далее нажать “ОK” и “Далее”
8. Теперь в проекте нужно создать папку ssl и туда поместить файлы server.crt и server.key
9. Запустить проект с помощью команды 
```
ng serve --ssl true -o --sslKey ssl/server.key --sslCert ssl/server.crt
```
