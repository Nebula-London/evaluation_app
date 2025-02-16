# README

## Project Overview

This project consists of a Java backend (using Spring Boot) and a JavaScript frontend (using React). The frontend provides a user interface for submitting questions and answers, which are then evaluated by the backend.

## Project Structure

```
my-web-app
├── backend                # Java backend application
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── example
│   │   │   │           └── App.java
│   │   │   └── resources
│   │   └── test
│   │       └── java
│   │           └── com
│   │               └── example
│   │                   └── AppTest.java
│   └── pom.xml
├── frontend               # JavaScript frontend application
│   ├── src
│   │   ├── index.js
│   │   └── components
│   │       └── App.js
│   ├── public
│   │   └── index.html
│   ├── package.json
│   └── webpack.config.js
├── docker-compose.yml
└── README.md
```

## Backend Setup

1.  Navigate to the `backend` directory.

2.  Build the project using Maven:

    ```
    mvn clean install
    ```

3.  Run the application:

    ```
    mvn spring-boot:run
    ```

## Frontend Setup

1.  Navigate to the `frontend` directory.

2.  Install the dependencies:

    ```
    npm install
    ```

3.  Start the development server:

    ```
    npm start
    ```

## Usage

*   The backend API will be available at `http://localhost:8080`.
*   The frontend application will be available at `http://localhost:3000`.

## Troubleshooting Guide

### Frontend Issues

#### 1. "Cannot GET /" Error

**Problem:** When accessing the frontend at `http://localhost:3000`, you see a "Cannot GET /" error.

**Possible Causes and Solutions:**

*   **`index.html` Not Served:** Ensure that your `webpack.config.js` is configured to serve an `index.html` file. Use `html-webpack-plugin` to generate the HTML file.

    ```javascript
    // webpack.config.js
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      // ... other configuration ...
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
        }),
      ],
      // ... other configuration ...
    };
    ```

    Also, make sure that `public/index.html` exists.

*   **`historyApiFallback` Not Enabled:** Enable `historyApiFallback` in your `webpack.config.js` to handle routing correctly.

    ```javascript
    // webpack.config.js
    devServer: {
      historyApiFallback: true,
    }
    ```

*   **JavaScript-Only Frontend:** If your frontend is written entirely in JavaScript and you're not using an `index.html` file as a template, remove the `html-webpack-plugin` from your `webpack.config.js` file.

    ```javascript
    // webpack.config.js
    module.exports = {
      // ... other configuration ...
    };
    ```

    Ensure your `src/index.js` file renders your React application directly to the `document.body`.

    ```javascript
    // src/index.js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/App';

    ReactDOM.render(<App />, document.body);
    ```

    Set the `devServer.static.directory` to the root directory (`.`) or remove it altogether.

    ```javascript
    // webpack.config.js
    module.exports = {
      // ... other configuration ...
      devServer: {
        static: {
          directory: path.join(__dirname, '.'), // Serve from the root directory
        },
      },
      // ... other configuration ...
    };
    ```

*   **Incorrect `publicPath`:** Ensure that the `publicPath` in your `output` configuration is set correctly. If it's not set, try setting it to `'/'`.

    ```javascript
    // webpack.config.js
    module.exports = {
      // ... other configuration ...
      output: {
        publicPath: '/',
      },
      // ... other configuration ...
    };
    ```

#### 2. Module Not Found: Error: Can't resolve './src/index.js'

**Problem:** Webpack fails to find the entry point `src/index.js`.

**Possible Causes and Solutions:**

*   **Incorrect Path:** Verify that the `entry` point in your `webpack.config.js` is correctly set to `./src/index.js`.
*   **File Exists:** Ensure that the `src/index.js` file actually exists in your frontend directory.

#### 3. Module Parse Failed: Invalid Regular Expression Flag

**Problem:** Webpack fails to parse JavaScript files.

**Possible Causes and Solutions:**

*   **Missing Babel Loader:** Configure `babel-loader` in your `webpack.config.js` to handle JavaScript files.

    ```javascript
    // webpack.config.js
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    }
    ```

*   **Missing Babel Dependencies:** Install the necessary Babel dependencies.

    ```powershell
    npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
    ```

*   **Babel Configuration:** Create a `.babelrc` or `babel.config.js` file with the correct presets.

    ```json
    // .babelrc
    {
      "presets": ["@babel/preset-env", "@babel/preset-react"]
    }
    ```

*   **Hidden Characters:** Check for hidden or invisible characters in your `src/index.js` file. Open the file in a text editor that shows hidden characters and remove any unexpected characters, especially at the beginning of the file.

*   **File Encoding:** Ensure that your `src/index.js` file is saved with UTF-8 encoding.

#### 4. Webpack Dev Server Invalid Options

