# github-repo-browser-ui
This is GitHub repository viewer built with **Angular4** and **TypeScript** and hosted on Heroku. It consumes public [GitHub API](https://developer.github.com/v3/) to open files and folders as well as specialized .NET Core Web API for storing view statistics.

The project uses [Material design](https://material.angular.io/) library for styling and [Ace editor](https://ace.c9.io/) component for file viewer.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy to Heroku
The repository contains `Deploy` folder with basic Node.js **Express** configuration. Copy the contents of `dist` folder after `ng build --prod --aot` to the `Deploy` folder and push to Heroku. Node.js Express configuration supports serving gzipped files, so you can run `gzip -9 *.bundle.js` in `dist` folder before the deployment to compress the files.
