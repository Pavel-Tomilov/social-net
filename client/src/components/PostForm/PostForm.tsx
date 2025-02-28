import { FC, FormEventHandler, useState } from 'react';

import { Button } from '../Button';
import { FormField } from '../FormField';
import './PostForm.css';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../api/Post';

export interface IPostFormProps {}

export const PostForm: FC<IPostFormProps> = () => {
const [text, setText] = useState("");

useMutation({
  mutationFn: () => createPost(text)
})

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <FormField label="Текст поста">
        <textarea className="post-form__input" 
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}/>
      </FormField>

      <Button type="submit" title="Опубликовать" />
    </form>
  );
};
