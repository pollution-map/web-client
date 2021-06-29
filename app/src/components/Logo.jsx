import { Logo as LogoIcon } from 'src/icons/Logo';
import Control from 'src/components/Control';
import Card from '@material-ui/core/Paper';
import styled from 'styled-components';
import { Divider, Link, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

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
    margin-bottom: -195px;
    width: 200px;
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

export const Logo = () => (
  <Control position="bottom-left" margin="no-bottom">
    <StyledCard>
      <LogoIcon color="white" />
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
            Polution Map &nbsp; <GitHubIcon />
          </StyledLink>
        </TextItem>
      </TextBody>
    </StyledCard>
  </Control>
);
