import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Paper';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledCard = styled(Card)`
  border: 0 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: margin-top 0.8, width 0.8s;

  &:hover {
    margin-top: 0;
    width: 250px;
    transition: margin-top 0.5s, width 0.3s;
  }
  &:not(:hover) {
    margin-top: -95px;
    width: 100px;
    transition: margin-top 0.4s, width 1s;
  }
`;

const TextBody = styled(Typography)`
  padding: 2% 6% 1% 6%;
  display: flex;
  flex-direction: column;
`;
const StLink = styled(Link)`
  text-decoration: none;
  margin-left: 1vh;
  display: flex;
  flex-direction: column;
  align-content: center;
`;
const StArrow = styled.div`
  background-color: #dadce0;
  border-radius: 5px;
  width: 40px;
  height: 5px;
  margin: 0 auto 5px auto;
`;
const StActiveContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  align-content: center;
  width: 220px;
`;
const StSlider = styled(Slider)`
  margin: 10px auto 0 auto;
`;
const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const Menu = ({
  size,
  setSizeMapContainer,
  sizeContainer,
  minDistanceSlider,
  maxMinSlider,
}) => {
  function valuetext(value) {
    return `${value}%`;
  }
  const handleChangeSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistanceSlider) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistanceSlider);
        setSizeMapContainer([clamped, clamped + minDistanceSlider]);
      } else {
        const clamped = Math.max(newValue[1], minDistanceSlider);
        setSizeMapContainer([clamped - minDistanceSlider, clamped]);
      }
    } else {
      setSizeMapContainer(newValue);
    }
  };
  return (
    <StWrapper size={size}>
      <StyledCard>
        <TextBody>
          <StActiveContainer>
            <StContainer>
              <Tooltip
                followCursor
                style={{ margin: '0' }}
                title={<h4>Личный кабинет</h4>}
                placement="bottom"
              >
                <StLink to="/person-account" className="styledIcons">
                  <Button variant="outlined" startIcon={<HomeIcon />}>
                    Home
                  </Button>
                </StLink>
              </Tooltip>
            </StContainer>
            <StSlider
              value={sizeContainer}
              onChange={handleChangeSlider}
              getAriaValueText={valuetext}
              aria-label="Size"
              disableSwap
            />
          </StActiveContainer>

          <StArrow />
        </TextBody>
      </StyledCard>
    </StWrapper>
  );
};
export default observer(Menu);
