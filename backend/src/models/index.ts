import { sequelize } from "../config/database.config";
import Contact from "./contact.model";
import Conversation from "./conversation.model";
import Deal from "./deal.model";
import FunnelStage from "./funnel-stage.model";
import Message from "./message.model";
import Tag from "./tag.model";
import Task from "./task.model";
import Template from "./template.model";
import User from "./user.model";

export const setupAssociations = () => {

  // User - Task relationship
  User.hasMany(Task, { foreignKey: "user_id", as: "tasks" });
  Task.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // User - Deal relationship
  User.hasMany(Deal, { foreignKey: "user_id", as: "deals" });
  Deal.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // User - Template relationship
  User.hasMany(Template, { foreignKey: "user_id", as: "templates" });
  Template.belongsTo(User, { foreignKey: "user_id", as: "user" });

  // User - Message relationship (COMPLETAR)

  // Contact - Conversation relationship
  Contact.hasMany(Conversation, { foreignKey: "contact_id", as: "conversations" });
  Conversation.belongsTo(Contact, { foreignKey: "contact_id", as: "contact" });

  // Contact - Deal relationship
  Contact.hasMany(Deal, { foreignKey: "contact_id", as: "deals" });
  Deal.belongsTo(Contact, { foreignKey: "contact_id", as: "contact" });

  // Contact - Task relationship
  Contact.hasMany(Task, { foreignKey: "contact_id", as: "tasks" });
  Task.belongsTo(Contact, { foreignKey: "contact_id", as: "contact" });

  // Contact - Message relationship (COMPLETAR)

  // Deal - Task relationship
  Deal.hasMany(Task, { foreignKey: "deal_id", as: "tasks" });
  Task.belongsTo(Deal, { foreignKey: "deal_id", as: "deal" });

  // Conversation - Message relationship
  Conversation.hasMany(Message, { foreignKey: "conversation_id", as: "messages" });
  Message.belongsTo(Conversation, { foreignKey: "conversation_id", as: "conversation" });

  // FunnelStage - Deal relationship
  FunnelStage.hasMany(Deal, { foreignKey: "funnel_stage_id", as: "deals" });
  Deal.belongsTo(FunnelStage, { foreignKey: "funnel_stage_id", as: "funnel_stage" });

  // Deal - DealTag relationship
  Deal.belongsToMany(Tag, {
    through: "deal_tag",
    foreignKey: "deal_id",
    otherKey: "tag_id",
    as: "tags"
  });

  // Tag - DealTag relationship
  Tag.belongsToMany(Deal, {
    through: "deal_tag",
    foreignKey: "tag_id",
    otherKey: "deal_id",
    as: "deals"
  });

  // Contact - ContactTag relationship
  Contact.belongsToMany(Tag, {
    through: "contact_tag",
    foreignKey: "contact_id",
    otherKey: "tag_id",
    as: "tags"
  });

  // Tag - ContactTag relationship
  Tag.belongsToMany(Contact, {
    through: "contact_tag",
    foreignKey: "tag_id",
    otherKey: "contact_id",
    as: "contacts"
  });

};

export {
  sequelize,
  User,
  Template,
  Contact,
  Conversation,
  FunnelStage,
  Task,
  Deal,
  Tag,
  Message
};

export default {
  sequelize,
  User,
  Template,
  Contact,
  Conversation,
  FunnelStage,
  Task,
  Deal,
  Tag,
  Message
};
