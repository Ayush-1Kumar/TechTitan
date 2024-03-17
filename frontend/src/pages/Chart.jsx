import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useAuth } from '../store/auth';
import '../Scss/Chart.scss';

function Charts() {
    const { user, token } = useAuth();
    const [allInfo, setAllInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const getinfo = async () => {
        try {
            const response = await fetch("http://localhost:3000/getinfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAllInfo(data.msg);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getinfo();
    }, []);

    useEffect(() => {
        if (!loading && allInfo.allthescores) {
            setState(prevState => ({
                ...prevState,
                series: [
                    {
                        name: "Score",
                        data: allInfo.allthescores
                    }
                ],
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: allInfo.allthescores.map((_, index) => index + 1)
                    }
                }
            }));
        }
    }, [allInfo, loading]);

    const [state, setState] = useState({
        options: {
            colors: ["#E91E63", "#FF9800"],
            chart: {
                id: "basic-bar",
            },
            xaxis: {
                title: {
                    text: 'Time'
                },
                categories: [],
            },
            yaxis: {
                title: {
                    text: 'Scores'
                }
            }
        },
        series: [
            {
                name: "Score",
                data: []
            },
        ],
    });

    return (
        <div className="chart-box">
        
            <div className="chart">
                <Chart
                    className="chartbox"
                    options={state.options}
                    series={state.series}
                    type="bar"
                />
            </div>
        </div>
    );
}

export default Charts;
