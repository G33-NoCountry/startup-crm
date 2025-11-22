import authSchemas  from "./auth/auth.schema";
import codeSchemas  from "./response/code-response.schema";
import userSchemas  from "./user/user.schema";
import paginateSchemas  from "./response/paginate.schema";

export default {
    ...authSchemas,
    ...codeSchemas,
    ...userSchemas,
    ...paginateSchemas,
};