import { useForm, FormProvider } from "react-hook-form";
import { auth } from '../config/firebase';
import { useContext } from 'react';
import { AuthContext } from '../utils/Auth';
import { Redirect } from 'react-router-dom';
import EmailAndPasswordForm from '../components/EmailAndPasswordForm'

const Login = ({ history }) => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data); // react-hook-formを使って取ってきた値を確認できる
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      console.log('ログインに成功しました');
      console.log(result.user); // ログイン時のuser情報を見れる

      history.push('/');

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
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <EmailAndPasswordForm />
          <input type="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
