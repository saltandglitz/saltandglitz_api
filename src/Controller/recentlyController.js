// const { recentlyViewedSchema } = require("../Model");

// module.exports.getRecently = async (req, res) => {
//     const { userId } = req.params;
//     try {
//         const data = await recentlyViewedSchema.findOne({ userId });
//         if (!data) return res.json({ items: [] });
//         res.json(data.items);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching recently viewed items.' });
//     }
// }

// module.exports.createRecently = async (req, res) => {
//     try {
//         const { userId, item } = req.body;

//         // console.log('Request Body:', req.body); // Log request data for debugging

//         if (!userId || !item) {
//             return res.status(400).json({ message: 'Missing userId or item data.' });
//         }

//         let user = await recentlyViewedSchema.findOne({ userId });

//         // Create a new document if it doesn't exist
//         if (!user) {
//             user = new recentlyViewedSchema({ userId, recentlyViewed: [] });
//         }

//         user.recentlyViewed = user.recentlyViewed || [];
//         user.recentlyViewed.unshift(item);

//         // Ensure only 8 items are stored
//         if (user.recentlyViewed.length > 8) {
//             user.recentlyViewed.pop();
//         }

//         await user.save();

//         res.status(200).json({ message: 'Item saved successfully.' });
//     } catch (error) {
//         console.error('Error saving recently viewed item:', error);
//         res.status(500).json({ message: 'Error saving recently viewed item.' });
//     }
// };
