import { storageService } from '../async-storage.service';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';
createDemoData()
export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
    createDemoData,
    generateId,
    addBookingToUser
};

async function getUsers() {
    const users = await storageService.query('user');
    return users.map(user => {
        delete user.password;
        return user;
    });
}

async function getById(userId) {
    return await storageService.get('user', userId);
}

function remove(userId) {
    return storageService.remove('user', userId);
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id);
    user.score = score;
    await storageService.put('user', user);

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser();
    if (loggedinUser._id === user._id) saveLoggedinUser(user);

    return user;
}

async function addBookingToUser(bookingId, userId) {
    console.log('Adding booking id to reservations')
    const user = await getById(userId)
    if (user.reservetions.find(bookId => bookId === bookingId)) return
    
    user.reservetions.push(bookingId)

    return await storageService.put('user', user)
}

async function login(userCred) {
    const users = await storageService.query('user');
    const user = users.find(user => user.username === userCred.username);

    if (user) return saveLoggedinUser(user);
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png';
    const userToPost = {
        _id: userCred._id || _generateId(),
        fullname: userCred.fullname,
        imgUrl: userCred.imgUrl,
        reservetions: userCred.reservetions || [],
        isAdmin: userCred.isAdmin || false,
    };
    const user = await storageService.post('user', userToPost);
    return saveLoggedinUser(user);
}

async function logout() {
    console.log('logging out user');
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

function saveLoggedinUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        reservetions: user.reservetions,
        isAdmin: user.isAdmin,
    };
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
    return user;
}

// Demo data creation function
async function createDemoData() {
    if (storageService.get('user')) return
    const demoUsers = Array.from({ length: 10 }, (_, i) => ({
        _id: `u10${i + 1}`,
        fullname: `User ${i + 1}`,
        imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        username: `user${i + 1}`,
        password: `user${i + 1}`,
        reservetions: [`r${i + 1}`],
        isAdmin: false,
    }))

    // Combine all demo users
    const allUsers = [...demoUsers];

    // Store in localStorage using storageService
    for (const user of allUsers) {
        await storageService.post('user', user);
    }

    console.log('Demo data created successfully!');
}

// Helper function to generate unique IDs
function generateId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
}
