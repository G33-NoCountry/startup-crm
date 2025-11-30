import { Task } from "../models";
import { ICrudBase } from "./crud-base.interface";

export interface ITaskRepository extends ICrudBase<Task> { }