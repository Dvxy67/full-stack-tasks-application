# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commandes essentielles

Toutes les commandes se lancent depuis le dossier `api/`.

```bash
# Démarrer la base de données (MariaDB + phpMyAdmin)
docker-compose up -d

# Installer les dépendances
npm install

# Générer le client Prisma (obligatoire après chaque modification du schéma)
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# Lancer le serveur en développement (avec rechargement automatique)
npm run dev

# Lancer le serveur en production
npm start
```

## Architecture

C'est une API REST Express.js (ES modules) connectée à une base MariaDB via Prisma ORM.

```
api/
├── src/
│   ├── server.js          # Point d'entrée, montage des routes
│   ├── db.js              # Instance Prisma partagée (connexion MariaDB via adapter)
│   ├── controllers/       # Logique métier des routes
│   └── routes/            # Définition des routes Express
├── prisma/
│   ├── schema.prisma      # Modèles de données (User, Task)
│   └── migrations/        # Historique des migrations SQL
├── .env                   # Variables d'environnement (DB_HOST, DB_USERNAME, etc.)
└── docker-compose.yaml    # MariaDB (port 3306) + phpMyAdmin (port 8080)
```

## Points clés

**Connexion base de données** : `db.js` utilise `@prisma/adapter-mariadb` pour connecter Prisma à MariaDB. Les variables d'environnement sont chargées via `dotenv`. Le fichier `.env` doit être présent dans `api/` avant de démarrer.

**Modèles Prisma** : `User` (id, name) et `Task` (id, title, description, status, createdAt, updatedAt, userId). Une tâche appartient obligatoirement à un utilisateur — `userId` est requis à la création.

**Routes disponibles** :
- `GET /tasks` — toutes les tâches
- `POST /tasks` — créer une tâche (body : `title`, `description`, `userId`)
- `GET /tasks/:id` — une tâche par id
- `PATCH /tasks/:id` — modifier une tâche (body : `title`, `description`, `status`)
- `DELETE /tasks/:id` — supprimer une tâche

**Après chaque modification de `schema.prisma`** : relancer `npx prisma generate` puis créer une migration avec `npx prisma migrate dev --name <nom>`.
