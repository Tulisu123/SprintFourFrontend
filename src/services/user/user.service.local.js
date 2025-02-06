import { storageService } from '../async-storage.service';
import { loadFromStorage } from "../util.service";

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
    if (user.reservations?.find(bookId => bookId === bookingId)) return

    user.reservations.push(bookingId)

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
        _id: userCred._id || generateId(),
        fullname: userCred.fullname,
        username: userCred.username,
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
    if (loadFromStorage('user')) return;

    const demoUsers = [
        {
            "_id": "S4dPn",
            "username": "user1",
            "password": "user1",
            "fullname": "User 1",
            "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            "reservations": []
        },
        {
            "_id": "pZFT4",
            "username": "user2",
            "password": "user2",
            "fullname": "User 2",
            "reservations": [],
            "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        },
        {
            "_id": "cveg7",
            "username": "user3",
            "password": "user3",
            "fullname": "User 3",
            "reservations": [],
            "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        },
        {
            "_id": "H3qQF",
            "username": "user4",
            "password": "user4",
            "fullname": "User 4",
            "reservations": [],
            "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        },
        {
            "_id": "Wl0m8",
            "username": "user5",
            "password": "user5",
            "fullname": "User 5",
            "reservations": [],
            "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        },
        {
            "_id": "hwTN9",
            "username": "user6",
            "password": "user6",
            "fullname": "User 6",
            "reservations": ["xFAoIi"],
            "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        }
    ];

    // Store each user in localStorage using storageService
    for (const user of demoUsers) {
        await storageService.postWithoutIds('user', user);
    }

    console.log('Demo user data created successfully!');
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
