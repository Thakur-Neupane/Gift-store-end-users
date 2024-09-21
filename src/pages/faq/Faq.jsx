import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

import { useState } from "react";
import { faqs } from "../../data/faqData";

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFAQs, setCurrentFAQs] = useState(faqs.slice(0, 10));
  const [visibleCount, setVisibleCount] = useState(10);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentFAQs(
      faqs
        .filter((faq) => faq.question.toLowerCase().includes(value))
        .slice(0, visibleCount)
    );
  };

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + 10;
    setVisibleCount(newVisibleCount);
    setCurrentFAQs(
      faqs
        .filter((faq) => faq.question.toLowerCase().includes(searchTerm))
        .slice(0, newVisibleCount)
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-fill py-5">
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1 className="text-center mb-4">Frequently Asked Questions</h1>

              <InputGroup className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>

              <Accordion defaultActiveKey="0">
                {currentFAQs.map((faq, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>

              {faqs.filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm)
              ).length > visibleCount && (
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Faq;
