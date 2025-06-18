import { useState } from "react";
import { Button, Form, Input, message, Radio } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/main"; // db — firestore
import { doc, setDoc } from "firebase/firestore";
import animationData from "../../assets/animations/register.json";
import loadingIcon from "../../assets/animations/loading.json";
import "./register.css"
import Lottie from "lottie-react";
import ProfileDetails from "./ProfileDetails";


const RegisterPage = () => {

  const [loading, setLoading] = useState(false);
  const [registeredUserId, setRegisteredUserId] = useState<string | null>(null);


  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      // Сохраняем данные пользователя в Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        gender: values.gender,
        createdAt: new Date(),
      });

      message.success("Регистрация успешна!");
		setRegisteredUserId(userCredential.user.uid); // Сохраняем ID зарегистрированного пользователя

    } catch (error: any) {
      message.error(error.message || "Ошибка регистрации");
    } finally {
      setLoading(false);
	}
  };

  if (loading) {
	return <Lottie animationData={loadingIcon} loop={true} style={{maxWidth : '500px',maxHeight : '400px', margin : "0 auto"}}/>; // <- Показываем анимацию загрузки
  }

  if (registeredUserId) {
    return <ProfileDetails userId={registeredUserId} />; // <- Показываем профиль
  }

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }} className="register-container">
	  <Lottie animationData={animationData} loop={true}   className="lottie-adaptive" />
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Type your email" }]}
        >
          <Input 
		  className="custom-textarea"
		  />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password please" }]}
        >
          <Input.Password 
		  className="custom-textarea"
		  />
        </Form.Item>

		<Form.Item
          label="Confirm Password"
          name="confirmPassword"
		  dependencies={['password']}
          rules={[{ required: true, message: "Confirm password" },({ getFieldValue }) => ({
			validator(_, value) {
			  if (!value || getFieldValue('password') === value) {
				return Promise.resolve();
			  }
			  return Promise.reject(new Error('Passwords do not match'));
			},
		  }),
		]}
        >
          <Input.Password 
		  className="custom-textarea"
		  />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Выберите пол" }]}
        >
          <Radio.Group className="gender-radio-group">
			<Radio value="male">Male</Radio>
			<Radio value="female">Female</Radio>
		</Radio.Group>
		</Form.Item>

		<Form.Item>
			<Button type="primary" htmlType="submit" block loading={loading}>
				Register
			</Button>
		</Form.Item>	
		</Form>
	</div>
  );
};

export default RegisterPage;
