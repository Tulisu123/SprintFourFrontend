export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

export function parsePrice(input, type) {
    if (type === 'number') {
        if (typeof input !== 'string') {
            throw new Error("Input must be a string when converting to a number.")
        }
        return parseFloat(input.replace(/,/g, '')) || 0;
    } else if (type === 'string') {
        if (typeof input !== 'number') {
            throw new Error("Input must be a number when converting to a string.")
        }
        return input.toLocaleString('en-US');
    } else {
        throw new Error("Invalid type. Use 'number' or 'string'.")
    }
}

export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function prepareDate(longDate){
    if (!longDate) {
        console.error('Invalid date:', longDate);
        return '';
    }

    // Handle Date object or ISO format
    if (Object.prototype.toString.call(longDate) === '[object Date]') {
        return longDate.toISOString().split('T')[0];  // Convert Date to ISO and strip time
    }

    if (longDate.includes('T')) {
        return longDate.split('T')[0];  // Strip time if present
    }

    // If it’s already in YYYY-MM-DD format, return as is
    return longDate;
}