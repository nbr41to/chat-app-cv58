import { useFormContext } from "react-hook-form";

const EmailAndPasswordForm = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
      <>
        <input type='email' placeholder='Email' {...register('email', { required: true })} />
        {errors.email && <span style={{ color: 'tomato' }}>Emailを入力してください</span>}
        <br />
        <input type='password' placeholder='Password' {...register('password', { required: true })} />
        {errors.password && <span style={{ color: 'tomato' }}>Passwordを入力してください</span>}
        <br />
      </>
  );
};

export default EmailAndPasswordForm;
