import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GoogleIcon from '@mui/icons-material/Google';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const StWrapper = styled.div`
  width: 100%;
  position: relative;
  top: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StButton = styled(Button)`
  margin: 10px !important;
`;
const StLink = styled.a`
  color: white;
  text-decoration: none;
`;
const StButtonContainer = styled.div`
  display: flex;
`;
const steps = [
  'Зарегистрируйтесь',
  //   'На указанный электронный адрес поступит письмо со ссылкой для подтверждения почты',
  'Подтвердите адрес электронной почты',
  'Авторизируйтесь',
];
const email = [
  {
    name: 'Mail',
    icon: <AlternateEmailIcon />,
    href: 'https://mail.yandex.ru/?utm_source=main_stripe_big&uid=1619911560#tabs/relevant',
  },
  {
    name: 'Gmail',
    icon: <GoogleIcon />,
    href: 'https://accounts.google.com/signin/v2/identifier?passive=1209600&continue=https%3A%2F%2Faccounts.google.com%2Fb%2F0%2FAddMailService&followup=https%3A%2F%2Faccounts.google.com%2Fb%2F0%2FAddMailService&flowName=GlifWebSignIn&flowEntry=ServiceLogin',
  },
];

const RegistrationCompleted = () => {
  const [open, setOpen] = useState(false);
  return (
    <StWrapper>
      <Box>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <StButtonContainer>
        {email.map((e) => (
          <StButton key={e.href} variant="contained" startIcon={e.icon}>
            <StLink href={e.href} target="_blank" rel="noopener noreferrer">
              {e.name}
            </StLink>
          </StButton>
        ))}
      </StButtonContainer>
      <Tooltip title={<h4>Авторизация</h4>} placement="bottom">
        <Button startIcon={<PersonRoundedIcon />} variant="outlined">
          <Link
            to="/login"
            className="styledIcons"
            style={{ textDecoration: 'none', color: '#8cbae8' }}
          >
            Sing in
          </Link>
        </Button>
      </Tooltip>
    </StWrapper>
  );
};

export default RegistrationCompleted;
