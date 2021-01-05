import React, { useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErros from '../../utils/getValdationErrors';
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async(data: SignInFormData) => {

    try {

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Digite a senha'),
      });

      await schema.validate(data, {
        abortEarly: false,
      })
      await signIn({
        email: data.email,
        password: data.password,
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        formRef.current?.setErrors(errors);
      } else {
        addToast({
          type: 'error',
          title: 'Erro de autenticação',
          description: 'Login inválido! Cheque as credenciais.'
        });
      }
    }
  }, [signIn, addToast]);
  return(
    <Container>

        <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref = { formRef } onSubmit = { handleSubmit }>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
            <Button type="submit">Entrar</Button>
            <Link to = "forgot">Esqueci minha senha</Link>
          </Form>

          <Link to = "/signup"><FiLogIn />Criar conta</Link>
          </AnimationContainer>
        </Content>

      <Background />
    </Container>
  );
}

export default SingIn;
