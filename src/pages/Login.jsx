import { useForm } from "react-hook-form";
import { auth } from '../config/firebase';
import { useContext } from 'react';
import { AuthContext } from '../utils/Auth';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data); // react-hook-formを使って取ってきた値を確認できる
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      console.log('ログインに成功しました');
      console.log(result.user); // ログイン時のuser情報を見れる

    }).catch((error) => {
      console.log('ログインに失敗しました');
      console.log(error); // Errorの内容を確認できる
    });
  };

  const user = useContext(AuthContext);
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Email Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='email' placeholder='Email' {...register('email', { required: true })} />
        {errors.email && <span style={{ color: 'tomato' }}>Emailを入力してください</span>}
        <br />
        <input type='password' placeholder='Password' {...register('password', { required: true })} />
        {errors.password && <span style={{ color: 'tomato' }}>Passwordを入力してください</span>}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
