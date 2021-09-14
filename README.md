# takehome_test

### Installation & Setup

Use `npm install` to install the project and its dependencies.

### Development

Use `npm run serve` or `npm run dev` to build and run the project with hot-reload for development.

Debug logs can be enabled by adding a `local.env` file with `VUE_APP_ENABLE_LOGGER` set to `true`.
Note that **only variables prefixed with `VUE_APP_`** will be loaded from `.env` files.
```env
//local.env
VUE_APP_ENABLE_LOGGER=true
```

### Production
Use `npm run build` to compile and minify for production.

A demo of the production build [can be found here](https://fervent-leavitt-2dd4cf.netlify.app/#/).

------------------

### Implementation Notes

#### API
`axios` is used for api requests. A general purpose api service function can be found under `src/api/service`. The service is preloaded with the root JSONPlaceholder url and accepts an `options` object with a `method`, `url`, and a `payload` (for `PUT`, `PATCH`, and `POST` requests).

```js
const results = await service({
  method: 'get', // case insensitive
  url: 'users' // users/3, posts?userId=3, etc
})

```

#### Store
The app uses a modular `Vuex` store, configured under `src/store/index`. All api requests and corresponding data are managed through the store.

##### Modules
Each module has:
- A module name, defined under `src/constants/store`
- `store`, `mutation`, `action`, and `getter` **names** defined under `keys`, in the module folder.
- `store`, `mutations`, `actions`, and `getters` defined under `index`, in the module folder.

`Vuex's` `mapMutations`, `mapActions`, and `mapGetters` helpers can be used to map store functions into components using the relevant module name and corresponding keys.

```js
//my-component

  computed: {
    ...mapGetters(ModuleNames.Users, [
      UserGetterNames.Users,
    ])
  },

  async mounted() {
    await this[UserActionNames.GetUsers]();
  },

  methods: {
    ...mapActions(ModuleNames.Users, [
      UserActionNames.GetUsers,
    ])
  }

```

### Routing

Routing is handled by `Vue Router` and configured under `src/router/index`. Route names and paths are defined under `src/constants/router`.


### Pages
Route level components are defined as `index.vue` files foldered under `src/pages`. Folders for routes utilising params (such as for individual users) are prefixed with an underscore, ie `_detailed-user`.

### Components
Components are defined under `src/components`. Components should be placed in the relevant folder if they are route/module specific. Common or generic components are placed under `src/components/common`.

### SCSS
SCSS is supported in all components tagged with `lang="scss"`. Variables and mixins can be imported globally through `src/assets/scss/global.scss`.

### Vuetify
The app uses the `vuetify` material design library. `vuetify` is initialised under `src/plugins/vuetify`. See [the vuetify docs](https://vuetifyjs.com/en/) for more info.
