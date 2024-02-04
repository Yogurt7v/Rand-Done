import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Component from "./assets/component";
import { useState, useRef } from "react";
import dataBase from "./assets/dataBase";
import Select from "react-select";
import settings from "./assets/settings-svgrepo-com.svg";
import admin from "./assets/admin.svg";
import "./App.css";
import { useNavigate } from "react-router-dom";
import PASS from "./assets/pass";
import CurrencyInput from "react-currency-input-field";

function App() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [docSum, setDocSum] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [coefficient, setCoefficient] = useState(0.3);
  const [interest, setInterest] = useState(5);
  const options = [
    { value: 0.5, label: "0.5%" },
    { value: 1, label: "1%" },
    { value: 2, label: "2%" },
    { value: 3, label: "3%" },
    { value: 4, label: "4%" },
    { value: 5, label: "5%" },
  ];
  let result = [];

  function Final(docSum, quantity, dataBase) {
    let medium = docSum / quantity;
    let max = medium * (1 + Number(coefficient));
    let min = medium * (1 - Number(coefficient));

    for (let i = 0; i < quantity; i++) {
      let randomID = Math.round(Math.random() * (dataBase.length - 1 - 0) + 0);
      let randomSum =
        Math.round((Math.random() * (max - min) + min) * 100) / 100;
      let randomQuantity =
        Math.round((randomSum / dataBase[randomID].price) * 100) / 100;

      result.push({
        id: dataBase[randomID].id,
        title: dataBase[randomID].title,
        baseTitle: dataBase[randomID].baseTitle,
        price: dataBase[randomID].price,
        quantity: randomQuantity,
        sum: randomSum,
      });
    }
    let reduce = result.reduce((acc, item) => acc + item.sum, 0);
    if (reduce > docSum) {
      result[result.length - 1] = {
        ...result[result.length - 1],
        sum: (result[result.length - 1].sum - (reduce - docSum)).toFixed(2),
        quantity:
          Math.round(
            ((result[result.length - 1].sum - (reduce - docSum)) /
              result[result.length - 1].price) *
              1000
          ) / 1000,
      };
    }
    if (reduce < docSum) {
      result[result.length - 1] = {
        ...result[result.length - 1],
        sum: (docSum - reduce + result[result.length - 1]?.sum).toFixed(2),
        quantity:
          Math.round(
            ((docSum - reduce + result[result.length - 1]?.sum) /
              result[result.length - 1]?.price) *
              1000
          ) / 1000,
      };
    }

    if (result.find((item) => item.sum < 0)) {
      Final(docSum, quantity, dataBase);
    }
    return result;
  }
  //   let a  = new Intl.NumberFormat('ru-RU').format(num)
  //   console.log(a);
  //   return a
  // }

  // useEffect(() => {
  //   const formattedNum = FormatNum(docSum);
  //   document.getElementById('sum').value = formattedNum;
  // }, [docSum]);

  function Reset() {
    document.getElementsByClassName("rc-slider-handle")[0].style.left ="25%";
    document.getElementsByClassName("rc-slider-track")[0].style.width ="25%";
    document.getElementsByClassName("quantity")[0].value = "";

    setInterest(5);
    setQuantity(0);
    setCoefficient(0.3);
    result = [];
  }

  function CheckPass() {
    let temp = prompt("Пароль", "");
    if (temp === PASS) {
      navigate("/AdminPanel");
    } else {
      alert("Пароль неверен");
    }
  }

  const SelectComponent = () => (
    <Select
      options={options}
      onChange={(e) => setInterest(e.value)}
      value={{ value: interest, label: `${interest}%` }}
      defaultValue={{ value: 5, label: "5%" }}
      className="select"
    />
  );

  Final(docSum, quantity, dataBase);

  return (
    <>
      <div className="header">
        <button className="componentBtn edited2" onClick={CheckPass}>
          <img className="svg" src={admin} alt="Reset" />
        </button>
        <button
          className="componentBtn edited"
          onClick={() => {
            document.querySelector(".settingsWrapper").classList.toggle("none");
          }}
        >
          <img className="svg" src={settings} alt="Settings" />
        </button>
      </div>
      <h1>Randomizer 2.0</h1>
      <div className="card">
        <div className="inputs">
          <CurrencyInput
            ref={ref}
            decimalSeparator="."
            autoComplete="off"
            maxLength={12}
            allowNegativeValue={false}
            id="sum"
            placeholder="Сумма"
            decimalsLimit={2}
            onValueChange={(value) => setDocSum(Number(value))}
          />
          <input
            type="number"
            autoComplete="off"
            min="0"
            className="quantity"
            placeholder="Кол-во"
            onChange={(e) => setQuantity(e.target.value)}
            id="quantity"
          />
        </div>
        <div className="settingsWrapper none">
          <div className="range">
            <label>Разброс цены</label>
            <div className="coefficient">{coefficient * 100} %</div>
            <Slider
            ref={ref}
              className='slider'
              min={0.1}
              max={0.9}
              step={0.1}
              defaultValue={0.3}
              onChange={(value) => setCoefficient(value)}
              ></Slider>
          </div>
          <SelectComponent />
          <button className="resetBtn" onClick={Reset}>
            Обнулить параметры
          </button>
        </div>
      </div>  
      <Component result={result} reset={Reset} interest={interest} />
    </>
  );
}

export default App;
