import User from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        };

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        };

        //create new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        } });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    };
};

// const loginUser = async (req, res) => {
//     try {

//         // checking if the user already exists in the database
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // check if the password is correct
//         const isMatch = await user.isPasswordCorrect(password);

//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         res.status(200).json({ message: 'User logged in successfully', user });

//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check the incoming data
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required',
            });
        }

        // Find user using normalized email
        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        // DEBUG: Check whether the user exists
        console.log('User found:', Boolean(user));

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        // DEBUG: Check the password
        const isMatch = await user.isPasswordCorrect(password);

        console.log('Password matches:', isMatch);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        return res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (error) {
        console.error('Login error:', error.message);

        return res.status(500).json({
            message: 'Server error',
        });
    }
};


const logoutUser = async (req, res) => {
    try {
        // Here you would typically handle the logout logic, such as clearing cookies or tokens.
        // For this example, we'll just send a success message.

        const {email} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Perform any necessary logout operations here (e.g., clearing session, tokens, etc.)

        res.status(200).json({ message: 'User logged out successfully' });

    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { registerUser, loginUser, logoutUser };