import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Control from 'src/components/Control.tsx';
import { useStore } from 'src/store/RootStoreContext';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import LoginNavigation from './LoginNavigation';
import './styledLogin.css';

const StLink = styled(Link)`
  text-decoration: none;
`;

const SingUp = () => {
  const { userStore } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    autorun(() => {
      if (userStore.message === 'null') return;
      if (userStore.message === 'registration' && !userStore.isLoading) {
        userStore.message = 'null';
        navigate('/registration-completed');
        enqueueSnackbar('Регистрация прошла успешно', {
          variant: 'success',
        });
      }
      if (userStore.message.indexOf('is already taken') !== -1) {
        if (userStore.message.indexOf('Username') !== -1) {
          userStore.message = 'null';
          enqueueSnackbar('Nмя пользователя уже занято', {
            variant: 'warning',
          });
        }

        if (userStore.message.indexOf('Email') !== -1) {
          userStore.message = 'null';
          enqueueSnackbar('Электронная почта уже занята', {
            variant: 'warning',
          });
        }
      }
      if (userStore.message.indexOf('is invalid') !== -1) {
        userStore.message = 'null';
        enqueueSnackbar(
          'Имя пользователя недействительно, может содержать только буквы или цифры',
          {
            variant: 'warning',
          }
        );
      }
    });
  }, []);

  const login = useInput('', { minLength: 5, maxLength: 100 });
  const password = useInput('', { isEmpty: true, minLength: 6, maxLength: 60 });
  const checkPassword = useInput('', {
    isEmpty: true,
    minLength: 6,
    maxLength: 60,
  });
  const email = useInput(undefined, { isEmail: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.value !== checkPassword.value) {
      enqueueSnackbar('Несоответствие пароля', { variant: 'error' });
    } else {
      userStore.registration(login.value, password.value, email.value);
    }
  };

  return (
    <div className="styledContainer">
      <Control position="top-left">
        <Tooltip title={<h3>Пример</h3>} placement="bottom">
          <StLink to="/pollutionmap">
            <Button variant="contained" startIcon={<MapOutlinedIcon />}>
              Pollution Map
            </Button>
          </StLink>
        </Tooltip>
      </Control>
      <LoginNavigation />
      <h1 className="styledInfo">Sing up to PMap</h1>
      <div
        className={
          !login.inputValid ||
          !password.inputValid ||
          !password.inputValid ||
          !checkPassword.inputValid ||
          !email.inputValid
            ? 'styledForm'
            : 'styledFormLuck'
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="styledItem">
            <TextField
              required
              error={email.isDirty && !email.inputValid}
              value={email.value}
              onChange={(e) => email.onChange(e)}
              onBlur={(e) => email.onBlur(e)}
              label="email"
              variant="outlined"
            />
          </div>
          <div className="styledItem">
            <TextField
              required
              error={login.isDirty && !login.inputValid}
              value={login.value}
              onChange={(e) => login.onChange(e)}
              onBlur={(e) => login.onBlur(e)}
              label="Login"
              variant="outlined"
            />
          </div>
          <div className="styledItem">
            <TextField
              required
              error={password.isDirty && !password.inputValid}
              value={password.value}
              onChange={(e) => password.onChange(e)}
              onBlur={(e) => password.onBlur(e)}
              type="password"
              label="password"
              variant="outlined"
            />
          </div>
          <div className="styledItem">
            <TextField
              required
              error={checkPassword.isDirty && !checkPassword.inputValid}
              value={checkPassword.value}
              onChange={(e) => checkPassword.onChange(e)}
              onBlur={(e) => checkPassword.onBlur(e)}
              type="password"
              label="password confirmation"
              variant="outlined"
            />
          </div>
          <LoadingButton
            startIcon={<PersonAddAlt1RoundedIcon />}
            loading={userStore.isLoading}
            disabled={
              !login.inputValid ||
              !password.inputValid ||
              !email.inputValid ||
              !checkPassword.inputValid
            }
            variant="contained"
            type="submit"
          >
            Sing up
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default observer(SingUp);
