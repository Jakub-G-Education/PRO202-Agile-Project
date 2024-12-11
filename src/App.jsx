import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, ManagePage } from "./pages";
import AddPage from "./pages/AddPage";
import DashboardPage from "./pages/DashboardPage";
import { EventsProvider } from "./contexts/EventsContext";
import { MeetingsProvider } from "./contexts/MeetingsContext";
import { BirthdaysProvider } from "./contexts/BirthdaysContext";
import { WorkshopsProvider } from "./contexts/WorkshopsContext";
import { MealsProvider } from "./contexts/MealsContext"; 
import EditMenu from "./components/menu/EditMenu";
import { InfosProvider } from "./contexts/InfosContext";
import { PhotosProvider } from "./contexts/PhotosContext";

function App() {
  return (
    <BrowserRouter>
      <EventsProvider>
        <MeetingsProvider>
          <BirthdaysProvider>
            <WorkshopsProvider>
              <MealsProvider>
                <InfosProvider>
                  <PhotosProvider>
                {" "}
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="manage" element={<ManagePage />} />
                  <Route path="add" element={<AddPage />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="edit-menu" element={<EditMenu />} />{" "}
                </Routes>
                </PhotosProvider>
                </InfosProvider>
              </MealsProvider>
            </WorkshopsProvider>
          </BirthdaysProvider>
        </MeetingsProvider>
      </EventsProvider>
    </BrowserRouter>
  );
}

export default App;
