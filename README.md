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
>      + Csoport leadása
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
> GET / :főoldal és bejelentkező oldal hibrid

> POST / :belépési adatok küldése

> GET /reg :regisztrációs oldal

> POST /reg :regisztráció elküldése

> POST /subject/rec :tárgyfelvétel

> POST /subject/add :tárgy hozzáadása

> GET /subject/list :tárgy hallgatóinak listázása

> GET /subject/:id/comment :az adott tantárgy megjegyzésének szerkesztése

> GET /group/list :csoport hallgatóinak listázása

> POST /group/join :csoportba jelentkezés

> GET /group/:id/comment :az adott csoport megjegyzésének szerkesztése

> POST /subject/del/:id :tantárgy törlése

> POST /group/del/:id :csoport törlése

##Adatmodell
![model]()

##Adatbázisterv
![ab_model](https://cloud.githubusercontent.com/assets/22147821/19417962/fdeedc7e-93b9-11e6-8b91-977ea12d1f99.png)
