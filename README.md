# sbis
Для запуска проекта необходимо выполнить в консоли:
1)npm i
2)npm run dev
после должно открыться в браузере http://localhost:9000/
если этого не произошло то нужно проверить:
1) вставить адрес в строку браузера
2) установлен ли NodeJs и npm
3) в файле webpack.config.js поменять номер порта 
4) перезапустить сборку

Попытался реализовать концепцию независимых пользовательских элементов. Которые при необходимости можно наследовать и расширять.
При этом расширяются только protected методы. Ключевые методы являются private и недоступны потомкам, при этом если формат 
данных бедет нарушен предлагаю генерировать исключения
