import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Main from "./components/common/Main";
import {EmploymentInfo} from './features/employment/EmploymentInfo';
import {USAVisaInfo} from './features/visa/USAVisaInfo';
import {CanadaVisaInfo} from './features/visa/CanadaVisaInfo';
import {Success} from './components/common/Success';
import {NotFoundPage} from './components/common/NotFoundPage';
import {TestComponents} from './components/shared/TestComponents';
import {MembershipPage} from './features/membership/MembershipPage';
import {Community} from './features/community/Community';
import {CommunityForm} from './features/community/CommunityForm';
import {CommunityDetail} from "./features/community/CommunityDetail";
import {SignIn} from './features/auth/SignIn';
import {SignUp} from './features/auth/SignUp';
import {InterviewGuide} from './features/employment/InterviewGuide';
import {WorkPermit} from './features/employment/WorkPermit';
import {USASalaryInfo} from './components/salary/USASalaryInfo';
import {CanadaSalaryInfo} from './components/salary/CanadaSalaryInfo';
import {USALifeInfo} from './components/life/USALifeInfo';
import {CanadaLifeInfo} from './components/life/CanadaLifeInfo';
import {MyPage} from "./components/MyPage";
import {HelmetProvider} from 'react-helmet-async';
import {TermsAndConditions} from './components/legal/TermsAndConditions';
import {PrivacyPolicy} from './components/legal/PrivacyPolicy';
import {UserInfo} from "./features/auth/UserInfo";
import {AdminDashboard} from "./features/admin/AdminDashboard";
import {AdminLayout} from './features/admin/AdminLayout';
import {AdminUserManagement} from "./features/admin/AdminUserManagement";
import {AdminCover} from "./features/admin/AdminCover";
import ProtectedRoute from "./config/ProtectedRoute";
import {AdminCommunityManagement} from "./features/admin/AdminCommunityManagement";
import {AdminCodesManagement} from "./features/admin/AdminCodesManagement";
import {AdminNewsletterManagement} from "./features/admin/AdminNewsletterManagement";
import {CommunityAnswer} from "./features/community/CommunityAnswer";
import Contact from "./components/contactus/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Main />
      },
        {
        path: "my-page",
        element: <MyPage />
      },
      {
        path: "test",
        element: <TestComponents />
      },
      // {
      //   path: "seminar-info",
      //   element: <Seminar />
      // },
      // {
      //   path: "company-information",
      //   element: <CompanyInformation />
      // },
      {
        path: "employment-info",
        element: <EmploymentInfo />
      },
      {
        path: "visa-info/usa",
        element: <USAVisaInfo />
      },
      {
        path: "visa-info/canada",
        element: <CanadaVisaInfo />
      },
      {
        path: "salary-info/usa",
        element: <USASalaryInfo />
      },
      {
        path: "salary-info/canada",
        element: <CanadaSalaryInfo />
      },
      {
        path: "life-info/usa",
        element: <USALifeInfo />
      },
      {
        path: "life-info/canada",
        element: <CanadaLifeInfo />
      },
      {
        path: "work-permit",
        element: <WorkPermit />
      },
      {
        path: "interview-guide",
        element: <InterviewGuide />
      },
      {
        path: "interview-guide/technical",
        element: <InterviewGuide />
      },
      {
        path: "interview-guide/behavioral",
        element: <InterviewGuide />
      },
      {
        path: "interview-guide/coding-test",
        element: <InterviewGuide />
      },
      {
        path: "community",
        element: <Community />
      },
      {
        path: "community/post",
        element: <CommunityForm />
      },
      {
        path: "community/detail/:id",
        element: <CommunityDetail />
      },
      {
        path: "community/answer/:id",
        element: <CommunityAnswer />
      },
      // {
      //   path: "tips",
      //   element: <Tips />
      // },
      // {
      //   path: "tips/posting",
      //   element: <TipsPosting />
      // },
      // {
      //   path: "about-us",
      //   element: <AboutUs />
      // },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "signin",
        element: <SignIn />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "user-info/:id",
        element: <UserInfo />
      },
      {
        path: "success",
        element: <Success />
      },
      {
        path: "membership",
        element: <MembershipPage />
      },
      {
        path: "terms",
        element: <TermsAndConditions />
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />
      },
      {
        path: "admin",
        element:
            <ProtectedRoute>
              <AdminLayout />,
            </ProtectedRoute>,
        children: [
          {
            path: "",
            element: <AdminDashboard />
          },
          {
            path: "users",
            element: <AdminUserManagement />
          },
          {
            path: "posts",
            element: <AdminCommunityManagement />
          },
          {
            path: "newsletter",
            element: <AdminNewsletterManagement />
          },
          {
            path: "mails",
            element: <AdminCover />
          },
          {
            path: "codes",
            element: <AdminCodesManagement />
          }
        ]
      }
    ]
  }
]);

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
