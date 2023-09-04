import React, { useRef, useContext } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { Scrollbars } from "react-custom-scrollbars-2";

const Data = () => {
  const dragItem = useRef();
  const {
    selectedWBSheet,
    selectedWB,
    setSelectedWB,
    setSelectedWBSheet,
  } = useContext(GlobalContext);
  return (
    <>
      <h1>Data Page</h1>
      <Scrollbars>
        {selectedWB && selectedWB[selectedWBSheet] && (
          <div className="table">
            <table className="headerKeys">
              <thead>
                <tr className="header">
                  {selectedWB[selectedWBSheet][0].map((h, idx) => (
                    <th className="Keys" key={idx}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedWB[selectedWBSheet].slice(1).map((row, index) => (
                  <tr key={index} className="Keys">
                    {row.map((c, idx) => (
                      <td className="Keys" key={idx}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Scrollbars>
    </>
  );
};
export default Data;
