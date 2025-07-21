import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`http://localhost:5000/users/${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) return <p className="text-center">Loading...</p>;

  if (!userInfo?.email) {
    return <p className="text-center text-red-500">User info not found.</p>;
  }

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={userInfo.photoURL}
            alt="User"
            className="w-28 h-28 rounded-full border-4 border-blue-200 object-cover shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4">{userInfo.name}</h2>
          <p className="text-gray-500">{userInfo.email}</p>
          <span className="mt-2 px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Designation */}
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-semibold">Designation</p>
            <p className="text-gray-800">{userInfo.designation}</p>
          </div>

          {/* Role */}
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-semibold">Role</p>
            <p className="text-gray-800">{userInfo.role}</p>
          </div>

          {/* Salary */}
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-semibold">Salary</p>
            <p className="text-gray-800">${userInfo.salary}</p>
          </div>

          {/* Bank Account */}
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-semibold">Bank Account</p>
            <p className="text-gray-800">{userInfo.bank_account_no}</p>
          </div>

          {/* Verified */}
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-semibold">Verified</p>
            <p className={`font-medium ${userInfo.isVerified ? "text-green-600" : "text-red-600"}`}>
              {userInfo.isVerified ? "Yes" : "No"}
            </p>
          </div>

          {/* Status */}
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-semibold">Status</p>
            <p className="text-green-600 font-medium">Active</p>
          </div>

          {/* Created At */}
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-semibold">Created At</p>
            <p className="text-gray-800">{userInfo.createdAt || "Not recorded"}</p>
          </div>

          {/* Last Sign In */}
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-500 font-semibold">Last Sign In</p>
            <p className="text-gray-800">{userInfo.last_login || "Not recorded"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
