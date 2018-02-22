import React from "react";
import ReactDOM from "react-dom";
import {browserHistory, Route, Router, IndexRoute} from "react-router";
import AppContainer from "./containers/AppContainer";
import OnePager from "./components/OnePager";
import Test from "./components/OnePager/Test";
import JobOpportunities from "./components/JobPortal/JobOpportunities";
import MosqueFinder from "./components/MosqueFinder/MosqueFinderMain"
import JobOffer from "./components/JobPortal/JobOffer";
import SendApplication from "./components/JobPortal/SendApplication";
import ApplicationConfirmation from "./components/JobPortal/ApplicationConfirmation";
import Press from "./components/Press";
import MosqueFinderMain from "./components/MosqueFinder/MosqueFinderMain";
import RamadanTimes from "./components/RamadanTimes";
import Login from "./components/User/Login";
import ForgetPassword from "./components/User/ForgetPassword";
import UserRegistration from "./components/User/UserRegistration";
import UserGoogleInvite from "./components/User/UserGoogleInvite";
import UserChangePassword from "./components/User/UserChangePassword";
import UserMain from "./components/User/UserAccountsMain";
import QuranMain from "./components/Quran/QuranMain";
import AudioPlayer from "./components/Quran/AudioPlayer";
import AudioPlayer2 from "./components/Quran/AudioPlayer2";
import FAQContainer from "./containers/FAQContainer";
import config from "./config";
import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxApp from "./reducers";
import { Provider } from 'react-redux';
import { syncHistory, routeReducer } from 'react-router-redux';
import TimelineContainer from "./containers/TimelineContainer";
import NotFound from "./components/NotFound";
import AppsPage from "./components/ClosedBeta/AppsPage";
import SignUp from "./components/ClosedBeta/SignUp";
import Unsubscribe from "./components/ClosedBeta/Unsubscribe";
import NDA from "./components/ClosedBeta/NDA";
import BetaRegisteration from "./components/ClosedBeta/BetaRegisteration";
import AboutPage from "./components/ClosedBeta/AboutPage";
import FeedbackSummary from "./components/ClosedBeta/FeedbackSummary";
import FeedbackGraditude from "./components/ClosedBeta/FeedbackGraditude";
import StartSession from "./components/ClosedBeta/StartSession";
import CallBackDevice from "./components/ClosedBeta/CallBackDevice";
import Glitch from "./components/Glitch";
import MaterialExample from "./components/MaterialExample";

require('es6-shim');

const reducer = combineReducers(Object.assign({}, reduxApp, {
	routing: routeReducer
}));

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

reduxRouterMiddleware.listenForReplays(store)

const routes = {
	path: config.root + "/",
	component: AppContainer,
	indexRoute: { component: OnePager },
	childRoutes: [
		{
			path: config.root + "/jobs",
			component: JobOpportunities
		},
		{
			path: config.root + "/Glitch",
			component: Glitch
		},
		{
			path: config.root + "/jobsOffer",
			component: JobOffer
		},
		{

			path: config.root + "/sendApplication",
			component: SendApplication
		},
		{
			path: config.root + "/applicationConfirmation",
			component: ApplicationConfirmation

		},
		{
			path: config.root + "/ForgetPassword",
			component: ForgetPassword

		},
		{
			path: config.root + "/CallBackDevice",
			component: CallBackDevice

		},
		{
			path: config.root + "/QuranMain",
			component: QuranMain

		},
		{
			path: config.root + "/StartSession",
			component: StartSession

		},
		{
			path: config.root + "/AppsPage",
			component: AppsPage
		},
		{
			path: config.root + "/SignUp",
			component: SignUp
		},
		{
			path: config.root + "/Unsubscribe",
			component: Unsubscribe
		},
		{
			path: config.root + "/NDA",
			component: NDA
		},
		{
			path: config.root + "/AboutPage",
			component: AboutPage
		},
		{
			path: config.root + "/BetaRegisteration",
			component: BetaRegisteration

		},
		{
			path: config.root + "/summary",
			component: FeedbackSummary

		},
		{
			path: config.root + "/graditude",
			component: FeedbackGraditude

		},
		{
			path: config.root + "/audioplayer",
			component: AudioPlayer

		},
		{
			path: config.root + "/audioplayer2",
			component: AudioPlayer2

		},
		{
			path: config.root + "/press",
			component: Press
		},
		{
			path: config.root + "/MosqueFinder",
			component: MosqueFinderMain
		},
		{
			path: config.root + "/livefeed",
			component: Test
		},
		{
			path: config.root + "/MosqueFinder",
			component: MosqueFinder
		},
		{
			path: config.root + "/userregistration",
			component: UserRegistration
		},
		{
			path: config.root + "/UserChangePassword",
			component: UserChangePassword
		},
		{
			path: config.root + "/accounts",
			component: UserMain
		},
		{
			path: config.root + "/login",
			component: Login
		},
		{
			path: config.root + "/syncgoogle",
			component: UserGoogleInvite
		},
		{
			path: config.root + "/faq",
			component: FAQContainer
		},
		{
			path: config.root + "/timeline",
			component: TimelineContainer
		},
		{
			path: config.root + "/materialExample",
			component: MaterialExample
		},
		{
			path: config.root + "*",
			component: NotFound
		}
	]
};


const render = () => {
	ReactDOM.render((
		<Provider store={store}>
			<Router history={browserHistory} routes={routes}>
				
			</Router>
		</Provider>), document.getElementById("react-root")
	);	
}

store.subscribe(render);
render();
