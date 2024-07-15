import SearshIcon from './assets/Searchicon.png'
import ClearIcon from './assets/Clear.png'
import RainIcon from './assets/Rain.png'
import SnowIcon from './assets/Snow.png'
import CloudIcon from './assets/Clouds.png'
import HazeIcon from './assets/Haze.png'
import SmokeIcon from './assets/Smoke.png'
import MistIcon from './assets/Mist.png'
import DrizleIcon from './assets/Drizzle.png'
import TempIcon from './assets/temp.png'
import LoadIcon from './assets/loading.png'
import { useRef,useState } from 'react'


const ApiKeyes ='1418a2c1d62ca96780d7abf1587eba9d';

const App = () => {

  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);

  const [loading, setLoading] = useState(false);
const WeatherTypes = [
  {
    type: "Clear",
    img: `${ClearIcon}`,
  },
  {
    type: "Rain",
    img: `${RainIcon}`,
  },
  {
    type: "Snow",
    img: `${SnowIcon}`,
  },
  {
    type: "Clouds",
    img: `${CloudIcon}`,
  },
  {
    type: "Haze",
    img: `${HazeIcon}`,
  },
  {
    type: "Smoke",
    img: `${SmokeIcon}`,
  },
  {
    type: "Mist",
    img: `${MistIcon}`,
  },
  {
    type: "Drizzle",
    img: `${DrizleIcon}`,
  },
];
const fetchWeather = async () => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${ApiKeyes}`;
  setLoading(true);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      setApiData(null);
      if (data.cod == 404 || data.cod == 400) {
        // ARRAY OF OBJ
        setShowWeather([
          {
            type: "Not Found",
            img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
          },
        ]);
      }
      setShowWeather(
        WeatherTypes.filter(
          (weather) => weather.type === data.weather[0].main
        )
      );
      console.log(data);
      setApiData(data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};

    return (
      <div className="bg-gray-800 h-screen grid place-items-center">
        <div className="bg-white w-96 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <input
              type="text"
              ref={inputRef}
              placeholder="Enter Your Location"
              className="text-xl border-b
            p-1 border-gray-200 font-semibold uppercase flex-1"
            />
            <button onClick={fetchWeather}>
              <img
                src={SearshIcon}
                alt="..."
                className="w-8 ml-1"
              />
            </button>
          </div>
          <div
            className={`duration-300 delay-75  overflow-hidden
            ${showWeather ? "h-[27rem]" : "h-0"}`}
          >
            {loading ? (
              <div className="grid place-items-center h-full">
                <img
                  src={LoadIcon}
                  alt="..."
                  className="w-14 mx-auto mb-2 animate-spin"
                />
              </div>
            ) : (
              showWeather && (
                <div className="text-center flex flex-col gap-6 mt-10">
                  {apiData && (
                    <p className="text-xl font-semibold">
                      {apiData?.name + "," + apiData?.sys?.country}
                    </p>
                  )}
                  <img
                    src={showWeather[0]?.img}
                    alt="..."
                    className="w-52 mx-auto"
                  />
                  <h3 className="text-2xl font-bold text-zinc-800">
                    {showWeather[0]?.type}
                  </h3>

                  {apiData && (
                    <>
                      <div className="flex justify-center">
                        <img
                          src={TempIcon}
                          alt="..."
                          className="h-9 mt-1"
                        />
                        <h2 className="text-4xl font-extrabold">
                          {apiData?.main?.temp}&#176;C
                        </h2>
                      </div>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
};

export default App;
