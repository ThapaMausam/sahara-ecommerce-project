// Takes model such as User, Product and takes query such as email
async function findData(model: any, query: string) {
    const [user] = await model.findAll({
        where: {
            email: query
        }
    })
    return user
}

export default findData