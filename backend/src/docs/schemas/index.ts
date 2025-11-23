import codeSchemas  from "./response/code-response.schema";
import userSchemas  from "./models/user/user.schema";
import paginateSchemas  from "./response/paginate.schema";
import authRequestSchemas  from "./request/auth.schema";
import adminRequestSchemas  from "./request/admin.schema";
import userRequestSchemas  from "./request/user.schema";

export default {
    ...authRequestSchemas,
    ...codeSchemas,
    ...userSchemas,
    ...paginateSchemas,
    ...adminRequestSchemas,
    ...userRequestSchemas
};