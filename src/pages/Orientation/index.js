/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ScrollView,
  TextInput,
  Linking,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
  Modal,
  Picker,
} from 'react-native';

import {
  Container,
  CardContainer,
  Text,
  ButtonFilter,
  ButtonText,
  Input,
  ModalView,
  ModalText,
  DescriptionText,
  ModalButtonSair,
  ModalButtonTextSair,
  ModalContainer,
  TextView,
  PickerView,
  LogoutButton,
  LogoutView,
} from './styles';
import {colors} from '../../styles';

import useAuth from '../../store';

import api from '../../services/api';
import {SubContainer} from '../MyOrientation/styles';

const withZustand = (Comp) => (props) => {
  const {token, userData} = useAuth();
  return <Comp {...props} token={token} userData={userData} />;
};

class Orientation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientations: [],
      query: '',
      loading: false,
      modal: false,
      data: [],
    };
  }

  async componentDidMount() {
    const {token} = this.props;

    try {
      const response = await api.get('/orientations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.setState({orientations: response.data});
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

  filterByDepartament = async () => {
    const {token} = this.props;

    try {
      const response = await api.get(`/orientations?dep=${this.state.query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      this.setState({orientations: response.data});
    } catch (err) {
      console.log(err);
    }
  };

  confirmAndSendMail = (item) => {
    this.setState({modal: true, data: item});
  };

  sendMail = async () => {
    const {data} = this.state;
    const {token, userData} = this.props;

    try {
      const response = await api.put(
        `/orientations/${data.id}`,
        {
          professor_id: userData.id,
          status: 'answering',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }

    Linking.openURL(
      `mailto:${data.user.email}?subject=UnB Solidária - Solicitação de Orientação&body=Caro(a) ${data.user.name}, \nvi seu pedido de orientação e gostaria de auxiliá-lo.\n\nResponda este email caso ainda deseje orientação.`
    );
  };

  render() {
    const {orientations, loading, modal, query} = this.state;

    return (
      <Container>
        {modal ? (
          <Modal
            animationType="fade"
            transparent
            visible={modal}
            onRequestClose={() => this.setState({modal: false})}>
            <ModalContainer>
              <ModalView>
                <DescriptionText>Deseja iniciar orientação?</DescriptionText>
                <ModalButtonSair
                  onPress={() => {
                    this.setState({modal: false});
                    this.sendMail();
                  }}>
                  <ModalButtonTextSair>Orientar</ModalButtonTextSair>
                </ModalButtonSair>

                <ModalButtonSair
                  onPress={() => {
                    this.setState({modal: false});
                  }}>
                  <ModalButtonTextSair>Agora não</ModalButtonTextSair>
                </ModalButtonSair>
              </ModalView>
            </ModalContainer>
          </Modal>
        ) : null}

        <PickerView>
          <Picker
            selectedValue={query}
            onValueChange={(value) => this.setState({query: value})}>
            <Picker.Item label="Departamentos" value="" />
            <Picker.Item
              label="CENTRO DE APOIO AO DESENVOLVIMENTO TECNOLÓGICO"
              value="CDT"
            />
            <Picker.Item
              label="CENTRO DE DESENVOLVIMENTO SUSTENTÁVEL"
              value="CDS"
            />
            <Picker.Item
              label="CENTRO DE ESTUDOS AVANÇADOS E MULTIDISCIPLINARES"
              value="CEAM"
            />
            <Picker.Item label="DEPARTAMENTO DE ANTROPOLOGIA" value="DAN" />
            <Picker.Item label="DEPARTAMENTO DE ARTES CÊNICAS" value="CEN" />
            <Picker.Item label="DEPARTAMENTO DE ARTES VISUAIS" value="VIS" />
            <Picker.Item label="DEPARTAMENTO DE BIOLOGIA CELULAR" value="CEL" />
            <Picker.Item label="DEPARTAMENTO DE BOTÂNICA" value="BOT" />
            <Picker.Item
              label="DEPARTAMENTO DE CIÊNCIA DA COMPUTAÇÃO"
              value="CIC"
            />
            <Picker.Item
              label="DEPARTAMENTO DE CIÊNCIAS FISIOLÓGICAS"
              value="CFS"
            />
            <Picker.Item label="DEPARTAMENTO DE DESIGN" value="DIN" />
            <Picker.Item label="DEPARTAMENTO DE ECOLOGIA" value="ECL" />
            <Picker.Item label="DEPARTAMENTO DE ECONOMIA" value="ECO" />
            <Picker.Item label="DEPARTAMENTO DE ENFERMAGEM" value="ENF" />
            <Picker.Item
              label="DEPARTAMENTO DE ENGENHARIA CIVIL E AMBIENTAL"
              value="ENC"
            />
            <Picker.Item
              label="DEPARTAMENTO DE ENGENHARIA ELÉTRICA"
              value="ENE"
            />
            <Picker.Item
              label="DEPARTAMENTO DE ENGENHARIA FLORESTAL"
              value="EFL"
            />
            <Picker.Item
              label="	DEPARTAMENTO DE ENGENHARIA MECÂNICA"
              value="ENM"
            />
            <Picker.Item label="DEPARTAMENTO DE ESTATÍSTICA" value="EST" />
            <Picker.Item
              label="DEPARTAMENTO DE ESTUDOS LATINO-AMERICANOS"
              value="ELA"
            />
            <Picker.Item label="DEPARTAMENTO DE FILOSOFIA" value="FIL" />
            <Picker.Item label="DEPARTAMENTO DE FITOPATOLOGIA" value="FIT" />
            <Picker.Item
              label="DEPARTAMENTO DE GENÉTICA E MORFOLOGIA"
              value="GEM"
            />
            <Picker.Item label="DEPARTAMENTO DE GEOGRAFIA" value="GEA" />
            <Picker.Item label="DEPARTAMENTO DE HISTÓRIA" value="HIS" />
            <Picker.Item
              label="DEPARTAMENTO DE LÍNGUAS ESTRANGEIRAS E TRADUÇÃO"
              value="LET"
            />
            <Picker.Item
              label="DEPARTAMENTO DE LINGUÍSTICA, PORTUGUÊS, LÍNG CLÁS"
              value="LIP"
            />
            <Picker.Item label="DEPARTAMENTO DE MATEMÁTICA" value="MAT" />
            <Picker.Item label="DEPARTAMENTO DE MÚSICA" value="MUS" />
            <Picker.Item
              label="DEPARTAMENTO DE PROCESSOS PSICOLOGICOS BÁSICOS"
              value="PPB"
            />
            <Picker.Item
              label="DEPARTAMENTO DE PSIC.ESCOLAR E DO DESENVOLVIMENTO"
              value="PED"
            />
            <Picker.Item
              label="DEPARTAMENTO DE PSICOLOGIA CLÍNICA"
              value="PCL"
            />
            <Picker.Item
              label="DEPARTAMENTO DE PSICOLOGIA SOCIAL E DO TRABALHO"
              value="PST"
            />
            <Picker.Item label="DEPARTAMENTO DE SAÚDE COLETIVA" value="DSC" />
            <Picker.Item label="DEPARTAMENTO DE SERVIÇO SOCIAL" value="SER" />
            <Picker.Item label="DEPARTAMENTO DE SOCIOLOGIA" value="SOL" />
            <Picker.Item
              label="DEPARTAMENTO DE TEORIA LITERÁRIA E LITERATURA"
              value="TEL"
            />
            <Picker.Item label="DEPARTAMENTO DE ZOOLOGIA" value="ZOO" />
            <Picker.Item
              label="DEPTO DE CIÊNCIAS CONTÁBEIS E ATUARIAIS"
              value="CCA"
            />
            <Picker.Item
              label="DIREÇÃO DA FACULDADE DE ARQUITETURA E URBANISMO"
              value="FAU"
            />
            <Picker.Item
              label="DIREÇÃO DO INSTITUTO CIÊNCIAS BIOLÓGICAS"
              value="IBD"
            />
            <Picker.Item
              label="FACULD. DE ECONOMIA, ADMINISTRAÇÃO E CONTABILIDADE"
              value="FACE"
            />
            <Picker.Item
              label="FACULDADE DE AGRONOMIA E MEDICINA VETERINÁRIA"
              value="FAV"
            />
            <Picker.Item
              label="FACULDADE DE CIÊNCIA DA INFORMAÇÃO"
              value="FCI"
            />
            <Picker.Item label="FACULDADE DE CIÊNCIAS DA SAÚDE" value="FS" />
            <Picker.Item label="FACULDADE DE COMUNICAÇÃO" value="FAC" />
            <Picker.Item label="FACULDADE DE DIREITO" value="FDD" />
            <Picker.Item label="FACULDADE DE EDUCAÇÃO" value="FE" />
            <Picker.Item label="FACULDADE DE EDUCAÇÃO FÍSICA" value="FEF" />
            <Picker.Item label="FACULDADE DE MEDICINA" value="FMD" />
            <Picker.Item label="FACULDADE DE TECNOLOGIA" value="FT" />
            <Picker.Item label="INSTITUTO DE ARTES" value="IDA" />
            <Picker.Item label="INSTITUTO DE CIÊNCIA POLÍTICA" value="IPOL" />
            <Picker.Item label="INSTITUTO DE CIÊNCIAS BIOLÓGICAS" value="IB" />
            <Picker.Item label="INSTITUTO DE CIÊNCIAS HUMANAS" value="IH" />
            <Picker.Item label="INSTITUTO DE FÍSICA" value="IFD" />
            <Picker.Item label="INSTITUTO DE GEOCIÊNCIAS" value="IGD" />
            <Picker.Item label="INSTITUTO DE LETRAS" value="IL" />
            <Picker.Item label="INSTITUTO DE QUÍMICA" value="IQD" />
            <Picker.Item
              label="INSTITUTO DE RELAÇÕES INTERNACIONAIS"
              value="IREL"
            />
            <Picker.Item label="NÚCLEO DE MEDICINA TROPICAL" value="NMT" />
          </Picker>
        </PickerView>

        <ButtonFilter loading={loading} onPress={this.filterByDepartament}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <ButtonText>FILTRAR POR DEPARTAMENTO</ButtonText>
          )}
        </ButtonFilter>
        <ScrollView showsVerticalScrollIndicator={false}>
          {orientations.map((item) =>
            item.status === 'open' ? (
              <CardContainer
                onPress={() => this.confirmAndSendMail(item)}
                key={item.id}>
                <TextView>
                  <Text>Departamento: {item.departament}</Text>
                </TextView>

                <TextView>
                  <Text>Título: {item.title}</Text>
                </TextView>

                <TextView>
                  <Text>Resumo: {item.details}</Text>
                </TextView>
              </CardContainer>
            ) : null
          )}

          <LogoutView>
            <LogoutButton onPress={() => this.handleBackButton()}>
              <Icon name="exit-to-app" size={33} color={colors.white} />
            </LogoutButton>
          </LogoutView>
        </ScrollView>
      </Container>
    );
  }
}

export default withZustand(Orientation);
