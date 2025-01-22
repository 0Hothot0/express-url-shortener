//這邊寫什麼table就會長那樣
import { Table } from "drizzle-orm";
import { index, pgTable, varchar } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
  short: varchar(10).primaryKey(),
  origin: varchar(255).notNull(),
},(table)=>{
  return{
    originIdx:index("origin_idx").on(table.origin)
  }
});// 有unique的屬性的，本身就有index的性能（這裡的short就是unique）
