import { Column, DataType, Model, Table } from "sequelize-typescript";
import { PaymentMethod, PaymentStatus } from "../../global/globalType.js";

@Table({
    tableName: "payments",
    modelName: "Payment",
    timestamps: true
})
class Payment extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4
    })
    declare paymentId: string

    @Column({
        type: DataType.ENUM(
            PaymentMethod.COD,
            PaymentMethod.Esewa,
            PaymentMethod.Khalti,
        ),
        defaultValue: PaymentMethod.COD
    })
    declare paymentMethod: string
    
    @Column({
        type: DataType.ENUM(
            PaymentStatus.Paid,
            PaymentStatus.Unpaid,
        ),
        defaultValue: PaymentStatus.Unpaid
    })
    declare paymentStatus: string
}

export default Payment