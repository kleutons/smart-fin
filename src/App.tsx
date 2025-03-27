import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./app/HomePage";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import LoginPage from "./app/LoginPage";
import AppLayout from "./layout/AppLayout";
import TransactionsPage from "./app/TransactionsPage";
import CategoryPage from "./app/CategoryPage";
import ProfilePage from "./app/user/ProfilePage";
import ProfileEdit from "./app/user/ProfileEdit";
import EditPassword from "./app/user/EditPassword";
import DevPage from "./app/DevPage";
import TransactionsAction from "./app/TransactionsAction";
import CategoryAction from "./app/CategoryAction";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateAccountPage from "./app/CreateAccountPage";
import TesterPage from "./app/TesterPage";


function App() {

  return (
   <BrowserRouter basename="/smart-fin">
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/tester" element={<TesterPage />} />
      <Route path="/" element={<ProtectedRoute element={<AppLayout />} />}>
        <Route index                         element={<HomePage />} />
        <Route path="/transactions"          element={<TransactionsPage />} />
        <Route path="/transactions/action/:id?"   element={<TransactionsAction />} />
        <Route path="/categories"            element={<CategoryPage />} />
        <Route path="/categories/action/:id?" element={<CategoryAction />} />

        <Route path="/profile"              element={<ProfilePage />} />
        <Route path="profile/edit"          element={<ProfileEdit />} />
        <Route path="/profile/password"     element={<EditPassword />} />

        <Route path="/dev"                  element={<DevPage />} />
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
