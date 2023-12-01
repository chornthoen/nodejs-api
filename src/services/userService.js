const getAllUsers = 'SELECT * FROM users'
const getUserById = 'SELECT * FROM users WHERE id = $1'
const createUser = 'INSERT INTO users(name,phone) VALUES ($1,$2) RETURNING *'
const updateUser = 'UPDATE users SET name = $2,phone = $3 WHERE id = $1 RETURNING *'
const deleteUser = 'DELETE FROM users WHERE id = $1 RETURNING *'

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
