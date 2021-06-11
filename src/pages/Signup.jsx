import { useForm, FormProvider } from "react-hook-form";
import { auth } from '../config/firebase';
import EmailAndPasswordForm from '../components/EmailAndPasswordForm'

const Signup = ({ history }) => {
  const methods = useForm();
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
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <EmailAndPasswordForm />
          <input type="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default Signup;
