import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigations/Navigations";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
