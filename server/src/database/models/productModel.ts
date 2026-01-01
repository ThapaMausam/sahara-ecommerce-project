import { Table, Column, Model, DataType } from "sequelize-typescript"

// Table is the class decorator for class Product
@Table({
    tableName: "products",
    modelName: "Product",
    timestamps: true
})
class Product extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare productId: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare productTitle: string

    @Column({
        type: DataType.STRING
    })
    declare productDescription: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare productPrice: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare productStock: number

    @Column({
        type: DataType.INTEGER
    })
    declare productDiscount: number

    @Column({
        type: DataType.STRING,
    })
    declare productImageUrl: string
}

export default Product