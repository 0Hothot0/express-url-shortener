import { eq } from "drizzle-orm"
import { nanoid } from "nanoid";

export default class {
    constructor(db, table) { // 初始化成物件，把db當參數傳入
        this.db = db; // this是用來存取物件本身的屬性
        this.table = table;
    }

    async create(origin) {
        await this
            .db
            .insert(this.table)
            .values({
                origin,
                short: nanoid(10) //因在shema那設定short的長度是10
            })
        const result = await this
            .db
            .select()
            .from(this.table)
            .where(eq(this.table.origin, origin))
            .limit(1)
        return result.at(0);
    }

    async getOriginFromShort(short) {
        const result = await this
            .db
            .select()
            .from(this.table)
            .where(eq(this.table.short, short))
            .limit(1);
        return result.at(0);
    }
}
