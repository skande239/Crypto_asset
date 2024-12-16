import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: asset } = useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
      const data = await response.json();
      return data.data;
    },
  });

  const { data: history } = useQuery({
    queryKey: ["history", id],
    queryFn: async () => {
      const response = await fetch(
        `https://api.coincap.io/v2/assets/${id}/history?interval=h1`
      );
      const data = await response.json();
      return data.data.map((point: any) => ({
        time: new Date(point.time).toLocaleTimeString(),
        price: parseFloat(point.priceUsd),
      }));
    },
  });

  if (!asset) {
    return <div className="brutal-card">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/")} className="brutal-button">
        <ArrowLeft className="inline-block mr-2" size={16} />
        Back to List
      </button>

      <div className="brutal-card">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">
            {asset.name} <span className="text-brutal-gray">({asset.symbol})</span>
          </h1>
          <div className="text-3xl font-bold">${parseFloat(asset.priceUsd).toFixed(2)}</div>
        </div>

        <div className="h-[400px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <XAxis dataKey="time" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "4px solid #000",
                  borderRadius: "0px",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="brutal-card">
            <div className="text-brutal-gray">Market Cap</div>
            <div className="text-xl font-bold">
              ${(parseFloat(asset.marketCapUsd) / 1e9).toFixed(2)}B
            </div>
          </div>
          <div className="brutal-card">
            <div className="text-brutal-gray">Volume (24h)</div>
            <div className="text-xl font-bold">
              ${(parseFloat(asset.volumeUsd24Hr) / 1e6).toFixed(2)}M
            </div>
          </div>
          <div className="brutal-card">
            <div className="text-brutal-gray">Supply</div>
            <div className="text-xl font-bold">
              {(parseFloat(asset.supply) / 1e6).toFixed(2)}M
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;