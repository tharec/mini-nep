# Mini Neptun Dokumentáció

Egy Neptunt utánzó kis alkalmazást fogok megvalósítani, mely egy tanumányi rendszer alap tulajdnságaival és funkcióival fog bírni.

##Funkcionális követelmények ismertetése

**Vendégként legyen lehetőségem:**
* regisztrálni az oldalra

**Hallgatóként legyen lehetőségem:**
* bejelentkezni az oldalra
* tantárgyat felvenni/leadni
* csoporthoz csatlakozni/kilépni belőle

**Tanárként legyen lehetőségem:**
* bejelentkezni az oldalra
* tantárgyat hozzáadni/törölni
* csoportot létrehozni/törölni
* csoportban lévő hallgatók listázása

##Nem funkcionális követelmények ismertetése
* Biztonság: Jelszavak megfelelően elkódolt módon
* Gyors működés
* Karbantarthatóság: könnyű továbbfejlesztés, további funkciókkal való bővítés
* Korszerű megjelenés

##Szerepkörök ismertetése
* **vendég**: lehetősége van regisztrálni a rendszerbe, nem képes csatlakozni csoportokhoz, nem tud tárgyat felvenni, és ezeket törölni sem tudja, megtekinteni sem tudja a csoportokat/tárgyakat
* **hallgató**: a vendég funkcióin felül lehetősége van bejelentkezni, tárgyat felvenni, illetve leadni, ezzel együtt csoportba jelentkezni, illetve leadni, kilépni a rendszerből
* **tanár**: a hallgató funkcióin felül lehetősége van tantárgy hozzáadásához, törléséhez, csoport létrehozásához, törléséhez, illetve a csoportokban lévő hallgatók listázására

###Szerepkörök hierarchikus használati diagramja

![aktorok](https://cloud.githubusercontent.com/assets/22147821/19412376/083c3ee2-9315-11e6-9033-a5f6f9d798d0.png)

###Tárgyfelvétel hallgató jogkörrel

![tárgyfelvétel](https://cloud.githubusercontent.com/assets/22147821/19412468/53b0032a-9317-11e6-8490-5f5988000940.png)

###Tárgyleadás hallgató jogkörrel

![tárgyleadás](https://cloud.githubusercontent.com/assets/22147821/19412512/8b5aa216-9318-11e6-9f8a-66987846c141.png)

##Oldltérkép és Végpontok

Az oldalon a különböző szerepkörökhöz eltérő funkciók érhetőek el. Minél magasabb körbe tartozik annál több választási lehetősége van az oldalon, ahogyan ezt a használati körök témakörben lefedtem, mely feljebb található.

**Oldaltérkép:**
> **Publikus/Vendég:**
> - Főoldal
> - Bejelentkezés
> - Regisztráció
> 
> **Hallgató:**
> - Főoldal
> - Bejelentkezés
> - Kijelentkezés
> - Regisztráció
> - Tárgyfelvétel:
>      + Csoportba jelentkezés
> - Tárgyak listázása
> - Csoportok listázása
> 
> **Tanár:**
> - Főoldal
> - Bejelentkezés
> - Kijelentkezés
> - Regisztráció
> - Tárgy létrehozása
>      + megjegyzés hozzáfűzése
> - Tárgy törlése
> - Tárgy hallgatóinak listázása
> - Csoport létrehozása
>      + megjegyzés hozzáfűzése
> - Csoport törlése
> - Csoport hallgatóinak listázása

**Végpont tervezet:**
> GET / :főoldal

> GET /login :belépési pont

> POST /login :belépés

> GET /register :regisztrációs oldal

> POST /register :regisztráció elküldése

> GET /logout :kijeletkezés

> GET /applyLecture :tárgyfelvétel

> POST /applyLecture :adatok véglegesítése

> GET /addLecture :tárgy hozzáadása

> POST /addLecture :adatok véglegesítése

> GET /subject/:id :tantárgy oldala

> GET /subject/:id/delete :tantárgy törlése

> POST /subject/:id :csoport felvétele

> GET /subject/:id/comment :komment írása a tantárgyhoz

> POST /subject/:id/comment :adatok elküldése

> GET /subject/:id/deleteComments :összekomment törlése

> GET /subject/:id/edit :tantárgy adatainak szerkesztése

> POST /subject/:id/edit :adatok elküldése/végelgesítés

> GET /subject/:id/dropSubject :tantárgy leadása

> GET /subject/:sub_id/:gro_id/edit :csoport adatainak szerkesztése

> POST /subject/:sub_id/:gro_id/edit :adatok elküldése/végelgesítés

> GET /subject/:sub_id/:gro_id/delete :csoport törlése


##Adatmodell
![model](https://cloud.githubusercontent.com/assets/22147821/19417962/fdeedc7e-93b9-11e6-8b91-977ea12d1f99.png)

##Adatbázisterv
![ab_model](https://cloud.githubusercontent.com/assets/22147821/19417963/fdf23c84-93b9-11e6-86c4-a150440bb9b0.png)

##Oldaltervek
![reg](https://cloud.githubusercontent.com/assets/22147821/20459271/681cec5a-aebb-11e6-8e35-c000c81130e1.PNG)
![login](https://cloud.githubusercontent.com/assets/22147821/20459270/681cba00-aebb-11e6-9618-71c2386e7e6b.PNG)
![subject](https://cloud.githubusercontent.com/assets/22147821/20459269/681c0d08-aebb-11e6-9bfe-d41dc9804e5e.PNG)
![new_sub](https://cloud.githubusercontent.com/assets/22147821/20459268/681641e8-aebb-11e6-98bf-89d14c735e87.PNG)
![lobby](https://cloud.githubusercontent.com/assets/22147821/20459267/6813aaa0-aebb-11e6-9ee7-371c6145cbc1.PNG)
