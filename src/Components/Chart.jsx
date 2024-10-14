import React from 'react';
import ApexCharts from 'react-apexcharts';

export default function Chart({ countryData, columns }) {
    if (!countryData || countryData.length === 0) {
        return <div>No data to display</div>; 
    }

    const chartWidth = columns === 1 ? '100%' : columns === 2 ? '50%' : '33%';

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {countryData.map((item, index) => {
                const series = [
                    item.patients.infected,
                    item.patients.death,
                    item.patients.recovered
                ];

                const labels = [
                    `Infected ${item.patients.infected}`,
                    `Death ${item.patients.death}`,
                    `Recovered ${item.patients.recovered}`,
                    `Total Reports ${item.patients.total_reports}`
                ];

                const chartOptions = {
                    chart: {
                        type: 'donut',
                        width: chartWidth
                    },
                    labels, 
                    colors: ['#feb019', '#ff4560', '#00e396', '#0070e3'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: '100%'
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }],
                    legend: {
                        position: 'right',
                        offsetY: 0,
                        height: 230,
                        labels: {
                            colors: '#e5e7eb'
                        }
                    },
                    title: {
                        text: item.country, 
                        align: 'center',
                        margin: 10,
                        style: {
                            fontSize: '16px',
                            color: '#e5e7eb'
                        }
                    }
                };

                return (
                    <div key={index} style={{ width: chartWidth, padding: '10px' }}>
                        <ApexCharts 
                            options={chartOptions}
                            series={series}
                            type="donut" 
                            height={350}
                        />
                    </div>
                );
            })}
        </div>
    );
}
