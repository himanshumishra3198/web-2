import "./App.css";
import { useEffect, useState } from "react";
function App() {
  let [hour, setHour] = useState("");
  let [minute, setMinute] = useState("");
  let [second, setSecond] = useState("");
  let [timeRunning, setTimeRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timeRunning) {
      interval = setInterval(() => {
        if (parseInt(second) > 0) {
          setSecond((prev) => {
            let val = String(parseInt(prev) - 1);
            if (val.length == 1) val = "0" + val;
            return val;
          });
        } else if (parseInt(minute) > 0) {
          setMinute((prev) => {
            let val = String(parseInt(prev) - 1);
            if (val.length == 1) val = "0" + val;
            return val;
          });
          setSecond("60");
        } else if (parseInt(hour) > 0) {
          setHour((prev) => {
            let val = String(parseInt(prev) - 1);
            if (val.length == 1) val = "0" + val;
            return val;
          });
          setMinute("60");
        } else {
          setTimeRunning((prev) => !prev);
        }
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timeRunning, second, minute, hour]);
  function handlePlay() {
    setTimeRunning(true);
  }
  function handlePause() {
    setTimeRunning(false);
  }
  function handleReset() {
    setHour("");
    setMinute("");
    setSecond("");
    setTimeRunning(false);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "28px",
        gap: "12px",
        color: "white",
        backgroundColor: "black",
      }}
    >
      <div>
        <div>
          <input
            type="tel"
            placeholder="00"
            maxLength="2"
            className="timeInput"
            value={hour}
            onChange={(e) => {
              if (/^\d{0,2}$/.test(e.target.value)) {
                setHour(e.target.value);
              }
            }}
            onBlur={() => {
              if (hour.length == 1) {
                setHour(`0${hour}`);
              }
            }}
          />
          :
          <input
            type="tel"
            placeholder="00"
            maxLength="2"
            className="timeInput"
            value={minute}
            onChange={(e) => {
              if (/^\d{0,2}$/.test(e.target.value)) {
                setMinute(e.target.value);
              }
            }}
            onBlur={() => {
              if (minute.length == 1) {
                setMinute(`0${minute}`);
              }
            }}
          />
          :
          <input
            type="tel"
            placeholder="00"
            maxLength="2"
            className="timeInput"
            value={second}
            onChange={(e) => {
              if (/^\d{0,2}$/.test(e.target.value)) {
                setSecond(e.target.value);
              }
            }}
            onBlur={() => {
              if (second.length == 1) {
                setSecond(`0${second}`);
              }
            }}
          />
        </div>
        <div style={{ marginTop: "40px", display: "flex", gap: "10px" }}>
          {!timeRunning && (
            <img
              src="https://img.icons8.com/?size=100&id=398&format=png&color=000000"
              alt=""
              className="playButton"
              onClick={handlePlay}
            />
          )}
          {timeRunning && (
            <img
              src="https://img.icons8.com/?size=100&id=403&format=png&color=000000"
              alt=""
              className="playButton"
              onClick={handlePause}
            />
          )}

          <img
            src="https://img.icons8.com/?size=100&id=12491&format=png&color=000000"
            alt=""
            className="playButton"
            onClick={handleReset}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
