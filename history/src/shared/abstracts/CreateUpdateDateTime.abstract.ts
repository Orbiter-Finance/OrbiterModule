import { Column } from "typeorm";

export default abstract class CreateUpdateDateTimeAbstract {
  @Column({ type: "datetime", default: null, comment: "createdAt" })
  createdAt: string;

  @Column({ type: "datetime", default: null, comment: "updatedAt" })
  updatedAt: string;
};
