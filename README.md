# Own Nest

## Description

Own Nest is a backend project built using TypeScript and Node.js. It aims to provide a simple and efficient way to define and handle HTTP routes using decorators. This project demonstrates how to create a lightweight framework for building RESTful APIs.

## Project Structure

- **src/models/route.model.ts**: Defines the `Route` interface and related types used to represent routes in the application.
- **src/decorators/define-routes.ts**: Provides decorators (`Get`, `Post`, `Put`, `Delete`) to define routes and associate them with controller methods.
- **src/decorators/query-param.ts**: Defines the `QueryParam` decorator to extract query parameters from the request URL.
- **src/server/server.ts**: Sets up the HTTP server and defines the logic to handle incoming requests by matching them to the defined routes and invoking the appropriate controller methods.

## Why This Project

This project was constructed to explore and demonstrate the use of TypeScript decorators for defining and handling HTTP routes in a Node.js application. It showcases how to create a simple and maintainable structure for building RESTful APIs without relying on external frameworks.

## License

This project is licensed under the MIT License.