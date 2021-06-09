import { useForm } from 'react-hook-form';
import { auth } from '../config/firebase';

const Signup = ({ history }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data); // react-hook-formを使って取ってきた値を確認できる
    const { email, password } = data;
    auth.createUserWithEmailAndPassword(email, password).then((result) => {
      console.log('アカウントの作成に成功しました');
      console.log(result.user); // 作成時のuser情報を見れる

      history.push('/');

    }).catch((error) => {
      console.log('アカウントの作成に失敗しました');
      console.log(error); // Errorの内容を確認できる
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
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

export default Signup;
