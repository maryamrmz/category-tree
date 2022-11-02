# Category Tree App

### Live Demo

---

[Link](https://category-tree-alpha.vercel.app)

### Screenshots

---

![img](/src/assets/images/screenshot.png)

### Installation

---

1. Clone the project

```bash
git clone https://github.com/maryamrmz/category-tree.git
```

2. You need to install nodejs and a package manager (NPM/Yarn) to start it.
   First, install Node ([Node installation guide](https://nodejs.org/en/download/))
   In case you rather go with Yarn, install it:

```bash
npm install --global yarn
```

3. Go to project directory and install the dependencies:

```bash
cd category-tree
yarn install
```

### Development

---

##### Available commands

-   `yarn eject`
    Customize anything
-   `yarn test`
    Runs tests
-   `yarn build`
    Generates a built version of the project
-   `yarn start`
    Runs the app in the development mode

### Project Structure

---

```
.
├── /src/                       # The source code of the application.
    ├── /assets/                # Project assets like images, icons, ...
    ├── /components/            # Components
        ├── /A/
            ├   index.tsx       # A component
            ├   A.module.scss   # A component's styles

    ├   types.ts                # Project-wide type definitions
    ├   styles.scss             # Project-wide styles
    ├── /utils/                 # Project-wide helper functions
        ├── /__tests__/         # The tests related to utils
```

### More

---

If I had more time, I would:

1. Write more tests
2. Choose better design
3. Use from advanced react hooks to have better performance
