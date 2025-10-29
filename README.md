# Alexandrie

## 1. Objectifs

Le but de ce projet est de créer une application de gestion de bibliothèques pour ANDROID et IOS.
Les utilisateurs devront créer un compte et pourront scanner les isbn10 ou 13 pour enregistrer leurs livres. 
Ils auront aussi la possibilité de créer des groupes pour partager leurs livre entre eux et voir si quelqu'un du groupe l'a déjà.
Ils pourront aussi saisir où ils en sont dans la lecture de leurs livres.

## 2. Partie technique

### 2.1. Technologies
- L'application sera faites en React Native / Expo / Typescript.
- La base de données sera en MySQL
- L'API sera en express / typescript
### 2.2. Comment sont gérées les données
Les données sont stockées dans une base de données sur mon serveur, la communication entre l'application et la BDD se fera avec une API.

## 3. Structure

**users**.books {[
&nbsp;&nbsp;&nbsp; bookId: **books**.id
&nbsp;&nbsp;&nbsp; serie: nom de la serie saisie par l'user
&nbsp;&nbsp;&nbsp; tome: tome de la serie saisie par l'user
]}

**users**.reading_list {[
&nbsp;&nbsp;&nbsp; bookId: **books**.id
&nbsp;&nbsp;&nbsp; number_of_pages_reads: nombre de page lu par l'utilisateur
&nbsp;&nbsp;&nbsp; number_of_pages: **books**.number_of_pages
]}

**groupes**.comic_books {[
&nbsp;&nbsp;&nbsp; bookId: id du livre dans **books**
&nbsp;&nbsp;&nbsp; serie: nom de la serie saisie par l'user
&nbsp;&nbsp;&nbsp; tome: tome de la serie saisie par l'user
]}

**groupes**.members {[
&nbsp;&nbsp;&nbsp; userId: **users**.id
&nbsp;&nbsp;&nbsp; status: waiting / accepted
]}