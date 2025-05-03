import { MantineProvider } from "@mantine/core";
import { AppRouter } from "./AppRouter";
import styleClasses from "./app.module.css";
import { MessageProvider } from "./components/shared/core/MessageContext";

function App() {
  return (
    <MantineProvider>
      <MessageProvider>
        <div className={styleClasses["app-layout"]}>
          <AppRouter />
        </div>
      </MessageProvider>
    </MantineProvider>
  );
}

export default App;
