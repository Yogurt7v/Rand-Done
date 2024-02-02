import style from "./component.module.css";
import copySvg from "./copy-svgrepo-com.svg";
import copySvgBlue from "./copy-svgrepo-com2.svg";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const Component = ({ result, reset, interest }) => {
  const [visible, setVisible] = useState(false);
  let number = 0;

  function Copy(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className={style.component}>
      <button
        className={style.componentBtn}
        onClick={() => setVisible(!visible)}
      >
        Наценка?
      </button>
      {result?.length === 0 ? null : (
        <button style={{ width: "300px", marginBottom: "20px" }} onClick={reset}>
          Сбросить
        </button>
      )}
      {result?.map((item) => (
        <>
          <div key={item.id} className={style.sinlgeCard}>
            <div className={style.cardItem}>
              <div>
                <strong className={style.title}> {item.title}</strong>
              </div>
              <button className={style.copy} onClick={() => Copy(item.title)}>
                <img className={style.svg} src={copySvg} alt="Copy" />
              </button>
            </div>
            <div className={style.cardItem}>
              <div>
                <strong>Название в базе:</strong> {item.baseTitle}
              </div>
              <button
                className={style.copy}
                onClick={() => Copy(item.baseTitle)}
              >
                <img className={style.svg} src={copySvg} alt="Copy" />
              </button>
            </div>
            <div className={style.cardItem}>
              <div className={style.cardItemPrice}>
                <div>
                  <strong>Цена:</strong> {item.price}
                </div>
                {visible ? (
                  <div>
                    <strong>Цена с наценкой:</strong>{" "}
                    {Math.round((item.price + item.price * (Number(interest)/ 100 )) * 1000) / 1000}
                  </div>
                ) : null}
              </div>
              <div className={style.cardItemInterest}>
                {visible ? (
                  <button
                    className={style.copy}
                    onClick={() =>
                      Copy(
                        Math.round((item.price + item.price * 0.05) * 1000) /
                          1000
                      )
                    }
                  >
                    <img className={style.svg} src={copySvgBlue} alt="Copy" />
                  </button>
                ) : null}
                <button className={style.copy} onClick={() => Copy(item.price)}>
                  <img className={style.svg} src={copySvg} alt="Copy" />
                </button>
              </div>
            </div>
            <div className={style.cardItem}>
              <div>
                <strong>Количество:</strong> {item.quantity}
              </div>
              <button
                className={style.copy}
                onClick={() => Copy(item.quantity)}
              >
                <img className={style.svg} src={copySvg} alt="Copy" />
              </button>
            </div>
            <div className={style.cardItem}>
              <div>
                <strong>Сумма:</strong>{" "}
                {new Intl.NumberFormat("ru-RU").format(item.sum)}
              </div>
              <button className={style.copy} onClick={() => Copy(item.sum)}>
                <img className={style.svg} src={copySvg} alt="Copy" />
              </button>
            </div>

            <div className={style.NumberWrapper}><div className={style.number}>{++number}</div></div>

          </div>
        </>
      ))}

      {result.length === 0 ? null : (
        <button style={{ width: "300px" }} onClick={reset}>
          Сбросить
        </button>
      )}
    </div>
  );
};

export default Component;
