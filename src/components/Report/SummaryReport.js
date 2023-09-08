import React from 'react';
import ReportCard from '../Dashboard/card/ReportCard';
import { formatNumber } from '../../other/format';
import MoneyOffCsredOutlined from "@mui/icons-material/MoneyOffCsredOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";


const SummaryReport = ({profit, count, money,productQuantity}) => {
    return (
       <div className="flex flex-row flex-wrap py-3 gap-2">
                 <ReportCard title={"Profit"} value={`D${formatNumber(profit)}`}
                icon={<MoneyOffCsredOutlined
                  sx={{
                    transform: "scale(1.6)",
                    color: "white",
                    bgcolor: "blueviolet",
                    borderRadius: "3px",
                  }}
                />}
              />
              <ReportCard title={"Money"} value={`D${formatNumber(money)}`}
                icon={<MoneyOffCsredOutlined
                  sx={{
                    transform: "scale(1.6)",
                    // color: "white",
                    bgcolor: "blueviolet",
                    borderRadius: "3px",
                  }}
                />}
                />
                
              <ReportCard title={"#Products"} value={productQuantity}
                icon={<ProductionQuantityLimitsOutlined
                  sx={{
                    transform: "scale(1.6)",
                    color: "white",
                    bgcolor: "#004080",
                    borderRadius: "3px",
                  }}
                />}
              />
              <ReportCard title={"#Sales"} value={count}
                icon={<Inventory2Outlined
                  sx={{
                    transform: "scale(1.6)",
                    bgcolor: "#00e673",
                    borderRadius: "3px",
                  }}
                />}
              />


            </div>
    );
}

export default SummaryReport;
