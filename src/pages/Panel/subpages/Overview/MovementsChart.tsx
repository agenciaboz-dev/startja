import React from "react"
import { Box } from "@mui/material"
import { Area, AreaChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import useMeasure from "react-use-measure"

interface MovementsChartProps {
    company: Company
}

export const MovementsChart: React.FC<MovementsChartProps> = ({ company }) => {
    const [ref, { width, height }] = useMeasure()
    const data = [
        { name: "0", indice1: 1000, indice2: 250 },
        { name: "1", indice1: 250, indice2: 750 },
        { name: "2", indice1: 750, indice2: 500 },
        { name: "3", indice1: 250, indice2: 400 },
        { name: "4", indice1: 500, indice2: 250 },
        { name: "5", indice1: 500, indice2: 500 },
        { name: "6", indice1: 750, indice2: 1000 },
        { name: "7", indice1: 250, indice2: 1000 },
        { name: "8", indice1: 700, indice2: 1000 },
        { name: "9", indice1: 300, indice2: 275 }
    ]

    return (
        <Box sx={{ width: "100%", height: "100%" }} ref={ref}>
            <AreaChart data={data} width={width} height={height}>
                <Area
                    type={"linear"}
                    dataKey={"indice1"}
                    strokeOpacity={0}
                    fillOpacity={0.6}
                    fill="#FCC803"
                    dot={{ fill: "#FCC803", r: 5, opacity: 0.6 }}
                />
                <Area
                    type={"linear"}
                    dataKey={"indice2"}
                    strokeOpacity={0}
                    fillOpacity={0.6}
                    fill="#F9DA64"
                    dot={{ fill: "#F9DA64", r: 5, opacity: 0.6 }}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </AreaChart>
        </Box>
    )
}
