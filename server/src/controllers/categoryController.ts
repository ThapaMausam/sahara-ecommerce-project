import Category from "../database/models/categoryModel.js"


class CategoryController {
    categoryData = [ // To access this variable in static method it needs to be static
        {
            categoryName: "Electronics"
        },
        {
            categoryName: "Groceries"
        },
        {
            categoryName: "Food"
        }
    ]

    async seedCategory() { // By default Promise<Void>
        const data = await Category.findAll() // returns array

        if (data.length == 0) {
            await Category.bulkCreate(this.categoryData)

            console.log("Catagory seeded successfully.")
        } else {
            console.log("Category already seeded.")
        }
    }
}

export default new CategoryController