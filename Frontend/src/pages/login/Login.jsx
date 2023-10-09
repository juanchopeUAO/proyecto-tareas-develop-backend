/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import LogoGroup from '../../assets/LogoGroups.svg';
import Logo from '../../assets/Logo.svg';
import { login } from '../../store/slices/auth/thunks';

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticating, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }));
    } catch (err) {
      setIsEmpty(true);
    }
  };

  useEffect(() => {
    isAuthenticating && navigate('/');
  }, [isAuthenticating, navigate]);

  return (
    <section className="w-screen h-screen overflow-y-hidden lg:grid lg:grid-cols-2">
      <article className="h-full w-full flex flex-col px-5 xl:px-[8.75rem] justify-center gap-[0.625rem]">
        <img src={Logo} className="w-[60px]" alt="logo" />
        <div className="mb-[35px]" />
        <p className="text-[2rem] font-semibold">Accede a tu cuenta</p>
        <p className="font-normal text-[#4B5563]">
          Aprende gratis en Namanyajugabelajar.io, ¡y empieza la carrera con la
          que llevas soñando desde que eras un embrión!
        </p>
        <div className="mb-[25px]" />
        <form className="flex flex-col gap-[1.875rem]" onSubmit={handleLogin}>
          <div className="flex flex-col gap-[0.625rem]">
            <label className="font-bold" htmlFor="inputEmail">
              Email
            </label>
            <input
              id="inputEmail"
              className="py-5 px-10 bg-[#F3F4F6] text-black"
              type="email"
              value={email}
              placeholder="saipul@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-[0.625rem]">
            <div className="w-full flex justify-between">
              <label className="font-bold" htmlFor="inputPassword">
                Contraseña
              </label>
              <Link
                to="/reset-password"
                className="text-[#4F46E5] font-semibold"
              >
                ¿Ha olvidado su contraseña?
              </Link>
            </div>
            <input
              id="inputPassword"
              className="py-5 px-10 bg-[#F3F4F6] text-black"
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex align-middle gap-[0.938rem]">
            <input
              className="w-[25px] bg-[#F3F4F6] rounded-[0.188rem] border border-transparent"
              type="checkbox"
              name=""
              id=""
            />
            {' '}
            <span className="text-base text-center font-semibold">
              Recuérdame
            </span>
          </div>
          <p className={isEmpty ? 'text-red-600 text-md text-center md:text-xl' : 'hidden'}>El email y/o la contraseña son incorrectos</p>
          <button type="submit" className="bg-[#4F46E5] text-white py-5 rounded-md">
            Iniciar sesión
          </button>
        </form>
        <div className="mb-[35px]">
          {error && (
            <p className="text-center text-red-500 font-bold pt-4">
              Las credenciales son incorrectas, verifica si ya estas registrado
            </p>
          )}
        </div>
        <p className="text-[#4B5563] text-center font-semibold pb-5">
          ¿Aún no tiene cuenta?
          {' '}
          <Link to="/register" className="text-[#4F46E5] font-semibold">
            Regístrese ahora
          </Link>
        </p>
      </article>
      <article className="hidden lg:flex lg:flex-col bg-[url('/RigthSide.svg')] bg-no-repeat bg-cover w-full justify-center">
        <img className="w-full" src={LogoGroup} alt="" />
        <div className="lg:w-[26rem] xl:w-[537px] self-center text-white">
          <p className="text-sm font-semibold opacity-60 mb-[10px]">
            NAMANYAJUGABELAJAR.IO
          </p>
          <p className="md:text-2xl xl:text-[28px]">
            Aprender online es cada vez más fácil, sigue aprendiendo aunque uses
            la cuota del Ministerio de Educación y Cultura jeje~
          </p>
        </div>
      </article>
    </section>
  );
}
