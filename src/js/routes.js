

import HomePage from '../pages/home.jsx';

import NotFoundPage from '../pages/404.jsx';
import LandingPage from '../pages/landing.jsx';
import Details from '../pages/details-page.jsx';
import { HelpPageRevamp } from '../pages/frontend/help.jsx';
import LoginPage from '../pages/frontend/login.jsx';
import SchemeFilter from '../pages/frontend/SchemeFilter.jsx';
import SchemeDescApply from '../pages/frontend/SchemeDescApply.jsx';
import ChatBotWidgetPage from '../pages/frontend/ChatBotWidgetPage.jsx';

var routes = [
  {

    path: '/',
    async({ routeTo, routeFrom, resolve, reject }) {

      const isAuthenticated = localStorage.getItem('token') !== null;

      if (isAuthenticated) {
        resolve({
          component: HomePage,
        });
      } else {
        resolve({
          component: LandingPage,
        });
      }
    },
  },

  {
    path: '/home/',
    async({ routeTo, routeFrom, resolve, reject }) {

      const isAuthenticated = localStorage.getItem('token') !== null; // Implement this function to check auth status

      if (isAuthenticated) {
        resolve({
          component: HomePage,
        });
      } else {
        resolve({
          component: LandingPage
        });
      }
    },
  },

  {
    path: '/details',
    component: Details,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/detailsResult',
    component: SchemeFilter,
  },
  {
    path: '/scheme-description-and-apply',
    component: SchemeDescApply,
  },
  {
    path: '/chat-page',
    component: ChatBotWidgetPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },


];

export default routes;
