const Blog = require("../models/Blog");
const Topic = require("../models/Topic");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/error");



exports.addBlog = async (req, res, next) => {
    console.log("Hii");
    try {
        const { title, content, topics, newTopics } = req.body;
        const { _id } = req.user;

        // Create new topics if provided
        if (newTopics && newTopics.length > 0) {
            const createdTopics = await Promise.all(newTopics.map(async (topicName) => {
                return await Topic.create({ topic: topicName });
            }));

            // Add the newly created topics to the blog
            topics.push(...createdTopics.map((topic) => topic._id));
        }
        const blog = await Blog.create({
            title,
            content,
            author: _id,
            topics: topics || [],
        });

        res.status(201).json({ blog });
    } catch (error) {
        next(error);
    }
};


exports.updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params; // Assuming you pass the blog ID in the URL
        const { title, content, topics, newTopics } = req.body;

        // Update the blog
        const blog = await Blog.findByIdAndUpdate(id, {
            title,
            content,
            topics: topics || [], // Assuming topics is an array of topic IDs
        }, { new: true });

        // Create new topics if provided
        if (newTopics && newTopics.length > 0) {
            const createdTopics = await Promise.all(newTopics.map(async (topicName) => {
                return await Topic.create({ topic: topicName });
            }));

            // Add the newly created topics to the blog
            blog.topics.push(...createdTopics.map((topic) => topic._id));
            await blog.save();
        }

        res.json({ blog });
    } catch (error) {
        next(error);
    }
};

exports.deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndRemove(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};


exports.getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate('topics', 'topic');

        res.json({ blogs });
    } catch (error) {
        next(error);
    }
};

exports.userIntrest = async (req, res, next) => {
    try {
        const { interestedTopics, page = 1, perPage = 10, search } = req.query;
        const pageNumber = parseInt(page);
        const perPageNumber = parseInt(perPage);

        if (!interestedTags || !Array.isArray(interestedTags)) {
            return res.status(400).json({ error: 'Invalid or missing interestedTags parameter.' });
        }

        const skip = (pageNumber - 1) * perPageNumber;

        // Construct the query to include both full-text search and tag filtering
        const query = {
            $and: [
                { topics: { $in: interestedTopics} },
                search ? { $text: { $search: search } } : {}
            ]
        };

        const total = await Blog.countDocuments(query);

        const blogs = await Blog.find(query)
            .skip(skip)
            .limit(perPageNumber)
            .populate('tags')
            .exec();

        res.json({
            total,
            page: pageNumber,
            perPage: perPageNumber,
            blogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

exports.searchBlog = async (req, res, next) => {
    try {
        const { query } = req.query; // Assuming you receive a query parameter

        // Use the $text operator for full-text search
        const blogs = await Blog.find({ $text: { $search: query } })
            .select({ score: { $meta: 'textScore' } }) 
            .sort({ score: { $meta: 'textScore' } })
            .populate('topics');

        res.json({ blogs });
    } catch (error) {
        next(error);
    }
};



exports.getBlog = async (req, res, next) => {
    try {
        const { id } = req.params; // Assuming you pass the blog ID in the URL

        const blog = await Blog.findById(id).populate('topics', 'topic');

        if (!blog) {
            throw new AppError("Blog not found", 404);
        }

        res.json({ blog });
    } catch (error) {
        next(error);
    }
};


exports.likeBlog = async (req, res, next) => {

}
exports.addComment = async (req, res, next) => {
    
}

exports.updateComment = async (req, res, next) => {

}

exports.deleteBlog = async (req, res, next) => {
    
}
