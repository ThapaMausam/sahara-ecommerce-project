import type { Request, Response } from "express";
import sendResponse from "../services/sendResponse.js";
import Product from "../database/models/productModel.js";
import Category from "../database/models/categoryModel.js";
import fs from "fs"

class ProductController {

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const { productTitle, productDescription, productPrice, productStock, productDiscount, categoryId } = req.body

            if (!productTitle || !productDescription || !productPrice || !productStock || !productDiscount || !categoryId) {
                sendResponse(res, 400, "Please enter all product details")
                return
            }

            console.log(req.file)

            const filename = req.file ? req.file.filename : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s"
    
            await Product.create({
                productTitle: productTitle.trim(),
                productDescription,
                productPrice,
                productStock,
                productDiscount,
                categoryId,
                productImageUrl: filename
            })
    
            sendResponse(res, 200, "Product. created successfully")
            
        } catch (error) {
            sendResponse(res, 500, "Failed to create product", error)
        }
    }

    async getAllProduct(req: Request, res: Response) {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ['categoryId', 'categoryName']
                    }
                ]
            })

            if (products.length == 0) {
                sendResponse(res, 404, "No product found")
                return
            }

            sendResponse(res, 200, "Products fetched successfully", products)
        } catch (error) {
            sendResponse(res, 500, "Failed to fetch products", error)
        }
    }

    async getSingleProduct(req: Request, res: Response) {
        try {
            const { productId } = req.params
            const product = await Product.findAll({
                where: {
                    productId
                }, 
                include: [{
                    model: Category,
                    attributes: ['categoryId', 'categoryName']
                }]
            })

            if (product.length == 0) {
                sendResponse(res, 404, "Product doesn't exist")
                return
            }

            sendResponse(res, 200, "Product fetched successfully", product)
        } catch (error) {
            sendResponse(res, 500, "Failed to fetch the product", error)
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const { productId } = req.params

            const product = await Product.findByPk(productId)

            if (!product) {
                sendResponse(res, 404, "Product with that id doesn't exist")
                return
            }

            const imageName = product.productImageUrl

            if (imageName) {
                const imagePath = `./src/uploads/${imageName}`

                fs.unlink(imagePath, (err) => {
                    if (err) {
                        sendResponse(res, 500, "Failed to delete image")
                    }
                })
            }

            await Product.destroy({
                where: {
                    productId
                }
            })

            sendResponse(res, 200, "Product deleted successfully")
        } catch (error) {
            sendResponse(res, 500, "Failed to delete product", error)
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const { productId } = req.params
            
            const product = await Product.findByPk(productId)

            if (!product) {
                sendResponse(res, 404, "Product with that id doesn't exist")
            }

            const { productTitle, productDescription, productPrice, productStock, productDiscount, categoryId } = req.body

            const filename = req.file?.filename

            if (!productTitle || !productDescription || !productPrice || !productStock || !productDiscount || !categoryId || !filename) {
                sendResponse(res, 400, "Please enter valid details")
                return
            }
            
            await Product.update(
                {
                    productTitle: productTitle.trim(),
                    productDescription,
                    productPrice,
                    productStock,
                    productDiscount,
                    categoryId,
                    productImageUrl: filename
                },
                {
                    where: {productId}
                }
            )

            sendResponse(res, 200, "Product updated successfully")
        } catch (error) {
            sendResponse(res, 500, "Failed to update product", error)
        }
    }
}

const productController = new ProductController()
export default productController