import { Task } from "../models";
import { IPaginatableRepository } from "./paginate.interface";

export interface ITaskRepository extends IPaginatableRepository<Task> { }