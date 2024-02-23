# Codepulse

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Folder structure

Folder structure for each journey. This folder structure is influenced by the [google style guide](https://angular.io/guide/styleguide) <br/>
This [video](https://www.youtube.com/watch?v=7SDpTOLeqHE) explains the folder structure in more detail.

- `src/`
  - `app/`
    - `journey/`
      - `data-access`
        - `models/`
        - `services/`
        - `store/`
      - `features/`
        - `page-one/`
        - `page-two/`
      - `ui/`
        - `stateless-component/`
      - `utils/`
        - `functions/`
        - `guards/`
        - `interceptors/`
      - `journey-routing.module.ts`
      - `journey.module.ts`

When creating a new journey, start by generating a module and its routing <br/>
Run `ng generate module <journey-name> --routing`<br/>
In `app-routing.module.ts` you import the routes from the module you just created :

```ts
...
 {
    path: 'my-new-journey',
    component: NavigationComponent, // <-- add this if you want your journey to inherit the Navigation Layout
    loadChildren: () =>
      import('./journey/journey.module').then((m) => m.JourneyModule),
 },
...
```

Then manually create the folders associated with this journey and should follow the folder structure above. <br/>

This ensures your components are lazy loaded meaning the component will only be rendered when needed. To read more about lazy loading, please see this [guide.](https://angular.io/guide/lazy-loading-ngmodules)

## Code scaffolding

Run `ng generate component <journey>/features/<component-name>` to generate a stateful component.

Run `ng generate component <journey>/ui/<component-name>` to generate a stateful component.

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. Verify that you generate in the correct folder according to the file structure above.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
To learn more about unit testing. Here are some [video tutorials](https://www.youtube.com/watch?v=emnwsVy8wRs&list=PLoC8Q0moRTSiTBAKWBGiJjFUMpiFdaGdF)

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
