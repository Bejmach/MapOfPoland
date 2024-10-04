## Pseudo quiz mapy polski

Responsywna stronka do nauki regionów Polski napisana na szybko.

Jeżeli chcesz przyczynić się do rozwoju,  prześlij mapę z każdym regionem/rzeką/górą itd.  zaznaczoną innym kolorem oraz wyślij listę z przypisanym kolorem do nazwy.  Aktualnie brakuje rzek,  szczytów,  pasm górskich,  jezior.  (jeżeli zapomniałem czegoś na kartówkę to proszę przypomnieć.)  
Postaram się rozwijać wraz z przyszłymi testami,  oraz tym co zostanie z map wysłane.

### Przykład regionu
W pliku `script.js`:
```js
new Region("Pobrzeże Szczecińskie", "89;78;237")
```
Druga wartość to kolor RGB tego obszaru, używany do wykrywania gdzie klikniesz.

### Wymagania 

- przeglądarka

### Użycie

Uruchomić plik `docs/index.html` w przeglądarce. Postawić serwer http (np. `python3 -m http.server`) w folderze `docs`, bo inaczej mapa nie działa i uruchomić localhosta w przeglądarce.

Można też odpalić zahostowaną stronę: [LINK](https://bejmach.github.io/MapOfPoland)

### Autorzy
- [Bejmach](https://github.com/Bejmach) (oryginalny projekt)
- [Buszewicz](https://github.com/Buszewicz) (małe poprawki i parki narodowe)
- [Janek](https://github.com/creeper82) (poprawki i wycofanie Node.JS)
- [Maksym](https://github.com/iLoveReact) (sugestie do reformatu)
