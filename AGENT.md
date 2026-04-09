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
- don't sync the styles.min.css because the user is using a background process to update that.
- Preserve existing data schema in `data/*.json`.
- Keep UI and copy concise and readable.