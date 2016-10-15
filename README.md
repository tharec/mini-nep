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
* csoportok listázása
* csoportban lévő diákok listázása

##Nem funkcionális követelmények ismertetése
* Biztonság: Jelszavak megfelelően elkódolt módon
* Gyors működés
* Karbantarthatóság: könnyű továbbfejlesztés, további funkciókkal való bővítés
* Korszerű megjelenés

##Szerepkörök ismertetése
* **vendég**: lehetősége van regisztrálni a rendszerbe, nem képes csatlakozni csoportokhoz, nem tud tárgyat felvenni, és ezeket törölni sem tudja, megtekinteni sem tudja a csoportokat/tárgyakat
* **hallgató**: a vendég funkcióin felül lehetősége van bejelentkezni, tárgyat felvenni, illetve leadni, ezzel együtt csoportba jelentkezni, illetve leadni, kilépni a rendszerből
* **tanár**: a hallgató funkcióin felül lehetősége van tantárgy hozzáadásához, törléséhez, csoport létrehozásához, törléséhez
