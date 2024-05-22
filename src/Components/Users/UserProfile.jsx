// import required packages
import { useEffect, useState } from 'react';
import userService from '../../../Services/UserService';
import TableRow from './TableRow';

const UserProfile = () => {

    // state for user data and loading
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    // Get the created at date
    const createdAt = new Date(userData.createdAt);

    // get user data from database
    useEffect(() => {

        // function to get user data
        const getUser = async () => {
            try {
                const response = await userService.currentUser();

                // set user data
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        // call the function to get user data
        getUser();
    }, []);

    return (

        <div className="container">
            <div className="p-5">
                {loading ? (
                    <div className="container" style={{ height: "90vh" }}>
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col-12">
                        <h1 className="text-center">User Profile</h1>

                        <table className="table table-striped m-3">
                            <tbody className="text-center">
                                <TableRow label="First Name" value={userData?.firstname} />
                                <TableRow label="Last Name" value={userData?.lastname} />
                                <TableRow label="Email" value={userData?.email} />
                                <TableRow label="Phone Number" value={userData?.phoneno} />
                                <TableRow label="Role" value={userData?.role} />
                                <TableRow label="Created At" value={createdAt.toLocaleDateString()} />
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
