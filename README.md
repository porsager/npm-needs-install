# `npm-needs-install`

This small utility runs through your package.json, and tells you about the fist module which is missing or needs to be updated in `node_modules` by checking their package.json version. This is faster than running `npm install` directly so you can run it everytime at startup and always be up to date if you just pulled new changes or switched branches.
