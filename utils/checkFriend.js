function checkFriend(arr, id) {
    let foundFriend = false;

    arr.forEach(friend => {
        if (friend.toString() === id) {
            foundFriend = true;
        }
    });

    return foundFriend;
}

module.exports = {checkFriend};