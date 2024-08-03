import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setUserData } from '../redux/Slices/userDataSlice'; // Import the action

const WorkersLogin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); 
    const [password, setPassword] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const distpatch = useDispatch()
    const navigate = useNavigate(); 

    const requestWorkersData = async () => {
        try {
            const request = await fetch('http://localhost:3005/workers');
            const response = await request.json();
            setUsers(response);
            setLoading(false);
            console.log(response);
        } catch (error) {
            console.error("Failed to fetch workers data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        requestWorkersData();
    }, []);

    const openModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setPassword("");
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedUser && password === selectedUser.password) {
            console.log('Password correct, navigating to Home.');
            distpatch(setUserData(selectedUser))
            navigate('/'); 
        } else {
            console.log('Incorrect password.');
            alert('Incorrect password.');
        }
       
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="p-5">
                    <div className="divider divider-primary">Workers List</div>
                    <div className="flex flex-wrap gap-x-[3%] gap-y-10">
                        {users.map((item, index) => (
                            <div key={index} className="w-full md:max-w-[30%] bg-base-300 p-5 rounded-2xl shadow-md shadow-primary">
                                <div className="flex gap-3 items-center flex-wrap justify-between">
                                    <img src={item.profile_picture_url} className="w-20 h-20 border-2 border-primary rounded-full object-cover" alt="" />
                                    <div>
                                        <p className="text-primary font-bold">{item.name}</p>
                                        <p className="text-primary text-opacity-65 font-medium text-sm">{item.role}</p>
                                    </div>
                                    <div className="text-sm">
                                        <p className="flex items-center gap-2"> 
                                            <MdOutlineMailOutline /> 
                                            <Link to={`mailto:${item.email}`} className="link-primary underline">{item.email}</Link>
                                        </p>
                                        <p className="flex items-center gap-2"> 
                                            <BsTelephone /> 
                                            <Link to={`tel:${item.phone}`} className="link-primary underline">{item.phone}</Link>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-5">
                                    <p className="flex flex-col gap-2">
                                        <span className="text-primary">Status:</span>
                                        {item.is_active ? <span className="btn btn-success btn-outline btn-xs">Active</span> : <span>Not Active</span>}
                                    </p>

                                    <div>
                                        <p className="flex gap-2 text-xs">
                                            <span className="flex-1 text-nowrap">Created Date:</span>
                                            <span className="flex-1 text-success">{item.created_at.slice(0, 10)}</span>
                                        </p>

                                        <p className="flex gap-2 text-xs items-center mt-2 text-nowrap">
                                            <span className="flex-1">Last Login:</span>
                                            <div className="flex-col flex">
                                                <span className="text-warning">{item.last_login.slice(0, 10)}</span>
                                                <span className="text-warning">{item.last_login.slice(11, 19)}</span>
                                            </div>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between">
                                    {item.schedule && item.schedule.map((days, index) => (
                                        <div key={index}>
                                            <p>
                                                {days.start_time !== "REST DAY" ? <span className="text-success">{days.day.slice(0, 3)}</span> : <span className="text-error">{days.day.slice(0, 3)}</span>}
                                            </p>
                                            <p className="text-xs flex flex-col gap-1">
                                                {
                                                days.start_time === "REST DAY"
                                                ? 
                                                    <>
                                                        <span className="text-error">{days.start_time}</span>
                                                        <span className="text-error">{days.end_time}</span>
                                                    </>
                                                :
                                                    <>
                                                        <span className="text-success">{days.start_time}</span>
                                                        <span className="text-success">{days.end_time}</span>
                                                    </>
                                                }
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                
                                <button className="btn btn-primary mt-5 w-full" onClick={() => openModal(item)}>Login</button>
                                
                                {/* Modal */}
                                {showModal && selectedUser === item && (
                                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                        <div className="bg-blue-700 bg-opacity-50 p-5 rounded-lg shadow-lg relative">
                                            <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={closeModal}>&times;</span>
                                            <h2 className="text-2xl font-serif  font-bold mb-4">Password</h2>
                                            <input
                                                type="password"
                                                className="w-full border rounded-md py-2 px-3 mb-4 bg-slate-300 text-black" 
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                aria-label="Password"
                                            />
                                            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 font-serif" onClick={handleSubmit}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkersLogin;
