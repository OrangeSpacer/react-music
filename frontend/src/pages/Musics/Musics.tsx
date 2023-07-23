import Loader from "../../components/Loader/Loader";
import MusicBlock from "../../components/MusicBlock/MusicBlock";
import { useGetMusicAllQuery } from "../../store/api/music/music.api";

const Musics = () => {
	const { data, error, isLoading } = useGetMusicAllQuery("");

	if (isLoading) {
		return <h1>Загрузка</h1>;
	}

	if (error) {
		return <div>Что-то пошло не так</div>;
	}

	return (
		<div>
			{isLoading ? <Loader /> : null}
			{data ? <MusicBlock title="All music" musics={data} /> : null}
		</div>
	);
};

export default Musics;
