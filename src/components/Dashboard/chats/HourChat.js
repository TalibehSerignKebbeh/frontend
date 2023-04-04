import React from "react";
import {
    VictoryAxis,
    VictoryChart,
    VictoryLabel,
    VictoryLine,
    VictoryTheme,
} from "victory";

const HourChat = ({ hourlyData }) => {
    return (
        <div className=" chat-container card-shadow w-9/12 h-auto  bg-slate-100 mx-auto ">
            <VictoryChart
                name="Hourly Sales"
                theme={VictoryTheme.material}
                // scale={{ x: 3, y: 1 }}
                domainPadding={40}

            >
                <VictoryAxis
                    tickValues={[
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                        19, 20, 21, 22, 23,
                    ]}
                    tickFormat={[
                        "00", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                    ]}
                    padding={4}
                // label={({datum})=>`${datum?.hour} ${datum?.revenue}`}
                // tickLabelComponent={<VictoryTooltip />}
                />
                <VictoryAxis dependentAxis tickFormat={(x) => `D${x}`} />
                <VictoryLine
                    data={hourlyData} sortKey={({ datum }) => datum?.hour} sortOrder="ascending"
                    label={"Hourly Sales Money"}
                    name="Hourly Sales Money"
                    scale={{x:2, y:1}}
                    style={{
                        border:'1px solid #3337',
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" },
                        labels:{ fontSize: 8 }
                    }}
                    x={"hour"}
                    y={"revenue"}
                    // style={{ labels: { fontSize: 8 }, data: {} }}
                    labels={({ datum }) => `${datum?.hour}: D${datum?.revenue}`}
                    labelComponent={<VictoryLabel />}

                />
            </VictoryChart>
        </div>
    );
};

export default HourChat;
