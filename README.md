<pre>
       __           __           __
  ____/ /_  _____  / /_  _______/ /_
 / __  / / / / _ \/ / / / / ___/ __/
/ /_/ / /_/ /  __/ / /_/ (__  ) /_
\__,_/\__,_/\___/_/\__, /____/\__/
                  /____/
</pre>

A deck management tool for [Duelyst](http://www.duelyst.com).


## Installation

```
npm install
npm start
open http://localhost:8080
```


## Overview

### Scrapers

To get data out of the game utilize the scrapers in the `scrapers` directory.
Each has some code to copy and paste into the console to get the data. In the
future these may be better suited for a browser extension. There are
currently scrapers for:

* Cards
* Factions
* Assets (plist, png files for cards)

Once the data is scraped it can be pasted into the json files inside of the
`app/data` directory (after removing the old data).

----

### Scripts

There is a script for converting card asset objects to card images in
`scripts`. The assets script will download a png and plist file, crop an
image from it and save a new image in the `app/images/avatar` directory. The
urls for the png and plist file come from assets data in `data/assets`.

----

### Extensions

TBD
