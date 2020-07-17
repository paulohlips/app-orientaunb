/* eslint-disable react/prop-types */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
/* eslint-disable global-require */
import React, {Component} from 'react';
import {Modal, BackHandler, StatusBar, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import Lottie from 'lottie-react-native';
import {RadioButton} from 'react-native-paper';
import leave from '../../assets/animations/leave.json';
import stay from '../../assets/animations/stayPTBR.json';
import question from '../../assets/animations/question.json';
import useAuth from '../../store';
import {colors} from '../../styles';
import {
  titleMargin,
  altura_tela,
  largura_tela,
} from '../../styles/responsividade';

import {
  Container,
  TopCards,
  MiddleCards,
  BottomCards,
  Card,
  Text,
  Image,
  MediumImage,
  LargeImage,
  SelectionView,
  CardView,
  QuestionText,
  ViewButtons,
  ViewButtonYes,
  ViewButtonNo,
  RadioText,
  LogoutView,
  LogoutButton,
  ModalContainerAnimation,
  ModalContainer,
  ModalView,
  RowView,
  ModalText,
  ModalTextVolunteer,
  ModalButtonSair,
  ModalButtonSairVolunteer,
  ModalButtonCancel,
  ModalButtonText,
  ModalButtonTextSair,
  ModalViewAnimation,
  VolunteerButton,
  VolunteerButtonText,
} from './styles';
import api from '../../services/api';

const withZustand = (Comp) => (props) => {
  const {
    token,
    userData,
    isSick,
    changeGeolocation,
    geolocation,
    type,
  } = useAuth();

  return (
    <Comp
      {...props}
      token={token}
      userData={userData}
      isSick={isSick}
      changeGeolocation={changeGeolocation}
      geolocation={geolocation}
    />
  );
};

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    checked: null,
    region: {
      latitude: '',
      longitude: '',
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    showAlert: false,
    modalLogout: false,
    modalchecked: false,
    showAnimation: true,
    exitVolunteer: false,
    reset: '',
  };

  async componentDidMount() {
    const checkedAsync = await AsyncStorage.getItem('checked');

    if (checkedAsync) {
      this.setState({checked: checkedAsync});
    } else {
      this.setState({checked: 'second'});
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleYes = async () => {
    const {userData, token} = this.props;

    const body = {email: userData.email, is_sick: true};

    const response = await api.put('volunteers', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    AsyncStorage.setItem('checked', 'first');
    this.setState({showAlert: true});
  };

  handleNo = async () => {
    const {userData, token} = this.props;
    const body = {email: userData.email, is_sick: false};
    const response = await api.put('volunteers', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    AsyncStorage.setItem('checked', 'second');
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  handleNavigateToTalk = () => {
    const {navigation} = this.props;

    navigation.navigate('Talk');
  };

  handleNavigateToOrientation = () => {
    const {navigation} = this.props;

    navigation.navigate('Orientation');
  };

  handleNavigateToMyOrientation = () => {
    const {navigation} = this.props;

    navigation.navigate('MyOrientation');
  };

  handleNavigateToNewOrientation = () => {
    const {navigation} = this.props;

    navigation.navigate('NewOrientation');
  };

  handleLogout = async () => {
    const {navigation} = this.props;
    const {reset} = this.state;

    this.setState({reset: true});
    await AsyncStorage.clear();

    navigation.navigate('Main', {reset: true});
  };

  handleLeaveVolunteer = async () => {
    const {userData, token} = this.props;
    const body = {email: userData.email, quit: true};
    const response = await api.put('quitVolunteer', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  handleBackButton = () => {
    this.setState({modalLogout: true});
    return true;
  };

  render() {
    const {
      checked,
      showAlert,
      modalLogout,
      modalchecked,
      showAnimation,
      exitVolunteer,
    } = this.state;
    const {userData} = this.props;

    console.log(userData);

    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#0039A6" />
        <Modal
          animationType="fade"
          transparent
          visible={modalLogout}
          onRequestClose={() => this.setState({modalLogout: false})}>
          <ModalContainer>
            <ModalView>
              <ModalText>Deseja realmente sair?</ModalText>
              <RowView>
                <ModalButtonCancel
                  onPress={() => this.setState({modalLogout: false})}>
                  <ModalButtonText>Cancelar</ModalButtonText>
                </ModalButtonCancel>
                <ModalButtonSair
                  onPress={() => {
                    this.setState({modalLogout: false});
                    this.handleLogout();
                  }}>
                  <ModalButtonTextSair>Sair</ModalButtonTextSair>
                </ModalButtonSair>
              </RowView>
              <ModalViewAnimation>
                <Lottie resizeMode="contain" source={leave} autoPlay loop />
              </ModalViewAnimation>
            </ModalView>
          </ModalContainer>
        </Modal>

        <QuestionText>
          Bem-vindo, {userData ? userData.name : 'Usuário'} !
        </QuestionText>

        <CardView>
          {userData.link_unb === 'Docente' ? (
            <Card onPress={() => this.handleNavigateToOrientation()}>
              <LargeImage
                source={require('../../assets/images/online-class.png')}
              />
              <Text>Pedidos Orientação</Text>
            </Card>
          ) : null}

          {userData.link_unb === 'Discente' ? (
            <Card onPress={() => this.handleNavigateToNewOrientation()}>
              <Image source={require('../../assets/images/opportunity.png')} />
              <Text m>Solicitar Orientação</Text>
            </Card>
          ) : null}

          <Card onPress={() => this.handleNavigateToMyOrientation()}>
            <Image source={require('../../assets/images/document.png')} />
            <Text m>Minhas Orientações</Text>
          </Card>
          <Card onPress={() => this.handleNavigateToTalk()}>
            <Image source={require('../../assets/images/reception.png')} />
            <Text>Fale Conosco</Text>
          </Card>
        </CardView>

        <LogoutView>
          <LogoutButton onPress={() => this.setState({modalLogout: true})}>
            <Icon name="exit-to-app" size={33} color={colors.white} />
          </LogoutButton>
        </LogoutView>
      </Container>
    );
  }
}

export default withZustand(Home);
