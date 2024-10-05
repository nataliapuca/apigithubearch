import { Container } from "@mui/material";

import { Form } from "./components/Form/Form";
import { Header } from "./components/Header/Header";
import { InfoBar } from "./components/InfoBar/InfoBar";
import { UsersList } from "./components/UsersList/UsersList";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <Container maxWidth="sm">
      <Header title="Github Search" />
      <Form />
      <InfoBar />
      <UsersList />
      <ScrollToTop />
    </Container>
  );
}

export default App;
