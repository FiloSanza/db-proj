import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { httpHelper } from '../helpers/httpHelper';

const Login = () => {
  const [state, setState] = useState({
    user: null,
    isCliente: false,
    message: null
  });

  const [email, setEmail] = useState({
    guida: "",
    cliente: ""
  });

  const urlClienti = "http://localhost:8080/api/auth/loginCliente";
  const urlGuida = "http://localhost:8080/api/auth/loginGuida";
  const api = httpHelper();
  
  useEffect(() => {
    updateLabel();
  }, [])
  
  const updateLabel = () => {
    let cliente = Cookies.get('cliente');
    if (cliente) {
      setState({
        user: cliente,
        isCliente: true,
        message: <strong>Hai fatto l'accesso come cliente: {cliente}</strong>
      });
      return;
    }
    let guida = Cookies.get('guida');
    if (guida) {
      setState({
        user: guida,
        isCliente: false,
        message: <strong>Hai fatto l'accesso come guida: {guida}</strong>
      });
      return;
    }

    setState({
      ...state,
      message: <strong>Non hai eseguito l'accesso.</strong>
    })
  }

  const isLoggedIn  = () => {
    return Cookies.get('guida') !== undefined || 
      Cookies.get('cliente') !== undefined;
  }

  const loginCliente = e => {
    e.preventDefault();

    api.post(`${urlClienti}`, { 
      body: { email: email.cliente },
      credentials: 'include'
    })
    .then(res => updateLabel())
    .catch(err => alert(err));
  }
  
  const loginGuida = e => {
    e.preventDefault();

    api.post(`${urlGuida}`, { 
      body: { email: email.guida },
      credentials: 'include'
    })
    .then(res => updateLabel())
    .catch(err => console.log(err));
  }

  const handleValue = e => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value
    });
  }

  const logout = e => {
    e.preventDefault();

    Cookies.remove('guida');
    Cookies.remove('cliente');

    setEmail({
      guida: "",
      cliente: ""
    });

    updateLabel();
  }
  
  let loginForm = (
    <>
      <Form onSubmit={loginCliente}>
        <Form.Group>
          <Form.Label>
            Email Cliente
          </Form.Label>
          <Form.Control type="email" placeholder="Email" name="cliente" onChange={handleValue} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Form onSubmit={loginGuida}>
        <Form.Group>
          <Form.Label>
            Email Guida
          </Form.Label>
          <Form.Control type="email" placeholder="Email" name="guida" onChange={handleValue} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );

  let logoutForm = (
    <>
      <Form onSubmit={logout}>
        <Button type="submit">Logout</Button>
      </Form>
    </>
  )

  return (
    <>
      { state.message }
      { !isLoggedIn() && loginForm }
      { isLoggedIn() && logoutForm }
    </>
  );
}

export default Login; 