import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
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

const Login = () => {
  const { userStore } = useStore();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    autorun(() => {
      if (userStore.message === 'null') return;
      if (userStore.message === 'login' && !userStore.isLoading) {
        userStore.message = 'null';
        navigate('/person-alaccount');
        enqueueSnackbar('Вход в систему прошел успешно', {
          variant: 'success',
        });
      }
      if (userStore.message.indexOf('Invalid credentials') !== -1) {
        userStore.message = 'null';
        enqueueSnackbar('Неверные учетные данные', {
          variant: 'warning',
        });
      }
      if (userStore.message.indexOf('Is not allowed') !== -1) {
        userStore.message = 'null';
        enqueueSnackbar('Необходимо подтвердить адрес электронной почты', {
          variant: 'warning',
        });
      }
    });
  }, []);

  const login = useInput('', { minLength: 5, maxLength: 100 });
  const password = useInput('', { minLength: 6, maxLength: 60 });

  const handleSubmit = (e) => {
    userStore.login(login.value, password.value);
    e.preventDefault();
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
      <h1 className="styledInfo">Sing in to PMap</h1>
      <div
        className={
          !login.inputValid || !password.inputValid
            ? 'styledForm'
            : 'styledFormLuck'
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="styledItem">
            <TextField
              required
              error={login.isDirty && !login.inputValid}
              value={login.value}
              onChange={(e) => login.onChange(e)}
              onBlur={(e) => login.onBlur(e)}
              label="Login or email"
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
          <Button
            startIcon={<PersonAddAlt1RoundedIcon />}
            variant="outlined"
            style={{ marginRight: '10px' }}
          >
            <Link
              to="/singup"
              className="styledIcons"
              style={{ textDecoration: 'none', color: '#8cbae8' }}
            >
              Sing up
            </Link>
          </Button>
          <LoadingButton
            startIcon={<PersonRoundedIcon />}
            loading={userStore.isLoading}
            disabled={!login.inputValid || !password.inputValid}
            variant="contained"
            type="submit"
          >
            Sing in
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default observer(Login);
