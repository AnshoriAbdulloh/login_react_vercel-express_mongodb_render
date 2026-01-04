import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaFacebook, FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";

export default function Login() {
  const { login } = useAuth();

  const [sign, setSign] = useState(false); // state berpindah sign in dan register
  const [formLogin, setFormLogin] = useState({
    email: ``,
    password: ``,
  });
  const [formRegister, setFormRegister] = useState({
    username: ``,
    email: ``,
    password: ``,
  });

  // const navigate = useNavigate();

  function handleChangeLogin(e) {
    const { name, value } = e.target;

    setFormLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleChangeRegister(e) {
    const { name, value } = e.target;

    setFormRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formRegister);
  }

  async function handleLogin(e) {
    e.preventDefault();

    const { email, password } = formLogin;

    try {
      const res = await fetch(`http://localhost:5001/login`, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: `include`,
      });

      // tunggu respon dari server
      const data = await res.json(); // .json merubah dari JSON string ke object
      if (!res.ok) {
        alert(data.message);
        return;
      }

      // SIMPAN TOKEN
      login(data.accessToken);
    } catch (err) {
      // masuk sini kalau server mati, cors error, respon bukan json, fetch gagal
      // (bukan untuk salah password)
      console.error(err);
      alert(`Server error`);
    }
  }
  async function handleRegister(e) {
    e.preventDefault();

    const { username, email, password } = formRegister;

    try {
      const res = await fetch(`http://localhost:5001/register`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        credentials: `include`,
      });

      // tunggu respon dari server
      const data = await res.json(); // .json merubah dari JSON string ke object
      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(`${data.message}, silahkan login`);
      setSign(!sign);
      setFormRegister({
        username: ``,
        email: ``,
        password: ``,
      });
    } catch (err) {
      console.error(err);
      alert(`Server error`);
    }
  }

  return (
    <section
      className={`grid relative place-items-center md:place-items-start bg-white md:max-w-3xl max-w-112.5 rounded-3xl w-[95%] text-2xl shadow-2xs font-samsung overflow-hidden`}
    >
      <div
        className={`relative w-full md:w-[384px] h-100 grid my-8 place-items-center  overflow-visible `}
      >
        <form
          onSubmit={handleLogin}
          className={`${sign ? `-translate-x-full md:translate-x-0 opacity-0 pointer-events-none` : ``} absolute px-6 w-full flex flex-col gap-2 items-center transition-all duration-800 md:duration-500 ease-in-out`}
        >
          <h1 className={`font-bold text-center text-3xl`}>Sign In</h1>
          <div
            className={`flex gap-2 my-4 [&_a_svg]:border [&_a_svg]:border-gray-300 [&_a_svg]:box-content [&_a_svg]:p-2 [&_a_svg]:rounded-md`}
          >
            <a href='#'>
              <FaGoogle size={20} />
            </a>
            <a href='#'>
              <FaLinkedin size={20} />
            </a>
            <a href='#'>
              <FaFacebook size={20} />
            </a>
            <a href='#'>
              <FaGithub size={20} />
            </a>
          </div>
          <span className={`text-xs`}>or use your email and password</span>
          <input
            className={`w-full h-10 px-3 py-2 text-[14px] rounded-md bg-[#eee] outline-0`}
            name='email'
            type='email'
            placeholder='Email'
            value={formLogin.email}
            onChange={handleChangeLogin}
            required
          />
          <input
            className={`w-full h-10 px-3 py-2 text-[14px] rounded-md bg-[#eee] outline-0`}
            name='password'
            type='password'
            placeholder='Password'
            value={formLogin.password}
            onChange={handleChangeLogin}
            required
          />
          <span className={`grid grid-cols-2 w-full `}>
            <a className={`text-xs my-2`} href='#'>
              Forgot Your Password
            </a>
            <button
              type='button'
              className={`text-xs my-2 flex items-center place-self-end md:hidden`}
              onClick={() => setSign(!sign)}
            >
              SIGN UP <MdKeyboardArrowRight size={17} />
            </button>
          </span>

          <button
            className={`py-3 px-10 font-bold text-sm text-white bg-[#512da8] rounded-md`}
            type='submit'
          >
            SIGN IN
          </button>
        </form>

        <form
          onSubmit={handleRegister}
          className={`${sign ? `md:translate-x-full` : `translate-x-full opacity-0 pointer-events-none`} absolute px-6 w-full flex flex-col gap-2 items-center transition-all duration-800 md:duration-500 ease-in-out`}
        >
          <h1 className={`font-bold text-center`}>Create Account</h1>
          <div
            className={`flex gap-2 my-4 [&_a_svg]:border [&_a_svg]:border-gray-300 [&_a_svg]:box-content [&_a_svg]:p-2 [&_a_svg]:rounded-md`}
          >
            <a href='#'>
              <FaGoogle size={20} />
            </a>
            <a href='#'>
              <FaLinkedin size={20} />
            </a>
            <a href='#'>
              <FaFacebook size={20} />
            </a>
            <a href='#'>
              <FaGithub size={20} />
            </a>
          </div>
          <span className={`text-xs`}>or use your email for registrasion</span>
          <input
            className={`w-full h-10 px-3 py-2 text-[14px] rounded-md bg-[#eee] outline-0`}
            name='username'
            type='text'
            placeholder='Name'
            value={formRegister.username}
            onChange={handleChangeRegister}
            required
          />
          <input
            className={`w-full h-10 px-3 py-2 text-[14px] rounded-md bg-[#eee] outline-0`}
            name='email'
            type='email'
            placeholder='Email'
            value={formRegister.email}
            onChange={handleChangeRegister}
            required
          />
          <input
            className={`w-full h-10 px-3 py-2 text-[14px] rounded-md bg-[#eee] outline-0`}
            name='password'
            type='password'
            placeholder='Password'
            value={formRegister.password}
            onChange={handleChangeRegister}
            required
          />
          <span className={`grid  w-full`}>
            <button
              type='button'
              className={`text-xs my-2 flex items-center md:hidden`}
              onClick={() => setSign(!sign)}
            >
              <MdKeyboardArrowLeft size={17} />
              SIGN IN
            </button>
          </span>

          <button
            className={`py-3 px-10 font-bold text-sm text-white bg-[#512da8] rounded-md`}
            type='submit'
          >
            SIGN UP
          </button>
        </form>
      </div>

      <div
        className={`penutup ${sign ? `-translate-x-full md:translate-x-0 md:rounded-l-2xl` : `translate-x-[101%] md:rounded-r-2xl`} grid place-items-center transition-all duration-700 ease-in-out absolute  z-10 w-full md:w-1/2 h-full rounded-4xl  bg-linear-to-tr from-[#5c6bc9] to-[#512da8] place-self-start text-white *:transition-all *:duration-500 *:ease-in-out`}
      >
        <div
          className={`${sign ? `opacity-0` : ``} px-8 md:grid place-items-center gap-6 row-start-1 row-end-2 col-start-1 col-end-2 hidden`}
        >
          <h1 className={`text-4xl text-center font-bold`}>Hello, Friend</h1>
          <p className={`text-[14px] text-center`}>
            Register with your personal details to use all of site features
          </p>
          <button
            type='button'
            className={`py-3 px-10 font-bold text-sm text-white border rounded-md`}
            onClick={() => {
              setSign(!sign);
              console.log(`sign up`);
            }}
          >
            SIGN UP
          </button>
        </div>
        <div
          className={`${sign ? `` : `opacity-0`} px-8 md:grid place-items-center gap-6 row-start-1 row-end-2 col-start-1 col-end-2 hidden`}
        >
          <h1 className={`text-4xl text-center font-bold`}>Welcome Back</h1>
          <p className={`text-[14px] text-center`}>
            Enter your personal details to use all of site features
          </p>
          <button
            className={`py-3 px-10 font-bold text-sm text-white border rounded-md`}
            onClick={() => {
              setSign(!sign);
              console.log(`sign in`);
            }}
          >
            SIGN IN
          </button>
        </div>
      </div>
    </section>
  );
}
