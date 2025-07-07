Natürlich – hier ist dein vollständiger Bericht **überarbeitet und erweitert**, basierend auf den tatsächlichen Schritten, die du gemacht hast. Das Format bleibt exakt so wie gewünscht:

---

### Übung 1 – npm verwenden

> Erstellen sie ein neues Verzeichnis mit einer leeren index.html Datei
> Rufen sie ihr Command Prompt auf.
>
> Initialisieren sie ihre Seite. Befehl: `npm init`. Sie werden durch ein Menu geführt und angewiesen ein paar Felder auszufüllen. Sie können überall einfach die Eingabe drücken.
>
> Installieren sie ein Paket, z.B. lodash.

Ein neues Verzeichnis `meine-seite` wurde angelegt und mit `cd` betreten. Darin wurde eine leere Datei `index.html` erstellt.
Anschliessend wurde das Projekt mit `npm init` initialisiert. Alle Eingaben wurden mit Enter bestätigt, wodurch automatisch eine `package.json` erzeugt wurde.
Danach wurde das Paket `lodash` mit `npm install lodash` installiert.

Es wurden folgende Elemente automatisch erzeugt:

* `package.json`
* `package-lock.json`
* `node_modules/`

#### Unterschied zwischen `npm install lodash -g` und `npm install lodash`

*Mit `-g` wird das Paket global installiert und steht überall auf dem System zur Verfügung. Ohne `-g` wird es nur lokal im aktuellen Projekt installiert.*
Zum Test wurde `underscore` mit `npm install underscore -g` global installiert.

---

### Übung 2 – Applikation neu generieren

> Löschen sie die beiden Objekte `package-lock.json` und `node_modules`.
> Rufen sie nun den Befehl `npm install` auf.
> Dokumentieren sie was geschieht.

Mit dem Befehl `rm -rf node_modules package-lock.json` wurden die beiden Objekte entfernt.
Anschliessend wurde `npm install` erneut ausgeführt. Dadurch wurden:

* Alle Pakete aus `package.json` installiert,
* Der Ordner `node_modules` wieder erstellt,
* Und die Datei `package-lock.json` neu generiert.

*Das Projekt wurde erfolgreich wiederhergestellt.*

---

### Übung 3 – Minimierung von HTML-Dateien

> Initialisieren sie das npm Projekt
> Installieren sie das Paket `html-minifier`
> Führen sie folgenden Befehl aus:
> `npx html-minifier --input-dir ./src --output-dir ./dist --collapse-whitespace --file-ext html`
> Schauen sie sich die Datei im dist-Ordner an

Eine neue Projektstruktur wurde erstellt mit einem `src/`-Ordner für die HTML-Dateien und einem leeren `dist/`-Ordner.
Das Projekt wurde mit `npm init -y` initialisiert, danach wurde `html-minifier` installiert mit:

```bash
npm install html-minifier --save-dev
```

Durch den folgenden Befehl wurden alle HTML-Dateien im `src/`-Verzeichnis minimiert:

```bash
npx html-minifier --input-dir ./src --output-dir ./dist --collapse-whitespace --file-ext html
```

Im Ordner `dist/` befinden sich nun die HTML-Dateien im komprimierten Zustand – alle Leerzeichen, Kommentare und unnötige Zeilenumbrüche wurden entfernt.

---

### Übung 4 – Minimierung von CSS-Dateien

> Verwenden sie css-minify
> Minimieren sie die CSS-Dateien mit `npx`
> Schauen sie sich das Ergebnis im `dist`-Ordner an
> Öffnen sie die HTML-Datei im Browser – wird das CSS korrekt geladen?

Die CSS-Dateien (z. B. `styles.css`) lagen im `src/`-Verzeichnis. Danach wurde `css-minify` installiert:

```bash
npm install css-minify --save-dev
```

Mit folgendem Befehl wurde die Datei minimiert:

```bash
npx css-minify -d src -o dist
```

Die minimierte Datei `styles.min.css` erschien im `dist/`-Ordner.
Beim Öffnen der HTML-Datei wurde das CSS nicht korrekt geladen. Grund: Die HTML-Datei verweist noch auf `src/styles.css`, obwohl `dist/styles.min.css` verwendet werden müsste.

---

### Übung 5 – Build-Script hinzufügen

> Erstellen sie einen neuen Eintrag im Script-Bereich der `package.json`
> Kombinieren sie HTML- und CSS-Minimierung in einem Script mit `&&`
> Führen sie das Script mit `npm run build` aus

In der Datei `package.json` wurde im Bereich `scripts` folgender Eintrag ergänzt:

```json
"scripts": {
  "build": "npx html-minifier --input-dir ./src --output-dir ./dist --collapse-whitespace --file-ext html && npx css-minify -d src -o dist"
}
```

Mit dem Befehl `npm run build` wurden anschliessend beide Minimierungen (HTML + CSS) automatisch nacheinander ausgeführt.

*Das Build-Script automatisiert den gesamten Optimierungsvorgang.*

---

### Übung 6 – Build-Script erweitern 1

> Lösen sie das Problem aus Übung 4 (wrong CSS-Path)
> Verwenden sie einfache Kommandozeilenbefehle zur Pathanpassung

Da die minimierte CSS-Datei `styles.min.css` heisst, wurde in den HTML-Dateien im `src/`-Verzeichnis der Link entsprechend angepasst:

```html
<!-- vorher -->
<link rel="stylesheet" href="styles.css">

<!-- nachher -->
<link rel="stylesheet" href="styles.min.css">
```

Durch die Anpassung vor der Minimierung wird beim Kopieren in den `dist`-Ordner alles korrekt dargestellt.
Alternativ kann dieser Schritt mit einem zusätzlichen Automatisierungs-Tool ersetzt werden, z. B. mit `replace-in-file`.

---

### Übung 7 – Build-Script erweitern 2

> Fügen sie ein neues Script `prebuild` hinzu
> Verwenden sie das Paket `rimraf`, um das `dist`-Verzeichnis vor dem Build zu löschen
> Testen sie das Verhalten beim Ausführen von `npm run build`

Zuerst wurde das Paket `rimraf` installiert:

```bash
npm install rimraf --save-dev
```

In der `package.json` wurde das Script folgendermassen erweitert:

```json
"scripts": {
  "prebuild": "rimraf dist",
  "build": "npx html-minifier --input-dir ./src --output-dir ./dist --collapse-whitespace --file-ext html && npx css-minify -d src -o dist"
}
```

Beim Ausführen von `npm run build` passiert nun folgendes:

1. `rimraf dist` wird zuerst ausgeführt - der `dist/`-Ordner wird gelöscht.
2. Danach läuft der `build`-Befehl wie gewohnt ab (HTML + CSS-Minimierung).

**Das Ergebnis ist ein sauberer Build-Vorgang ohne veraltete Dateien.***