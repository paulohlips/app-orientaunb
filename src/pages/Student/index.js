/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/static-property-placement */
/* eslint-disable global-require */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import useAuth from '../../store';
import api from '../../services/api';

import {
  Container,
  CenterView,
  LogoUnB,
  LogoLatitude,
  SimpleText,
} from './styles';

const withZustand = (Comp) => (props) => {
  const { token, userData } = useAuth();
  return <Comp {...props} token={token} userData={userData} />;
};

class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myOrientations: [],
      statusOrientation: '',
      lista: '',
    };
  }

  async componentDidMount() {
    const { token, userData } = this.props;
    try {
      const response = await api.get(`/orientations/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.setState({ myOrientations: response.data });
    } catch (err) {
      console.log(err);
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
    return true;
  };

  render() {
    return <Container />;
  }
}

export default withZustand(Student);
