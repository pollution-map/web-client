import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import useInput from '../my-use/useInput';

const SingUp = () => {
  const login = useInput('', { isEmpty: true, minLength: 5, maxLength: 10 });
  const password = useInput('', { isEmpty: true, minLength: 5, maxLength: 6 });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('авторизация');
  };

  return (
    <div>
      <h1>SingUp</h1>
      <form onSubmit={handleSubmit}>
        {login.isDirty && login.isEmpty && (
          <div>{login.errorMessage.isEmpty}</div>
        )}
        {login.isDirty && login.minLength && (
          <div>{login.errorMessage.minLength}</div>
        )}
        {login.isDirty && login.maxLength && (
          <div>{login.errorMessage.maxLength}</div>
        )}
        <TextField
          required
          error={login.isDirty && !login.inputValid}
          value={login.value}
          onChange={(e) => login.onChange(e)}
          onBlur={(e) => login.onBlur(e)}
          id="Login-basic"
          label="Login"
          variant="outlined"
        />
        <TextField
          required
          error={password.isDirty && !password.inputValid}
          value={password.value}
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          id="password-basic"
          type="password"
          label="password"
          variant="outlined"
        />
        <Button
          disabled={!login.inputValid || !password.inputValid}
          variant="outlined"
          type="submit"
        >
          SingUp
        </Button>
      </form>
      <Link to="/login">
        <Button variant="outlined">Sing In</Button>
      </Link>
    </div>
  );
};

export default SingUp;
