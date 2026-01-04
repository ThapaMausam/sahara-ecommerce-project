import { Column, DataType, Model, Table } from "sequelize-typescript";
import { OrderStatus } from "../../global/globalType.js";


@Table({
    tableName: "orders",
    modelName: "order",
    timestamps: true
})
class Order extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare orderId: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10, 10],
                msg: "Phone number should be 10 digits"
            }
        }
    })
    declare phoneNumber: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare shippingAddress: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare totalAmount: number

    @Column({
        type: DataType.ENUM(OrderStatus.Cancelled, OrderStatus.Delivered, OrderStatus.Ontheway, OrderStatus.Pending, OrderStatus.Preparation),
        defaultValue: OrderStatus.Pending
    })
    declare orderStatus: string
}

export default Order