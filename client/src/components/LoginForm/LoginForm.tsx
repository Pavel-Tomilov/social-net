import { FC, FormEventHandler, useState } from 'react';
import {login} from '../../api/User'
import { useMutation } from '@tanstack/react-query';
import { FormField } from '../FormField';
import { Button } from '../Button';
import './LoginForm.css';
import { queryClient } from '../../api/queryClients';

export const LoginForm: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const loginMutation = useMutation({
  mutationFn: () => login(username, password),
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["users", "me"]})
  }
},
queryClient
);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField label="Имя пользователя">
        <input
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </FormField>

      <FormField label="Пароль">
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormField>

      {loginMutation.error && <span>{loginMutation.error.message}</span>}

      <Button type="submit" title="Войти" isLoading= {loginMutation.isPending}/>
    </form>
  );
};
