import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';

const SingUp: React.FC = () => {
  const handleSubmit = useCallback(async(data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Digite a senha'),
      });

      await schema.validate(data, {
        abortEarly: false,
      })

    } catch (error) {
      console.log(error);

    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
          <Button>Cadastrar</Button>
        </Form>

        <a href="login"><FiArrowLeft />Voltar para logon</a>
      </Content>
    </Container>
  );
};

export default SingUp;