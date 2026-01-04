import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "orderDetails",
    modelName: "OrderDetails",
    timestamps: true
})
class OrderDetails extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare orderDetailsId: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare quantity: number
}

export default OrderDetails