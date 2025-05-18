Voici comment déployer notre projet FilmBox dans votre machine :

1. Télécharger notre dépôt git sur votre PC (ou faire un git clone).

2. Il faut préparer votre environnement Docker pour être capable de se connecter a un server:
   
   a) Pour créer le conteneur (instance de l’image) qui exécutera mysql dans docker, ouvrir un invite de commande et lancer la commande :
      docker run -d -p 3306:3306 --name mysql-server -e MYSQL_ROOT_PASSWORD=oracle -e MYSQL_DATABASE=scott -e MYSQL_USER=scott -e MYSQL_PASSWORD=oracle mysql/mysql-server:latest

   b) Ensuite vous pourrez vous connecter à mysql avec la ligne de commande mysql et le mot de passe "oracle" :   
      mysql -u root -p

   c) Ensuite créer une base de données :
      CREATE DATABASE filmbox;
      USE filmbox;

4. Maintenant que tout est prêt, il faut insérer les tables de notre script. ATTENTION : Le script mysql se trouve au milieu du script(indiqué en commentaire).

5. Insérer les valeur des tables(ce trouve en bas du script).

6. Ouvrir le dépôt git télécharger(ou cloner) sur Visual Studio avec la machine ouvert sur Docker.

7. Ouvrir deux terminaux dans Visual Studio.

8. Il faut entrer dans le dossier "filmbox-app" dans les deux terminaux. Voici un exemple : cd C:\Users\farru\Downloads\FilmBox-main\FilmBox-main\filmbox-app

9. Entrer ensuite dans le dossier server avec "cd server" dans le premier terminal et exécuter la commande suivante : npm i express

10. Ensuite, entrer dans le dossier client avec "cd client" dans le deuxième terminal et exécuter la commande suivante : npm i

11. Finalement, retourner dans le premier terminal (server) pour activer notre serveur avec : node server.js

Voila! Vous est prête.
