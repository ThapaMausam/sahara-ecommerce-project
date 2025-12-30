import type { Request, Response } from "express"
import Category from "../database/models/categoryModel.js"
import sendResponse from "../services/sendResponse.js"


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

    async seedCategory(): Promise<void> { // By default Promise<Void>
        const data = await Category.findAll() // returns array

        if (data.length == 0) {
            await Category.bulkCreate(this.categoryData)

            console.log("Catagory seeded successfully.")
        } else {
            console.log("Category already seeded.")
        }
    }

    async addCategory(req: Request, res: Response): Promise<void> {
        try {
            // Extract data from req
            const { categoryName } = req.body

            // Validate input
            if (!categoryName || categoryName.trim() === '') {
                sendResponse(res, 400, "Please provide a valid category name")
                return
            }

            // Store new category
            await Category.create({
                categoryName: categoryName.trim()
            })

            sendResponse(res, 200, "Category created successfully")  

        } catch (error) {
            console.log("Error creating category: ", error)

            sendResponse(res, 500, "Failed to create category")
        }
    }

    async getCategories(req: Request, res: Response): Promise<void> {
        try {
            // Fetch from database
            const categories = await Category.findAll() // Returns array

            if (categories.length === 0) {
                sendResponse(res, 200, "No categories found", [])
                return
            }

            sendResponse(res, 200, "Data fetched successfully", categories)
        } catch (error) {
            console.log("Failed to fetch categories: ", error)

            sendResponse(res, 500, "Failed to fetch categories")
        }
    }

    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId } = req.params
    
            if (!categoryId) {
                sendResponse(res, 400, "Please provide Id")
                return
            }
    
            const category = await Category.findAll({
                where: {
                    categoryId
                }
            })
    
            if (category.length == 0) {
                sendResponse(res, 404, "Category with that Id doesn't exist")
                return
            }
            
            await Category.destroy({
                where: {
                    categoryId
                }
            })

            sendResponse(res, 200, "Category deleted successfully")
        } catch (error) {
            console.log("Failed to delete category: ", error)

            sendResponse(res, 500, "Failed to delete category")
        }
    }
}

export default new CategoryController