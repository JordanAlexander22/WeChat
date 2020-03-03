//helper functions having to do with users

const users = [];


const addUser = ({id, name, room}) => {
    // allows users to enter and change rooms
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);
    if (existingUser) {
        return {error: "this name already exists"}
    }

    const user = {id, name, room};
    users.push(user);

    return {user}
};




const removeUser = (id) => {

   const index = users.findIndex((user => user.id === id));

   if(index === !-1) {
       return users.splice(index, 1) [0]; //removes user from array
   }
}


const getUser = (id) => users.find((user) => user.id === id);

const getUsersinRoom = (room) => users.filter((user => user.room === room));



module.exports = {addUser, removeUser, getUser, getUsersinRoom};

