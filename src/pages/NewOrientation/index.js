/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  BackHandler,
  ActivityIndicator,
  Modal,
  Picker,
} from 'react-native';

import {
  Container,
  Input,
  HeaderTitle,
  HeaderText,
  Button,
  ButtonText,
  ModalContainer,
  ModalButtonSair,
  ModalButtonTextSair,
  ModalText,
  ModalView,
  RowView,
  PickerView,
} from './styles';

import useAuth from '../../store';

import api from '../../services/api';

const withZustand = (Comp) => (props) => {
  const {token, userData} = useAuth();
  return <Comp {...props} token={token} userData={userData} />;
};

class NewOrientation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departament: '',
      title: '',
      details: '',
      loading: false,
      modalHome: false,
      modalError: false,
    };
  }

  componentDidMount() {
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

  handleHome = async () => {
    const {navigation} = this.props;

    this.setState({modalHome: false});

    navigation.navigate('Home');
  };

  createOrientation = async () => {
    const {departament, title, details} = this.state;
    const {token} = this.props;

    try {
      const response = await api.post(
        '/orientations',
        {departament, details, title},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      this.setState({modalHome: true});
    } catch (err) {
      this.setState({modalError: true});
      console.log(err);
    }
  };

  render() {
    const {loading, modalHome, modalError, departament} = this.state;

    return (
      <Container>
        <HeaderTitle>
          <HeaderText>Minhas Orientações</HeaderText>
        </HeaderTitle>

        <Modal
          animationType="fade"
          transparent
          visible={modalHome}
          onRequestClose={() => this.setState({modalHome: false})}>
          <ModalContainer>
            <ModalView>
              <ModalText>Solicitação enviada!</ModalText>
              <ModalButtonSair
                onPress={() => {
                  this.handleHome();
                }}>
                <ModalButtonTextSair>OK</ModalButtonTextSair>
              </ModalButtonSair>
            </ModalView>
          </ModalContainer>
        </Modal>

        <Modal
          animationType="fade"
          transparent
          visible={modalError}
          onRequestClose={() => this.setState({modalError: false})}>
          <ModalContainer>
            <ModalView error>
              <ModalText>Erro na solicitação, tente novamente.</ModalText>
              <ModalButtonSair
                onPress={() => {
                  this.setState({modalError: false});
                }}>
                <ModalButtonTextSair>OK</ModalButtonTextSair>
              </ModalButtonSair>
            </ModalView>
          </ModalContainer>
        </Modal>

        <PickerView>
          <Picker
            selectedValue={departament}
            onValueChange={(value) => this.setState({departament: value})}>
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

        <Input
          autoCorrect={false}
          autoCapitalize="words"
          placeholder="Título"
          onChangeText={(text) => this.setState({title: text})}
        />
        <Input
          autoCorrect={false}
          autoCapitalize="sentences"
          placeholder="Resumo"
          onChangeText={(text) => this.setState({details: text})}
          multiline
          resumo
        />

        <Button loading={loading} onPress={this.createOrientation}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <ButtonText>ENVIAR SOLICITAÇÃO</ButtonText>
          )}
        </Button>
      </Container>
    );
  }
}
export default withZustand(NewOrientation);
