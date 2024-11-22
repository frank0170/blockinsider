const testCrypto = [
  {
    name: "BTC",
    price: 65000,
    rank: 1,
  },
  {
    name: "ETH",
    price: 3200,
    rank: 2,
  },
  {
    name: "SOL",
    price: 110,
    rank: 3,
  },
  {
    name: "DOGE",
    price: 0.004,
    rank: 4,
  },
];

export const TopCryptoList = () => {
  return (
    <div className="w-full">
      <table>
        <thead>
          <tr>
            <th
              style={{
                paddingRight: "30px",
                paddingLeft: "30px",
                color: "black",
              }}
            >
              Rank
            </th>
            {/* <th style={{ paddingRight: "30px" }}>Valoare</th> */}
            <th style={{ paddingRight: "30px", color: "black" }}>Name</th>

            <th style={{ paddingRight: "30px", width: "12%", color: "black" }}>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {testCrypto.map((item, index) => (
            <tr key={index}>
              <td style={{ color: "black" }}>{item.rank}</td>
              <td style={{ color: "black" }}>{item.name}</td>
              <td style={{ color: "black" }}>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
