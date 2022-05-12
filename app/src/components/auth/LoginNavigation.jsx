// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './styledLogin.css';

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`;
const StTab = styled(Tab)`
  cursor: pointer;
`;
const pageMenu = [
  { id:  0, path: '/singin', label: 'Sing in', icon: <PersonRoundedIcon /> },
  {
    id: 1,
    path: '/singup',
    label: 'Sing up',
    icon: <PersonAddAlt1RoundedIcon />,
  },
];
const LoginNavigation = ({}) => {
  const [activePage, setActivePage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // setActivePage(1);
    pageMenu.forEach((element) => {
      if (element.path === window.location.pathname) setActivePage(element.id);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setActivePage(newValue);
    pageMenu.forEach((element) => {
      if (element.id === newValue) navigate(element.path);
    });
  };
  return (
    <StWrapper>
      <Tabs value={activePage} onChange={handleChange}>
        {pageMenu.map((p) => (
          <StTab icon={p.icon} label={p.label} key={p.id} />
        ))}
      </Tabs>
    </StWrapper>
  );
};

export default observer(LoginNavigation);
