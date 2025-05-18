Voici comment déployer notre projet FilmBox dans votre machine :

1. Téléchargez notre dépôt git sur votre PC (ou faites un git clone).

2. Il faut préparer votre environnement Docker pour être capable de se connecter à un serveur:
   
   a) Pour créer le conteneur (instance de l’image) qui exécutera mysql dans docker, ouvrir un invite de commande et lancer la commande :
      docker run -d -p 3306:3306 --name mysql-server -e MYSQL_ROOT_PASSWORD=oracle -e MYSQL_DATABASE=scott -e MYSQL_USER=scott -e MYSQL_PASSWORD=oracle mysql/mysql-server:latest

   b) Ensuite vous pourrez vous connecter à mysql avec la ligne de commande mysql et le mot de passe oracle
      mysql -u root -p

   c) Ensuite créez une base de données :
      CREATE DATABASE filmbox;
      USE filmbox;

3. Maintenant que tout est prêt, il faut insérer les tables de notre script. ATTENTION : Le script mysql se trouve au milieu du script(indiqué en commentaire).

4. Insérez les valeur des tables(se trouve en bas du script).

5. Ouvrez le dépôt git téléchargé (ou cloné) sur Visual Studio avec la machine ouverte sur Docker.

6. Ouvrez deux terminaux dans Visual Studio.

7. Entrez dans le dossier "filmbox-app" dans les deux terminaux. Voici un exemple : cd C:\Users\farru\Downloads\FilmBox-main\FilmBox-main\filmbox-app



------------------------------------------------------------------------------------------------------------------------



Avant de commencer, assurez-vous d'avoir un terminal et d'avoir installé Docker.

1. Créez le conteneur Docker MongoDB avec la commande  « docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_DATABASE=FilmBox -v mongodb_data_filmbox:/data/db mongo »
 
2. Vérifiez que le conteneur fonctionne avec la commande  « docker ps ». Vous devriez voir « mongodb_filmbox » dans la liste des conteneurs actifs.
 
3. Connectez-vous à la base de données à partir du terminal avec la commande « docker exec -it mongodb_filmbox mongo »
 
4. Créez les collections « AdminUsers » et « CustomLists » dans le shell MongoDB avec les commandes suivantes :
use FilmBox
db.createCollection("AdminUsers")
db.createCollection("CustomLists")
 
5. Ajoutez des administrateurs et les listes :
//SCRIPTS POUR AJOUTER LES ADMINS ET LISTS
 
6. Arrêtez et relancez le conteneur avec les commandes suivantes :
docker stop mongodb_filmbox
docker start mongodb_filmbox

9. Entrez ensuite dans le dossier server avec « cd server » dans le premier terminal et exécutez la commande suivante : npm i express

10. Ensuite, entrez dans le dossier client avec « cd client » dans le deuxième terminal et exécuter la commande suivante : npm i

11. Finalement, retournez dans le premier terminal (server) pour activer le serveur avec : node server.js

Voilà! Vous êtes prêt(e).
