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
