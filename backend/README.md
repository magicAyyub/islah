# Backend FastAPI avec PostgreSQL et pgAdmin

## Description

Ce projet est un backend construit avec [FastAPI](https://fastapi.tiangolo.com/), utilisant [PostgreSQL](https://www.postgresql.org/) comme base de données et [pgAdmin](https://www.pgadmin.org/) pour gérer la base de données. Le tout est orchestré avec Docker pour faciliter le déploiement et l'exécution en local.

## Prérequis

Assurez-vous d'avoir les logiciels suivants installés :

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuration du projet

### 1. Clonez le repository

```bash
git clone https://github.com/magicAyyub/islah.git
cd islah/backend
```

### 2. Modifier le fichier `.env`

À la racine du répertoire `backend`, un fichier `.env` stock les variables d'environnement nécessaires pour PostgreSQL :

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=mydatabase
```

Modifiez les valeurs de ces variables selon vos besoins. Ces valeurs seront utilisées pour initialiser la base de données PostgreSQL.

### 3. Construisez et démarrez les services (Uniquement pour la première fois ou après modification du Dockerfile)

Pour lancer l'application et les autres services (PostgreSQL et pgAdmin), exécutez :

```bash
sudo docker-compose up -d --build 
```

Cela démarrera les services définis dans `docker-compose.yml` :
- FastAPI : accessible via `http://localhost:8000`
- pgAdmin : accessible via `http://localhost:5050`

### 4. Accédez à l'application

- **FastAPI** : Rendez-vous à l'adresse `http://localhost:8000`.
- **Documentation Swagger UI** : Accessible à `http://localhost:8000/docs`.
- **pgAdmin** : Connectez-vous à pgAdmin à l'adresse `http://localhost:5050` avec les identifiants :
  - **Email** : `l'addresse email du fichier .env`
  - **Mot de passe** : `Le mot de passe du fichier .env`

### 5. Ajouter un serveur PostgreSQL dans pgAdmin

Après vous être connecté à pgAdmin, ajoutez un nouveau serveur PostgreSQL avec les paramètres suivants :

- **Nom** : `Nom de votre choix`
- **Hôte** : `postgres`
- **Port** : `5432`
- **Nom d'utilisateur** : (valeur du fichier `.env`)
- **Mot de passe** : (valeur du fichier `.env`)
- **Base de données** : (valeur du fichier `.env`)
- **Schéma** : `public`

Cliquez sur `Enregistrer` pour ajouter le serveur.

### 6. Arrêter les services

Lorsque vous avez terminé, vous pouvez arrêter les services Docker avec :

```bash
sudo docker-compose down
```

Cela arrêtera les conteneurs tout en conservant les données (grâce aux volumes).

### 7. Reprendre le développement après redémarrage

Lorsque vous redémarrez votre machine ou après avoir arrêté les services, relancez simplement les conteneurs avec :

```bash
sudo docker-compose up -d
```

Cela démarre les services sans les reconstruire, ce qui est plus rapide.

## Structure du projet

```
backend/
│
├── app/
│   ├── __init__.py
│   ├── api.py
│
│── models/
│   ├── __init__.py
│   ├── item.py
│   ├── user.py
│
│── utils/
│   ├── __init__.py
│   ├── database.py
│   ├── schemas.py
│   ├── crud.py
│   ├── auth.py 
│
├── Dockerfile
├── docker-compose.yml
├── main.py
├── requirements.txt
└── .env
```

- `app/` : Contient les fichiers de l'application FastAPI.
- `models/` : Contient les fichiers de modèles Pydantic et de modèles de base de données.
- `utils/` : Contient les fichiers utilitaires pour la base de données, les schémas, les opérations CRUD et l'authentification.
- `Dockerfile` : Fichier Docker pour construire l'image de l'application.
- `docker-compose.yml` : Fichier Docker Compose pour définir les services.
- `main.py` : Point d'entrée de l'application FastAPI.
- `requirements.txt` : Fichier de dépendances Python.
- `.env` : Fichier de variables d'environnement.

## Contributions

Les contributions sont les bienvenues ! N'hésitez pas à créer des issues ou à soumettre des pull requests pour améliorer ce projet.

## License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
