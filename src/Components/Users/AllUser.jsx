// import required packages
import { useState } from 'react'
import { useEffect } from "react"
import userService from '../../../Services/UserService';
import UserCard from './UserCard';

const AllUser = () => {

    // State for usersList
    const [usersList, setUsersList] = useState([]);

    // Function to delete a user
    const handleDelete = async (id) => {
        try {

            // Call deleteUser function from userService
            await userService.deleteUser(id);

            // alert
            alert("User deleted successfully");
        } catch (err) {
            console.log(err);
        }
    };

    // define useEffect hook
    useEffect(() => {

        // Function to get usersList
        const getUsersList = async () => {
            try {

                // Call allUsers function from userService
                const response = await userService.allUsers();

                // update state
                setUsersList(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        // Call getUsersList function
        getUsersList();
    }, [handleDelete]);


    return (
        <>
            <div className="container" style={{ minHeight: "90vh" }}>
                <section className='p-3'>
                    <h1>Admins </h1>
                    <div className="row">
                        {usersList.map((user, index) => (
                            user.role === "admin" && (
                                <UserCard user={user} key={index} handleDelete={handleDelete} />
                            )
                        ))}
                    </div>
                </section>
                <section className='p-3'>
                    <h1>Users </h1>
                    <div className="row">
                        {usersList.map((user, index) => (
                            user.role === "user" && (
                                <UserCard user={user} key={index} handleDelete={handleDelete} />
                            )
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default AllUser