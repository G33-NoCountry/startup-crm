import authSchemas  from "./request/auth/auth.schema";
import codeSchemas  from "./response/code-response.schema";
import userSchemas  from "./models/user/user.schema";
import paginateSchemas  from "./response/paginate.schema";
import adminSchemas  from "./request/admin/admin.schema";

export default {
    ...authSchemas,
    ...codeSchemas,
    ...userSchemas,
    ...paginateSchemas,
    ...adminSchemas
};