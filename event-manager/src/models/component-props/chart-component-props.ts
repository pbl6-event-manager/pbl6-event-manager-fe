export interface Series { 
    name: string; 
    values: number[]; 
    colorClass?: string 
};

export interface VerticalBarChartProps {
    labels: string[];
    series?: Series[];
    values?: number[];
    colorClass?: string;
    chartHeight?: number;
    barInnerWidth?: number;
    yTicks?: number;
    isEvent: boolean;
    showLegend?: boolean
}

