# Directory Tree App

### Screenshots

---

![img](/src/assets/images/screenshot.png)

### Installation

---

1. Clone the project

```bash
git clone https://github.com/maryamrmz/directory-tree.git
```

2. You need to install nodejs and a package manager (NPM/Yarn) to start it.
   First, install Node ([Node installation guide](https://nodejs.org/en/download/))
   In case you rather go with Yarn, install it:

```bash
npm install --global yarn
```

3. Go to project directory and install the dependencies:

```bash
cd directory-tree
yarn install
```

### Development

---

##### Available commands

-   `yarn dev`
    Starts the development server
-   `yarn test`
    Runs tests
-   `yarn build`
    Generates a built version of the project inside `build/` directory
-   `yarn start`
    Serves the built version

### Project Structure

---

```
.
├── /build/                     # Built version of project
├── /src/                       # The source code of the application.
    ├── /assets/                # Project assets like images, icons, ...
    ├── /components/            # Components
        ├── /A/
            ├   index.tsx       # A component
            ├   A.module.scss   # A component's styles

    ├── /utils/                 # Project-wide helper functions
        ├── /__tests__/         # The tests related to utils
```
