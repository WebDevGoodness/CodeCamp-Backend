import { Post } from '../models/post.model.js';

// create a post
const createPost = async ( req, res ) => {
    try {
        const { authorName, description, age } = req.body;

        if(!authorName || !description || !age) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const post = new Post({
            authorName,
            description,
            age
        });

        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Read all Posts
const getAllPosts = async ( req, res ) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updatePost = async ( req, res ) => {
    try {
        // basic validation to check if the body is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is empty' });
        }


        // const { id } = req.params;
        // const { authorName, description, age } = req.body;

        // const post = await Post.findById(id);
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // post.authorName = authorName || post.authorName;
        // post.description = description || post.description;
        // post.age = age || post.age;

        // await post.save();
        res.status(200).json({ message: 'Post updated successfully', post });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deletePost = async ( req, res ) => {
    try {
        
        const deleted = await Post.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export { createPost, getAllPosts, updatePost, deletePost };