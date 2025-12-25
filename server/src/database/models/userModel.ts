// In simple terms, decorators add features to your classes, methods, or properties without changine the original code.

// In prog terms, decorators is a special function that takes something (class, method or property) and adds extra behavior or metadata to it and returns the enhanced version

/* Syntax: 
@DecoratorName
class MyClass {}
*/

// DataType is a Enum
// Model is a base class containing ORM methods
import { Table, Column, Model, DataType } from 'sequelize-typescript' // Table is a class decorator and Column is a property decorator

// Table Configuration
@Table({
    tableName: "users", // Explicitly set SQL table name to users, without it it would pluralize User
    modelName: "User",
    timestamps: true // adds createdAt and updatedAt columns in the table
})
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID, // Universally Unique Identifier
        defaultValue: DataType.UUIDV4 // Automatically generates new UUID if not provided
    })
    declare id: string // Tells TS to wait, it will be created by sequelize

    @Column({
        type: DataType.STRING // Maps to VARCHAR(255)
    })
    declare username: string

    @Column({
        type: DataType.STRING
    })
    declare email: string

    @Column({
        type: DataType.STRING
    })
    declare password: string

    @Column({
        type: DataType.ENUM("customer", "admin"),
        defaultValue: "customer"
    })
    declare role: string
}

export default User

// Resulting SQL Table Schema (PostgreSQL Example)
/* CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255) CHECK (role IN ('customer', 'admin')) DEFAULT 'customer',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
); */