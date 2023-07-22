import { useEffect } from "react";
import Main from "./pages/Main/Main";
import { useRefreshUserMutation } from "./store/api/user/user.api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { login } from "./store/features/auth/authSlice";

const App = () => {
	const [refreshToken, res] = useRefreshUserMutation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			refreshToken("");
		}
	}, []);

	useEffect(() => {
		if (res.data) {
			dispatch(login(res.data));
		}
	}, [res, dispatch]);

	useEffect(() => {
		if (res.isError) {
			navigate("/login");
		}
	}, [res.isError, navigate]);

	return (
		<div>
			<Main />
		</div>
	);
};

export default App;
