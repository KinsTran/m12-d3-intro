// Application
import React from 'react';
import * as d3 from 'd3';
import ScatterPlot from './ScatterPlot'
import Controls from './Controls';

var App = React.createClass({
    getInitialState() {
        return {
            data:[],
            xVar:'fertility_rate',
            yVar:'life_expectancy',
            idVar:'country',
            search:''
        }
    },
    componentWillMount() {
        // Get data
        d3.csv('data/prepped_data.csv', function(data){
            this.setState({data:data})
        }.bind(this))
    },
    changeX(event, index, value) {
        this.setState({xVar:value})
    },
    changeY(event, index, value) {
        this.setState({yVar:value})
    },
    search(event) {
        this.setState({search:event.target.value.toLowerCase()})

    },
	render() {
        // Prep data
        let chartData = this.state.data.map((d) => {
            return {
                x:d[this.state.xVar],
                y:d[this.state.yVar],
                id:d[this.state.idVar]
            }
        });

        let titleMap = {
            gdp:'Gross Domestic Product',
            life_expectancy:'Life expectancy in 2014',
            fertility_rate:'Fertility Rate'
        };

        let titles = {
            x:titleMap[this.state.xVar],
            y:titleMap[this.state.yVar]
        }

		// Return ScatterPlot element
		return (

            <div>
                <Controls
                    changeX={this.changeX}
                    changeY={this.changeY}
                    xVar={this.state.xVar}
                    yVar={this.state.yVar}
                    search={this.search}
                />
                {this.state.data.length &&
                    <div className="App">
                        <ScatterPlot
                            titles={titles}
                            search={this.state.search}
                            data={chartData}
                            width={window.innerWidth * .7}
                            height={window.innerHeight * .9} />
                    </div>
                }
            </div>
		);
	}
});

export default App;
