// const { Uplod } = require("../Model");

// module.exports.getCategoryData = async (req, res) => {
//     try {
//         const { category } = req.params;

//         if (!category) {
//             return res.status(400).json({ message: "Category is required." });
//         }

//         const categories = await Uplod.distinct("category");

//         return res.status(200).json({
//             message: "category fetched successfully.",
//             categories
//         });

//     } catch (err) {
//         res.status(500).json({ message: "Error processing your request.", error: err.message });
//     }
// };


const { default: axios } = require("axios");
const { Uplod, wishlistSchema, cartSchema } = require("../Model");
// const { getBanner } = require("./banner.controller");

// let { category } = req.params

// module.exports.getCategoryData = async (req, res) => {
//     try {
//         const categories = await Uplod.distinct("category");
//         const genders = await Uplod.distinct("gender");

//         return res.status(200).json({
//             message: "Category and gender fetched successfully.",
//             categories,
//             genders
//         });

//     } catch (err) {
//         res.status(500).json({ message: "Error processing your request.", error: err.message });
//     }
// };

// module.exports.getCategories = async (req, res) => {
//     try {
//         const { gender, category } = req.params;

//         // Default to "Female" if gender is not provided
//         const selectedGender = gender || "Female";

//         // Log the parameters to verify they are coming as expected
//         console.log("Selected Gender: ", selectedGender);
//         console.log("Category: ", category);

//         if (category) {
//             // Fetch the subcategories for the selected gender and category
//             const subcategories = await Uplod.find(
//                 { gender: selectedGender, category: category },
//                 { subCategory: 1 }
//             ).distinct("subCategory");

//             // Log the fetched subcategories for debugging
//             console.log("Fetched Subcategories: ", subcategories);

//             // If no subcategories found, return an appropriate message
//             if (subcategories.length === 0) {
//                 return res.status(404).json({
//                     message: `No subcategories found for ${selectedGender} category: ${category}.`,
//                     subcategories: [],
//                 });
//             }

//             // Return the subcategories if found
//             return res.status(200).json({
//                 message: `${selectedGender} category: ${category} subcategories fetched successfully.`,
//                 subcategories,
//             });
//         } else {
//             // If no category is provided, fetch all categories for the selected gender
//             const categories = await Uplod.distinct("category", { gender: selectedGender });

//             return res.status(200).json({
//                 message: `${selectedGender} categories fetched successfully.`,
//                 categories,
//             });
//         }

//     } catch (err) {
//         console.error("Error: ", err.message);
//         res.status(500).json({ message: "Error processing your request.", error: err.message });
//     }
// };
module.exports.getCategoryData = async (req, res) => {
    try {

        const { gender = "Female" } = req.params;

        let categories = [];
        let mergedProducts = [];

        // Step 1: Fetch cart data based on gender
        let getCart = await cartSchema.aggregate([
            {
                $unwind: "$quantity"
            },
            {
                $addFields: {
                    "quantity.productId": {
                        $toObjectId: "$quantity.productId"
                    }
                }
            },
            {
                $group: {
                    _id: "$quantity.productId"
                }
            },
            {
                $lookup: {
                    from: "uploads",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $match: { "productDetails.gender": gender } // Filter by gender here
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    title: "$productDetails.title",
                    price14KT: "$productDetails.price14KT",
                    image01: "$productDetails.image01",
                    category: "$productDetails.category",
                    subCategory: "$productDetails.subCategory"
                }
            }
        ]);

        // Step 2: Fetch wishlist data based on gender
        let getWishlist = await wishlistSchema.aggregate([
            {
                $unwind: "$products"
            },
            {
                $addFields: {
                    "products.productId": {
                        $toObjectId: "$products.productId"
                    }
                }
            },
            {
                $group: {
                    _id: "$products.productId"
                }
            },
            {
                $lookup: {
                    from: "uploads",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $match: { "productDetails.gender": gender } // Filter by gender here
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    title: "$productDetails.title",
                    price14KT: "$productDetails.price14KT",
                    image01: "$productDetails.image01",
                    category: "$productDetails.category",
                    subCategory: "$productDetails.subCategory"
                }
            }
        ]);

        // Merge cart and wishlist based on gender
        mergedProducts = [...getCart, ...getWishlist];

        // Ensure mergedProducts follow the category structure
        mergedProducts = mergedProducts.map(product => {
            return {
                category: product.category,
                categoryImage: product.image01, // assuming image01 represents category image
                subCategories: {
                    [product.subCategory]: [product]
                }
            };
        });

        // Step 3: Fetch categories based on gender
        if (gender === "Male") {
            const maleCategories = await Uplod.distinct("category", { gender: "Male" });

            const maleCategoryDetails = [];
            for (let category of maleCategories) {
                const categoryData = await Uplod.aggregate([
                    { $match: { gender: "Male", category } },
                    {
                        $group: {
                            _id: "$category",
                            categoryImage: { $first: "$image01" },
                            subCategories: {
                                $push: {
                                    subCategory: "$subCategory",
                                    product: "$$ROOT"  // Push the entire product document
                                }
                            }
                        }
                    }
                ]);
                if (categoryData.length > 0) {
                    const subCategoryGroups = categoryData[0].subCategories.reduce((acc, { subCategory, product }) => {
                        if (!acc[subCategory]) {
                            acc[subCategory] = [];
                        }
                        acc[subCategory].push(product);
                        return acc;
                    }, {});

                    maleCategoryDetails.push({
                        category: categoryData[0]._id,
                        categoryImage: categoryData[0].categoryImage,
                        ...subCategoryGroups
                    });
                }
            }

            categories = maleCategoryDetails;
        } else if (gender === "Female") {
            const femaleCategories = await Uplod.distinct("category", { gender: "Female" });

            const femaleCategoryDetails = [];
            for (let category of femaleCategories) {
                const categoryData = await Uplod.aggregate([
                    { $match: { gender: "Female", category } },
                    {
                        $group: {
                            _id: "$category",
                            categoryImage: { $first: "$image01" },
                            subCategories: {
                                $push: {
                                    product: "$$ROOT"
                                }
                            }
                        }
                    }
                ]);
                if (categoryData.length > 0) {
                    const subCategoryGroups = categoryData[0].subCategories.reduce((acc, { subCategory, product }) => {
                        if (!acc[subCategory]) {
                            acc[subCategory] = [];
                        }
                        acc[subCategory].push(product);
                        return acc;
                    }, {});

                    femaleCategoryDetails.push({
                        category: categoryData[0]._id,
                        categoryImage: categoryData[0].categoryImage,
                        ...subCategoryGroups
                    });
                }
            }

            categories = femaleCategoryDetails;
        }

        // Step 4: Fetch banners
        const bannerResponse = await axios.get("https://saltandglitz-api.vercel.app/v1/banner/bannerGet");
        let banner = bannerResponse.data.banners;

        

        return res.status(200).json({
            message: `Category data fetched successfully for ${gender.toLowerCase()}s.`,
            categories,
            genders: gender === "Female" ? ["Female", "Male"] : undefined,
            banners: banner || [],
            mergedProducts
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Error processing your request.", error: err.message });
    }
};

