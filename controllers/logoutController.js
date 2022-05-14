const User = require('../model/User');

// function to handle Logout request
const handleLogout = async (req, res) => {

    // On client side, delete the accessToken

    // get cookies from request and send response if no cookies
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    // get refreshToken from cookies (stored as jwt in cookies)
    const refreshToken = cookies.jwt;

    // Check for refreshToken in DB
    // first find user with this token 
    // if user not found then clear cookies and send response
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);  // No content
    }
    
    // Delete the refreshToken in DB 
    // Get other users (apart from the one logged in)
    // const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    // // create current user and set its refreshToken to blank
    // const currentUser = {...foundUser, refreshToken: ''};
    // // Update DB with the users and the current user (with no refresh token) and write to file
    // usersDB.setUsers([...otherUsers, currentUser]);
    // await fsPromises.writeFile(
    //     path.join(__dirname, '..', 'model', 'users.json'),
    //     JSON.stringify(usersDB.users)
    // );
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    // console.log(result);

    // Delete the cookie 
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    // Send 204 response saying all is well but no content because logout successful
    res.sendStatus(204);    
}

module.exports = { handleLogout };