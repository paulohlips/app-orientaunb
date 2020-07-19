/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/static-property-placement */
/* eslint-disable global-require */
/* eslint-disable react/state-in-constructor */
import React, {Component} from 'react';
import {BackHandler, ScrollView} from 'react-native';
import useAuth from '../../store';
import api from '../../services/api';

import {
  Container,
  SubContainer,
  CardContainer,
  HeaderTitle,
  HeaderText,
  TextView,
  Text,
  TextTeste,
  PickerView,
  Favorite,
  CloseView,
  CloseButton,
  TextClose,
} from './styles';

const withZustand = (Comp) => (props) => {
  const {token, userData} = useAuth();
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
    const {token, userData} = this.props;
    try {
      const response = await api.get(`/orientations/${userData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.setState({myOrientations: response.data});
    } catch (err) {
      console.log(err);
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    const {navigation} = this.props;
    navigation.navigate('Home');
    return true;
  };

  checkOwner(user, orientationOwner) {
    if ((user = orientationOwner)) {
      return true;
    }
    return false;
  }

  render() {
    const {myOrientations, lista} = this.state;
    const {userData} = this.props;
    return (
      <Container>
        <HeaderTitle>
          <HeaderText>Minhas Orientações </HeaderText>
        </HeaderTitle>

        <ScrollView showsVerticalScrollIndicator={false}>
          {myOrientations.map((item) =>
            this.checkOwner(userData.id, item.professor_id) ? (
              <CardContainer>
                <TextView>
                  <Text b>Departamento: </Text>
                  <Text>{item.departament}</Text>
                </TextView>
                <TextView>
                  <Text b>Título: </Text>
                  <Text>{item.title}</Text>
                </TextView>
                <TextView>
                  <Text b>Resumo: </Text>
                  <TextTeste>{item.details}</TextTeste>
                </TextView>
                <CloseView>
                  <CloseButton
                    onPress={() => {
                      this.handleClose(item.id);
                    }}>
                    <TextClose>Encerrar orientação</TextClose>
                  </CloseButton>
                </CloseView>
              </CardContainer>
            ) : null
          )}
          {!myOrientations ? (
            <Text>Departamento: Você ainda não possui orientações!</Text>
          ) : null}
        </ScrollView>
      </Container>
    );
  }
}

export default withZustand(Student);
