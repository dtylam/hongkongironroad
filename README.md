# hongkongironroad

Hong Kong railway stations. But in literal translations.

I hate having to update npm/js libraries, so wrote this with vanilla js 😝

With a bit of help from [Web Awesome](https://webawesome.com/docs/)!

Run locally to debug (this avoids cors problems with local json files):
```bash
# install on first run
# npm install -g http-server

http-server -c-1 
``` 

Minify CSS
```bash
# install on first run
# npm install clean-css-cli -g

# watch for changes during development
cleancss --watch -o css/styles.min.css css/styles.css
```
