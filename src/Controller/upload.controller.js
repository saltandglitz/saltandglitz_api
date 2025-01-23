const { Uplod } = require("../Model")

module.exports.filterProducts = async (req, res) => {
    try {
        const { title, priceLimit, sortBy, priceOrder, discountLimit, typeBy, shopFor, occasionBy } = req.body

        if (!title && !priceLimit && !sortBy && !priceOrder && !discountLimit && !typeBy && !shopFor && !occasionBy) {
            return res.status(404).json({
                message: "At least one filter parameter (priceLimit, sortBy, priceOrder, discountRange, typeBy, shopFor, occasionBy) required"
            })
        }

        let filterProduct = {};

        if (title) filterProduct.title = title;
        if (occasionBy) { filterProduct.subCategory = occasionBy; }

        if (typeBy) {
            if (typeBy === "male") {
                filterProduct.gender = "Male";
            } else if (typeBy === "female") {
                filterProduct.gender = "Female";
            } else {
                return res.status(400).json({
                    message: "Invalid gender type provided"
                });
            }
        }


        let aggrigationPipeline = [{ $match: filterProduct }]

        if (priceLimit) {
            let priceRange;
            if (priceLimit === "below20k") {
                priceRange = { total14KT: { $lt: 20000 } }
            }
            if (priceLimit === "20kTo30k") {
                priceRange = { total14KT: { $gte: 20000, $lte: 30000 } }
            }
            if (priceLimit === "30kTo50k") {
                priceRange = { total14KT: { $gte: 30000, $lte: 50000 } }
            }
            if (priceLimit === "50kTo100k") {
                priceRange = { total14KT: { $gte: 50000, $lte: 100000 } }
            }
            if (priceLimit === "100kTo200k") {
                priceRange = { total14KT: { $gte: 100000, $lte: 200000 } }
            }
            if (priceLimit === "200kTo300k") {
                priceRange = { total14KT: { $gte: 200000, $lte: 300000 } }
            }
            if (priceLimit === "300kTo500k") {
                priceRange = { total14KT: { $gte: 300000, $lte: 500000 } }
            }
            if (priceLimit === "above500k") {
                priceRange = { total14KT: { $gt: 500000 } }
            }

            if (priceRange) {
                aggrigationPipeline.push({ $match: priceRange })
            }
        }

        if (discountLimit) {
            let discountRange;
            if (discountLimit === "morethen50%") {
                discountRange = { discount: { $gte: 50 } }
            }
            if (discountLimit === "between40%to50%") {
                discountRange = { discount: { $lt: 50, gte: 40 } }
            }
            if (discountLimit === "between30%To40%") {
                discountRange = { discount: { $lt: 30, $gte: 40 } }
            }
            if (discountLimit === "between30%to20%") {
                discountRange = { discount: { $lt: 20, $gte: 30 } }
            }

            if (discountRange) {
                aggrigationPipeline.push({ $match: discountRange })
            }
        }

        if (sortBy === "newestFirst") {
            aggrigationPipeline.push({ $sort: { createdAt: -1 } })
        }

        if (priceOrder) {
            if (priceOrder === "lowToHigh") {
                aggrigationPipeline.push({ $sort: { total14KT: 1 } })
            }
            if (priceOrder === "highToLow") {
                aggrigationPipeline.push({ $sort: { total14KT: -1 } })
            }
        }



        let products = await Uplod.aggregate(aggrigationPipeline)

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found matching the filters"
            });
        }

        const updatedProducts = products.map(product => {
            const { _id, ...body } = product;
            return { product_id: _id, ...body };
        });

        res.status(200).json({
            message: "get filterProduct successfully",
            updatedProducts
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}


// // earring ring nacless braclet



// const Upload = require("../Model/upload");

// module.exports.filterProducts = async (req, res) => {
//     try {
//         const { title, PriceLimit, sortBy, priceOrder, discountRange, typeBy, shopFor, occasionBy } = req.body;

//         // Ensure at least one filter is provided
//         if (!title && !PriceLimit && !sortBy && !priceOrder && !discountRange && !typeBy && !shopFor && !occasionBy) {
//             return res.status(404).json({
//                 message: "At least one filter parameter (title, PriceLimit, sortBy, priceOrder, discountRange, typeBy, shopFor, occasionBy) required"
//             });
//         }

//         // Build filter object dynamically based on provided filters
//         let filterProduct = {}

//         if (title) filterProduct.title = title;

//         let aggrigationPipeline = [{ $match: filterProduct }];

//         let products = await Upload.aggregate(aggrigationPipeline);

//         if (products.length === 0) {
//             return res.status(404).json({
//                 message: "No products found matching the filters"
//             });
//         }

//         res.status(200).json({
//             message: "Filter products retrieved successfully",
//             products
//         });
//     } catch (err) {
//         return res.status(500).json({ err: err.message });
//     }
// };
