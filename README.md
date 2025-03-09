Voici comment déployer notre projet FilmBox dans votre machine :

1. Télécharger notre dépôt git sur votre PC.

2. Il faut préparer votre environnement Docker pour être capable d'insérer nos données :
   
a) Pour créer le conteneur (instance de l’image) qui exécutera mysql dans docker, ouvrir un invite de commande et lancer la commande :
   docker run -d -p 3306:3306 --name mysql-server -e MYSQL_ROOT_PASSWORD=oracle -e MYSQL_DATABASE=scott -e MYSQL_USER=scott -e MYSQL_PASSWORD=oracle mysql/mysql-server:latest

b) Ensuite vous pourrez vous connecter à mysql avec la ligne de commande mysql et le mot de passe oracle
   mysql -u scott -p

c) Ensuite créer une base de données :
   CREATE DATABASE FilmBox;
   USE FilmBox;

3. Maintenant que tout est prêt, il faut insérer les tables de notre script. ATTENTION : Le script mysql se trouve au milieu du script(indiqué en commentaire).

4. Insérer les valeur des tables(ce trouve en bas du script).

5. Ouvrir le dépôt git télécharger sur Visual Studio avec Docker ouvert.

6. Ouvrir un terminal dans Visual Studio.

7. Rentrer dans le fichier "server" et faire la commande suivante : npm i express

8. Dans ce même fichier on fait : npm i

9. Ensuite on rentre dans le fichier "client" pour faire : npm i

10. Faire la commande suivante dans le fichier "client" : npm run build

11. Finalement on rentre dans le fichier "server" pour activer votre serveur : node server.js

--------------------------------------Note--------------------------------------------------------
Les autres dépendances seront déjà installées!!!
Faire les installs suivantes si nécessaire :

npm install react-router-dom

npm install express express-session mysql express-validator dateformat

npm install react@18 react-dom@18

npm install bootstrap




