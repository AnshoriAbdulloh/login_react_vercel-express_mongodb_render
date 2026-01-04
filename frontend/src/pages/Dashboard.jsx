import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div className={`grid place-items-center w-full h-52 font-samsung  `}>
      <h1 className={`text-6xl`}>Hello {user}</h1>
      <button
        className={`py-3 px-10 rounded-md bg-[#512da8] text-white`}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