**Problem:** Webpack Dev Server throws an "Invalid Options" error.

**Possible Causes and Solutions:**

*   **Deprecated Options:** Remove deprecated options from your `webpack.config.js`. For example, replace `contentBase` with `static`.
*   **Incompatible Versions:** Ensure your `webpack`, `webpack-cli`, and `webpack-dev-server` versions are compatible.

#### 5. @babel/preset-env or @babel/preset-react Not Found

**Problem:** Babel fails to find the specified presets.

**Possible Causes and Solutions:**

*   **Missing Dependencies:** Install the missing Babel presets.

    ```powershell
    npm install --save-dev @babel/preset-env @babel/preset-react
    ```

*   **Incorrect Configuration:** Verify that your `.babelrc` or `babel.config.js` file correctly specifies the presets.

#### 6. SyntaxError: Adjacent JSX Elements Must Be Wrapped in an Enclosing Tag

**Problem:** React components are returning multiple JSX elements without a parent element.

**Possible Causes and Solutions:**

*   **Wrap JSX Elements:** Wrap the adjacent JSX elements in a single parent element, such as a `<div>`, `<>` (React Fragment), or any other valid HTML element.

    ```javascript
    function MyComponent() {
      return (
        <> {/* Use a React Fragment to wrap adjacent elements */}
          <h1>Title</h1>
          <p>Description</p>
        </>
      );
    }
    ```

#### 7. Module Not Found: Error: Can't Resolve 'style-loader'

**Problem:** Webpack fails to resolve `style-loader`.

**Possible Causes and Solutions:**

*   **Missing Dependencies:** Install the missing dependencies.

    ```powershell
    npm install --save-dev style-loader css-loader
    ```

### Backend Issues

#### 1. JAVA_HOME Not Found

**Problem:** Maven fails to build due to `JAVA_HOME` not being set.

**Possible Causes and Solutions:**

*   **Set `JAVA_HOME`:** Set the `JAVA_HOME` environment variable to the correct path of your Java installation.

    ```powershell
    $Env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
    ```

*   **Invalid `JAVA_HOME`:** Ensure that the directory specified in `JAVA_HOME` actually exists.

#### 2. Unable to Obtain Lock File Access

**Problem:** Chocolatey fails to install Maven due to a lock file access issue.

**Possible Causes and Solutions:**

*   **Run as Administrator:** Run the command prompt or PowerShell as an Administrator.
*   **Remove Lock Directory Manually:**

    ```powershell
    Remove-Item -Path 'C:\ProgramData\chocolatey\lib-bad' -Recurse -Force
    Remove-Item -Path 'C:\ProgramData\chocolatey\lib\<some_id>' -Recurse -Force
    ```

#### 3. Failed to Execute Goal org.apache.maven.plugins:maven-resources-plugin

**Problem:** Maven fails to find the resources directory.

**Possible Causes and Solutions:**

*   **Create Resources Directory:** Ensure that the `src/main/resources` directory exists in your backend project.

    ```powershell
    mkdir -p src/main/resources
    ```

#### 4. Cannot Find Symbol SpringApplication

**Problem:** Maven fails to compile due to missing `SpringApplication` symbol.

**Possible Causes and Solutions:**

*   **Missing Spring Boot Dependency:** Ensure that your `pom.xml` includes the Spring Boot starter dependency.

    ```xml
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    ```

*   **Missing Import:** Ensure that your Java class has the correct import statement.

    ```java
    import org.springframework.boot.SpringApplication;
    ```

### Docker-Related Issues

#### 1. Port Mapping

**Problem:** The application is running inside Docker, but you cannot access it from your host machine.

**Possible Causes and Solutions:**

*   **Incorrect Port Mapping:** Verify that your `docker-compose.yml` file correctly maps the ports.

    ```yaml
    services:
      frontend:
        ports:
          - "3000:3000"
    ```

#### 2. Changes Not Reflected

**Problem:** Changes made to the source code are not reflected in the running application.

**Possible Causes and Solutions:**

*   **Rebuild Docker Images:** Rebuild your Docker images after making changes.

    ```powershell
    docker-compose build
    docker-compose up -d
    ```

*   **Docker Cache:** Clear the Docker cache to ensure that the latest changes are used.

### General Tips

*   **Check Container Logs:** Use `docker-compose logs <container_name>` to check for errors in your containers.
*   **Clean and Rebuild:** Clean your project and rebuild it to ensure that all dependencies are correctly resolved.
*   **Verify Versions:** Ensure that all your dependencies (Node.js, npm, Java, Maven, etc.) are compatible with each other.

By following these troubleshooting steps, you should be able to resolve most common issues encountered when setting up a Java backend with a JavaScript frontend.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License.