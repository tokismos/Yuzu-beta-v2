# Yuzu

Yuzu est une application de recettes de plats. Son but est de pouvoir proposer des recettes personnalisées, pour permettre à tous de les cuisiner à la maison.

Stack technique :
* JS
* Heroku
* MongoDB (Atlas)
* Firebase (Realtime DB)
* React Native / Expo
* React

# Architecture du projet

Le projet Yuzu est divisé en 3 repos GitHub : celui de l'appli `Yuzu-beta-v2`, celui du back-office `yuzu-dashboard` et celui du code serveur `yuzu-api`.

### Application

L'application est developpé en `Javascript`, à l'aide du framework `React Native`, au départ l'appli a été configurée avec Expo qui n'est aujourd'hui plus utilisé.

### Back-office

Développé avec `ReactJS`, le back-office permet d'ajouter, modifier et supprimer des recettes et d'afficher des informations comme la moyenne des notes des recettes...

Les variables d'environnenemts du back-office sont sur le dashboard `Heroku -> yuzu-dashboard -> yuzu-dashboard -> Settings -> Config Vars`, veuillez en informer Tim si vous modifiez ces variables.

***ATTENTION. Heroku déploiera automatiquement chaque push de la branche main de ce repo en version prod.***

### Bases de données et backend

Le projet utilise `Firebase` pour authentifier les utilisateurs, stocker les données des utilisateurs (informations personnelles, recettes favorites, commandes...) et les notes des recettes. (PS: les images des recettes sont aussi sur Firebase / Cloud Storage).

Et `MongoDB` pour stocker toutes les recettes. 

Côté backend, `Heroku` fait l'intermédiaire entre le front et MongoDB, et est utilisé pour sécuriser les transactions et requêtes d'API.

Les variables d'environnenemts du serveur sont sur le dashboard `Heroku -> yuzu-api -> yuzu-backend -> Settings -> Config Vars`, veuillez en informer Tim si vous modifiez ces variables.

***ATTENTION. Heroku déploiera automatiquement chaque push de la branche main de ce repo en version prod.***

### Sécurité des données 

Pour la DB Firebase, des règles de sécurité ont été créées, accessibles sur le dashboard `Firebase -> Realtime Database -> Règles`. Ces règles ont pour but de sécuriser la base de données (en bloquant les écritures et lectures globales) et les utilisateurs de manière à permettre à un utilisateur de lire (et écrire) uniquement ses propres données grâce à son UID ; mais aussi, de limiter certaines syntaxes de données comme les avis des recettes (on accepte uniquement un entier, compris entre 1 et 5). Il en est de même pour le stockage des fichiers (images des recettes), les régles sont accessibles sur le dashboard `Firebase -> Storage -> Règles`, nous limitons globalement les écritures aux admins, les lectures restent quand à elles ouvertes.

Sur le back-office, vous devez vous connecter à l'aide d'un compte admin pour effectuer des actions nécessitants une autorisation comme l'ajout et la modification de recettes. 
Niveau fonctionnement, tous les endpoints qui éxecutent des actions nécessitants une autorisation vérifient si l'utilisateur qui envoie la requête est un admin, pour cela on envoie pendant la requête un token d'authentification: `https://backend.com/example/${idToken}`.

Les `admins` sont enregistrés avec Firebase en ajoutant le claim admin à un utilisateur. Puis avec le token envoyé, on vérifie sur le serveur que l'utilisateur ait bien la valeur admin dans ses propriétés claims. 

***Vous devez sécuriser tout nouvel ajout de code selon la logique expliquée ci-dessus.***

# Schéma technique

![Schéma](https://user-images.githubusercontent.com/98855341/207526280-915d197e-91e8-4e49-83ee-baaa076f5507.png)

# Setup de l'application

Afin de mettre en place le projet, commencez par cloner le repo de l'application :

```sh
$ git clone git@github.com:YuzuAdmin/Yuzu-beta-v2.git
```

Il faudra créer un fichier `.env` à la racine du projet. Ce fichier contiendra 
toutes les variables d'environment nécessaire. Ces variables vous seront données pendant
votre installation, ou sinon vous pouvez demander à Tim de les vous faire parvenir.

Installez les modules avec npm :

```sh
$ npm i
```

Pour iOS, installez et configurez les modules avec :

```sh
$ cd ios && pod install
```

Pour finir, executer l'appli sur émulateur Android ou iOS :

```sh
$ npm run ios
```

ou

`npm run android`

Voici un lien afin de vous aider à setup l'environnement React Native :
* https://reactnative.dev/docs/environment-setup

# Setup du back-office

Clonez le repo du back-office :

```sh
$ git clone git@github.com:YuzuAdmin/yuzu-dashboard.git
```

Il faudra créer un fichier `.env.local` à la racine du projet et y ajouter `REACT_APP_API_URL="https://yuzu-backend.herokuapp.com"`.

Installez les modules avec npm :

```sh
$ npm i
```

Pour finir, lancez le serveur qui ouvrira le site sur navigateur :

```sh
$ npm start
```

# Setup du serveur

Clonez le repo du code serveur :

```sh
$ git clone git@github.com:YuzuAdmin/yuzu-api.git
```

# Deploy sur App Store Connect et TestFlight

Pour réaliser des tests sur l'application mobile iOS, nous utilisons TestFlight. Pour déployer une nouvelle version sur TestFlight, il faut créer une archive de l'application et l'envoyer sur App Store Connect.

Sur Xcode :

- dans le répertoire, allez dans `Yuzu -> Targets -> Yuzu -> General` puis incrementez la version
- allez dans `Product -> Scheme -> Edit scheme...` puis mettez Build configuration sur `Release`
- dans la selection de l'appareil, choisissez `Any iOS device`
- ensuite créez un build dans `Product -> Build`
- puis créez une archive dans `Product -> Archive`

Une fois l'archive créée, choisissez `Distribute App` en ayant séléctionné la nouvelle archive dans la fenêtre des archives. Il faudra ensuite suivre les instructions et laisser les options par défaut. Vous pourrez ensuite cliquer sur `Upload` et attendre que l'upload se termine. 

Une fois l'upload terminé, se rendre sur App Store Connect, section TestFlight, attendez que la nouvelle version finisse son chargement... et, prêt à être envoyer sur TestFlight !
