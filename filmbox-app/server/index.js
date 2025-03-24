import { config } from "dotenv";
import { executeAdminCrudOperations } from "./adminCrud.js";

config();
await executeAdminCrudOperations();
