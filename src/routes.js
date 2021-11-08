import { Router } from "express";

import sessions from "./app/controllers/SessionsController";
import customers from "./app/controllers/CustomersController";
import contacts from "./app/controllers/ContactsController";
import users from "./app/controllers/UsersController";

const routes = new Router();

// sessions
routes.post("/sessions", sessions.create);

// customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

// customers/1/contacts
routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/contacts", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.destroy);

// users
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

export default routes;
