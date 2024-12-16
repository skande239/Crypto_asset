import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";

interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
}

const CryptoList = () => {
  const navigate = useNavigate();
  const { data: assets, isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const response = await fetch("https://api.coincap.io/v2/assets?limit=50");
      const data = await response.json();
      return data.data as Asset[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-16 brutal-border bg-brutal-gray/20 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="brutal-card">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b-4 border-brutal-black">
            <th className="py-4">Rank</th>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {assets?.map((asset) => (
            <tr
              key={asset.id}
              onClick={() => navigate(`/asset/${asset.id}`)}
              className="border-b-2 border-brutal-black hover:bg-brutal-gray/10 cursor-pointer"
            >
              <td className="py-4">{asset.rank}</td>
              <td className="font-bold">
                {asset.name} <span className="text-brutal-gray">{asset.symbol}</span>
              </td>
              <td>${parseFloat(asset.priceUsd).toFixed(2)}</td>
              <td className={parseFloat(asset.changePercent24Hr) > 0 ? "text-green-600" : "text-red-600"}>
                {parseFloat(asset.changePercent24Hr) > 0 ? (
                  <ArrowUp className="inline" size={16} />
                ) : (
                  <ArrowDown className="inline" size={16} />
                )}
                {Math.abs(parseFloat(asset.changePercent24Hr)).toFixed(2)}%
              </td>
              <td>${(parseFloat(asset.marketCapUsd) / 1e9).toFixed(2)}B</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;