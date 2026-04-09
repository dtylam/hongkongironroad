# Agent Guide

## Purpose
Maintain this vanilla JS site that displays literal translations of Hong Kong MTR station names.

## Stack
- `index.html` for page structure
- `js/` for behavior (`scripts.js`, `enums.js`)
- `data/*.json` for line/station content
- `css/styles.css` source and `css/styles.min.css` minified output

## Run Locally
```bash
http-server -c-1
```

## Editing Rules
- Keep dependencies minimal (prefer vanilla JS/CSS).
- Use Web Awesome framework components.
- Update minified CSS when changing `css/styles.css` by running cli command like `cleancss -o css/styles.min.css css/styles.css`.
- Preserve existing data schema in `data/*.json`.
- Keep UI and copy concise and readable.