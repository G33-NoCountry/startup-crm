import codeSchemas from "./response/code-response.schema";
import userSchemas from "./models/user/user.schema";
import paginateSchemas from "./response/paginate.schema";
import authRequestSchemas from "./request/auth.schema";
import adminRequestSchemas from "./request/admin.schema";
import userRequestSchemas from "./request/user.schema";
import contactSchemas from "./models/contact/contact.schema";
import contactRequestSchemas from "./request/contact.schema";
import dealSchema from "./models/deal/deal.schema";
import conversationSchema from "./models/conversation/conversation.schema";
import conversationRequestSchema from "./request/conversation.schema";
import taskRequestSchema from "./request/task.schema";
import taskSchema from "./models/task/task.schema";
import tagSchema from "./models/tag/tag.schema";
import tagRequestSchema from "./request/tag.schema";
import metricschema from "./models/metrics/metrics.schema";
import funnelStageSchema from "./models/funnel-stage/funnel-stage.schema";
import funnelStageRequestSchema from "./request/funnel-stage.schema";
import templateRequestSchema from "./request/template.schema";
import templateSchema from "./models/template/template.schema";
import messageSchema from "./models/message/message.schema";

export default {
    ...authRequestSchemas,
    ...codeSchemas,
    ...userSchemas,
    ...paginateSchemas,
    ...adminRequestSchemas,
    ...userRequestSchemas,
    ...contactSchemas,
    ...contactRequestSchemas,
    ...dealSchema,
    ...conversationSchema,
    ...conversationRequestSchema,
    ...taskSchema,
    ...taskRequestSchema,
    ...tagSchema,
    ...tagRequestSchema,
    ...metricschema,
    ...funnelStageSchema,
    ...funnelStageRequestSchema,
    ...templateRequestSchema,
    ...templateSchema,
    ...messageSchema
};