import React, { useState } from "react";
import { Button, Form, Input, Checkbox, message } from "antd";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/register.json";
import "./register.css"; // Assuming you have a CSS file for styles
import { auth } from "../../firebase/main";
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import loadingAnimation from "../../assets/animations/loading.json"; // Import your loading animation
interface LoginPageProps {
  // You might pass a function to handle successful login, e.g., onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
  
	const onFinish = async (values: any) => {
	  setLoading(true);
	  try {
		const persistenceType = values.remember
		  ? browserLocalPersistence
		  : browserSessionPersistence;
  
		// Устанавливаем нужный тип хранения сессии
		await setPersistence(auth, persistenceType);
  
		// Логиним пользователя
		const userCredential = await signInWithEmailAndPassword(
		  auth,
		  values.email,
		  values.password
		);
  
		message.success("Успешный вход!");
  
	  } catch (error: any) {
		console.error("Login error:", error);
		message.error(error.message || "Ошибка входа. Попробуйте снова.");
	  } finally {
		setLoading(false);
		navigate("/profile"); // Или куда нужно направить
	  }
	};

	if (loading) {
		<Lottie animationData={loadingAnimation} loop={true} className="lottie-adaptive" />;
	} 

  return (
    <div className="login-container">
      <Lottie animationData={animationData} loop={true} className="lottie-adaptive" />

      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="login-form"
      >
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }, { type: 'email', message: 'Please enter a valid email!' }]}
        >
          <Input className="custom-textarea" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="custom-textarea" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" className="remember-me-checkbox">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;