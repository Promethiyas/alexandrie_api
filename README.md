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

```
Élements dans les tables de la BDD dont le type est JSON
```

**users**.books {[<br>
&nbsp;&nbsp;&nbsp; bookId: **books**.id <br>
&nbsp;&nbsp;&nbsp; serie: nom de la serie saisie par l'user<br>
&nbsp;&nbsp;&nbsp; tome: tome de la serie saisie par l'user<br>
]}

**users**.reading_list {[<br>
&nbsp;&nbsp;&nbsp; bookId: **books**.id<br>
&nbsp;&nbsp;&nbsp; number_of_pages_reads: nombre de page lu par l'utilisateur<br>
&nbsp;&nbsp;&nbsp; number_of_pages: **books**.number_of_pages<br>
]}

**groupes**.comic_books {[<br>
&nbsp;&nbsp;&nbsp; bookId: id du livre dans **books**<br>
&nbsp;&nbsp;&nbsp; serie: nom de la serie saisie par l'user<br>
&nbsp;&nbsp;&nbsp; tome: tome de la serie saisie par l'user<br>
]}

**groupes**.members {[<br>
&nbsp;&nbsp;&nbsp; userId: **users**.id<br>
&nbsp;&nbsp;&nbsp; status: waiting / accepted<br>
]}