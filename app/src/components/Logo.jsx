import { Link, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Paper';
import GitHubIcon from '@material-ui/icons/GitHub';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { Link as RLink } from 'react-router-dom';
import Control from 'src/components/Control';
import { Logo as LogoIcon } from 'src/icons/Logo';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  border: 0 0 0 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: margin-bottom 0.6, width 0.6s;

  &:hover {
    margin-bottom: 0;
    width: 400px;
    transition: margin-bottom 0.5s, width 0.5s;
  }
  &:not(:hover) {
    margin-bottom: -235px;
    width: 220px;
    transition: margin-bottom 0.2s, width 0.2s;
  }
`;

const TextBody = styled(Typography)`
  padding: 2% 6% 1% 6%;
  display: flex;
  flex-direction: column;
`;

const TextItem = styled(Typography).attrs(({ variant }) => ({
  variant: variant || 'body1',
}))`
  display: flex;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Caption = ({ children }) => (
  <div>
    <Divider />
    <TextItem variant="h6">{children}</TextItem>
    <Divider />
  </div>
);

const StWrapperButton = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;
const StButton = styled(Button)`
  width: 100%;
`;

const StyledLogoWrapper = styled.div`
  margin-top: 5px;
`;

export const Logo = () => (
  <Control position="bottom-left" margin="no-bottom">
    <StyledCard>
      <StyledLogoWrapper>
        <LogoIcon />
      </StyledLogoWrapper>
      <TextBody>
        <Caption>Карта воздушного и шумового загрязнения</Caption>
        <TextItem>
          <Link href="https://aqicn.org/api/">
            Данные о загрязнении воздуха
          </Link>
        </TextItem>
        <TextItem>
          <Link href="https://data.noise-planet.org/noisecapture/">
            Данные о шуме
          </Link>
        </TextItem>
        <TextItem>
          <StyledLink href="https://github.com/polution-map">
            Pollution Map &nbsp; <GitHubIcon />
          </StyledLink>
        </TextItem>
        <Divider />
        <StWrapperButton>
          <Tooltip title={<h4>Авторизация</h4>} placement="bottom">
            <StButton startIcon={<PersonRoundedIcon />} variant="outlined">
              <RLink
                to="/singin"
                className="styledIcons"
                style={{ textDecoration: 'none', color: '#8cbae8' }}
              >
                Sing in
              </RLink>
            </StButton>
          </Tooltip>
        </StWrapperButton>
      </TextBody>
    </StyledCard>
  </Control>
);