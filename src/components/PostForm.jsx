import { useForm } from 'react-hook-form';
import { firebase, db } from '../config/firebase';

const PostForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    db.collection('posts').add({ ...data, sendAt: firebase.firestore.Timestamp.now() }).then(() => {
      console.log('投稿に成功');
    }).catch((error) => {
      console.log('投稿に失敗');
      console.log(error);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' placeholder='name' {...register('name', { required: true })} />
      {errors.name && <span style={{ color: 'tomato' }}>名前を入力してください</span>}
      <br />
      <input type='text' placeholder='message' {...register('content', { required: true })} />
      {errors.content && <span style={{ color: 'tomato' }}>メッセージを入力してください</span>}
      <br />
      <input type="submit" />
    </form>
  );
};

export default PostForm;
