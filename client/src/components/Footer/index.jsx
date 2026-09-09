import { Link } from 'react-router-dom';
import Copyright from './Copyright';
import { Typography, Row, Col } from 'antd';
import { assets } from '../../assets/assets';

const Footer = () => {
  const {logo}=assets;
  const { Title, Paragraph } = Typography;

  return (
    <footer className="container border-top pt-2">
      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} lg={10}>
  <div className="d-flex align-items-center mb-3">
    <img loading="eager"
  fetchPriority="high" width={50} height={50} src={logo} alt="logo" className="me-2" />
    <Title level={4} className="mb-0">Appointy</Title>
  </div>
  <Paragraph type="secondary">
  Patients can instantly book appointments with trusted doctors from routine check-ups to specialist care in just a few clicks. Our smart reminders keep appointments on track, while real-time updates ensure seamless coordination. Designed for modern healthcare, we save time for both patients and providers.
  </Paragraph>
</Col>

        <Col lg={12} xl={12} sm={24} xs={24}>
          <Row gutter={[16, 16]} justify="end">
            <Col xs={12} sm={12}>
              <Title level={4}>Company</Title>
              <div className="d-flex flex-column gap-1">
                <Link to="/" className="link-body-emphasis text-decoration-none">Home</Link>
                <Link to="/about" className="link-body-emphasis text-decoration-none">About Us</Link>
                <Link to="/delivery" className="link-body-emphasis text-decoration-none">Delivery</Link>
                <Link to="/privacy" className="link-body-emphasis text-decoration-none">Privacy Policy</Link>
                <Link to="/terms" className="link-body-emphasis text-decoration-none">Terms & Conditions</Link>
                <Link to="/careers" className="link-body-emphasis text-decoration-none">Careers</Link>
              </div>
            </Col>

            <Col xs={12} sm={12}>
              <Title level={4}>Get In Touch</Title>
              <div className="d-flex flex-column gap-1">
                <a href="tel:+923000000000" className="link-body-emphasis text-decoration-none">+92-3000000000</a>
                <a href="mailto:vibecart@gmail.com" className="link-body-emphasis text-decoration-none">appointy@gmail.com</a>
                <Link to="/support" className="link-body-emphasis text-decoration-none">Support Center</Link>
                <Link to="/faqs" className="link-body-emphasis text-decoration-none">FAQs</Link>
                <Link to="/chat" className="link-body-emphasis text-decoration-none">Live Chat</Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Copyright />
    </footer>
  );
};

export default Footer;